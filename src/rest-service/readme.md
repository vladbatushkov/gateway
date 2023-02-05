# Basic REST WebAPI + MongoDB

## Step 1: Setup Project

- Open a folder `/workspace` and working inside that folder only

- Create a new webapi project

```dotnet
dotnet new webapi -n TagsApi
```

- Add `.gitignore` file

```dotnet
dotnet new gitignore
```

- `Swashbuckle.AspNetCore` already pre-installed, check `TagsApi.csproj` file

- We don't really need to worry about `https` in our tutorial

- Cleanup https stuff in `Program.cs` file

```cs
// Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();
```

- Cleanup https stuff in `Properties/launchSettings.json` file

```json
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "TagsApi": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5010",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

- Now we good. Run project locally

```dotnet
dotnet run
```

- Use SwaggerUI [http://localhost:5010/swagger/index.html](http://localhost:5010/swagger/index.html)

## Step 2: MongoDB Network

- Install `MongoDB.Driver` package

```dotnet
dotnet add package MongoDB.Driver
```

- Add MongoDB settings into `appsettings.json` file

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "MongoDBSettings": {
    "ConnectionString": "mongodb+srv://mongodb-user:<password>@cluster-sg.uamu5be.mongodb.net/?retryWrites=true&w=majority",
    "DatabaseName": "mongodb-gql",
    "CollectionName": "tags"
  }
}
```

> Note: Don't forget to replace `<password>` with an actual password from our secret chat

- Add MongoDB settings provider

```cs
// MongoDBSettingsProvider.cs
namespace TagsApi;

public class MongoDBSettingsProvider
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string CollectionName { get; set; } = null!;
}
```

- Add a Provider into DI container

```cs
// Program.cs
using TagsApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MongoDBSettingsProvider>(
    builder.Configuration.GetSection("MongoDBSettings"));
// ...
```

## Step 3: MVC Layer

- Replace `WeatherForecast.cs` with `Tag.cs`. Keep file inside project root folder

```cs
// Tag.cs
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TagsApi;

public class Tag
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore()]
    public string? Id { get; set; }

    [BsonElement("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;
}

```

> Note: We will manage Tag by `Name` only, so `Id` can be hidden from external access

- Add a Repository layer to manage Tag in MongoDB database

```cs
// TagRepository.cs
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TagsApi;

public interface ITagRepository
{
    Task<List<Tag>> Get();
    Task<Tag?> Get(string name);
    Task Create(string name);
    Task Remove(string name);
}

public class TagRepository : ITagRepository
{
    private readonly IMongoCollection<Tag> _tagsCollection;

    public TagRepository(
        IOptions<MongoDBSettingsProvider> mongoDBSettingsProvider)
    {
        var dbSettings = mongoDBSettingsProvider.Value;
        var clientSettings = MongoClientSettings.FromConnectionString(dbSettings.ConnectionString);
        _tagsCollection = new MongoClient(clientSettings)
                                .GetDatabase(dbSettings.DatabaseName)
                                .GetCollection<Tag>(dbSettings.CollectionName);
    }

    public async Task<List<Tag>> Get() =>
        await _tagsCollection.Find(_ => true).ToListAsync();

    public async Task<Tag?> Get(string name) =>
        await _tagsCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

    public async Task Create(string name) =>
        await _tagsCollection.InsertOneAsync(new Tag { Name = name });

    public async Task Remove(string name) =>
        await _tagsCollection.DeleteManyAsync(x => x.Name == name);
}
```

> Note: We don't need to support update operation

- Add a Repository into DI container

```cs
// Program.cs
using TagsApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ITagRepository, TagRepository>();
// ...
```

- Reaplce `WeatherForecastController.cs` with `TagController.cs`. Keep file inside project root folder

```cs
// TagController.cs
using Microsoft.AspNetCore.Mvc;

namespace TagsApi;

[ApiController]
[Route("api/tag")]
public class TagController : ControllerBase
{
    private readonly ITagRepository _tagRepository;

    public TagController(ITagRepository tagRepository) =>
        _tagRepository = tagRepository;

    [HttpGet]
    public async Task<List<Tag>> Get() =>
        await _tagRepository.Get();

    [HttpGet("{name}")]
    public async Task<ActionResult<Tag>> Get(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Empty input not allowed");
        }
        name = name.ToLowerInvariant().Trim();

        var tag = await _tagRepository.Get(name);
        if (tag is null)
        {
            return NotFound("Tag not found");
        }
        return tag;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Empty input not allowed");
        }
        name = name.ToLowerInvariant().Trim();

        var tag = await _tagRepository.Get(name);
        if (tag is not null)
        {
            return BadRequest("Tag already exists");
        }

        await _tagRepository.Create(name);
        return CreatedAtAction(nameof(Get), new { name });
    }

    [HttpDelete("{name}")]
    public async Task<IActionResult> Delete(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Empty input not allowed");
        }
        name = name.ToLowerInvariant().Trim();

        await _tagRepository.Remove(name);
        return NoContent();
    }
}
```

> Note: Validation cover scenarios of empty input and tag duplication

- Run it locally

```dotnet
dotnet run
```

- WebAPI is ready to try `POST`, `GET` and `DELETE` operations [http://localhost:5010/api/tag/](http://localhost:5010/api/tag/)

- Use SwaggerUI [http://localhost:5010/swagger/index.html](http://localhost:5010/swagger/index.html)

## Step 4: Docker

- Create `Dockerfile` inside project root folder

```docker
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS sdk
WORKDIR /app
COPY ./TagsApi.csproj ./
RUN dotnet restore

FROM sdk AS publish
WORKDIR /app
COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=publish /app/out .
ENTRYPOINT ["dotnet", "TagsApi.dll"]
```

- Create `docker-compose.yml` file inside `workspace` folder. Not in the project root fodler, but one level up.

- You will use this file to assemble all services

```yml
version: "3.6"

services:
  # REST API
  tagsapi:
    image: tagsapi
    build:
      context: ./TagsApi
      dockerfile: ./Dockerfile
    environment:
      - ASPNETCORE_ENVIRONMENT=Release
      - ASPNETCORE_URLS=http://+:5010;
    ports:
      - "5010:5010"
    expose:
      - "5010"
```

- Start service using docker

```sh
docker-compose up
```

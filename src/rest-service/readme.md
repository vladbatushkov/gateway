# WebAPI + MongoDB

## Step 1: Setup Project

- Create a new webapi project.

```dotnet
dotnet new webapi -n TagsApi -f net6.0 --no-https
```

> Note: Target framework is `.NET 6.0`. No `https` support. `Swashbuckle.AspNetCore` package already installed.

- Work inside `/TagsApi` folder.

- Change `Program.cs` file as below:

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

- Set port `5010` in `launchSettings.json` file.

```json
      "applicationUrl": "http://localhost:5010",
```

- Run project locally.

```dotnet
dotnet run
```

- Check that all works using SwaggerUI [http://localhost:5010/swagger/index.html](http://localhost:5010/swagger/index.html).

- Stop the app.

## Step 2: MongoDB Network

- Install `MongoDB.Driver` package.

```dotnet
dotnet add package MongoDB.Driver
```

- Add `MongoDBSettings` section into `appsettings.json` file.

```json
  "MongoDBSettings": {
    "ConnectionString": "<mongo.host>",
    "DatabaseName": "<mongo.name>",
    "CollectionName": "tags"
  }
```

> Note: Don't forget to replace settings with actual credentials from our secret chat.

- Add MongoDB settings provider.

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

- Add a Provider into DI container.

```cs
// Program.cs
using TagsApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MongoDBSettingsProvider>(
    builder.Configuration.GetSection("MongoDBSettings"));
// ...
```

## Step 3: MVC Layer

- Replace `WeatherForecast.cs` with `Tag.cs`. Keep file inside project root folder.

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

> Note: We will manage Tag by `Name` only, so `Id` can be hidden from external access.

- Add a Repository layer to manage Tag in MongoDB database.

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
}
```

> Note: We want to support only GET ALL, GET ONE and CREATE operations.

- Add a Repository into DI container.

```cs
// Program.cs
using TagsApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ITagRepository, TagRepository>();
// ...
```

- Replace `WeatherForecastController.cs` with `TagController.cs`. Keep file inside project root folder.

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
        name = name.Trim();

        var tag = await _tagRepository.Get(name);
        if (tag is not null)
        {
            return BadRequest("Tag already exists");
        }

        await _tagRepository.Create(name);
        return Ok();
    }
}
```

> Note: Validation cover scenarios of empty input and tag duplication.

- Run the app.

```dotnet
dotnet run
```

- WebAPI is ready to try [http://localhost:5010/api/tag/](http://localhost:5010/api/tag/). Use `Postman`, VSCode `Thunder Client` or any other API client.

- SwaggerUI [http://localhost:5010/swagger/index.html](http://localhost:5010/swagger/index.html) and JSON schema [http://localhost:5010/swagger/v1/swagger.json](http://localhost:5010/swagger/v1/swagger.json).

## Step 4: Dockerize (Optional)

- Create `Dockerfile` inside project root TagsApi folder.

```dockerfile
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

- Create `docker-compose.yml` file in a root of the repository.

> Note: It will be used to assemble all services.

```yml
version: "3.6"

services:
  # WEBAPI MONGODB
  tagsapi:
    container_name: gateway_tagsapi
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

- Start service using docker compose.

```sh
docker-compose up --build
```

###### Refs

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-6.0&tabs=visual-studio

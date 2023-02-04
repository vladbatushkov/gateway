# Basic REST WebAPI + MongoDB

## Step 1: Init WebAPI Project

- Init WebAPI project

```dotnet
dotnet new webapi -n TagsApi
```

- Add `.gitignore` file

```dotnet
dotnet new gitignore
```

- `Swashbuckle.AspNetCore` already pre-installed, check `TagsApi.csproj` file

- Cleanup _https_ related stuff in `Program.cs` file

```cs
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
```

- Open on local [Swagger UI](http://localhost:5010) should be `http://localhost:5010`

- Default `GET WeatherForecast` call should works

- Don't worry about default data much we will replace it with our real data layer in a next step

## Step 3: Add MongoDB

- Install `MongoDB.Driver` package

```dotnet
dotnet add package MongoDB.Driver
```

- Add MongoDB settings into `appsettings.json` file

```json
{
  "MongoDBSettings": {
    "ConnectionString": "mongodb+srv://mongodb-user:<password>@cluster-sg.uamu5be.mongodb.net/?retryWrites=true&w=majority",
    "DatabaseName": "mongodb-gql",
    "TagCollectionName": "tags"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

- Don't forget to replace `<password>` with an actual password from our secret chat

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

// Add services to the container.
builder.Services.Configure<MongoDBSettingsProvider>(
    builder.Configuration.GetSection("MongoDBSettings"));

//...
```

- Now we area ready to create our application layer

## Step 3: MVC

- We need a Resource to manage. Transform `WeatherForecast.cs` into `Tag.cs`. Keep file in root folder

```cs
// Tag.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TagsApi;

public class Tag
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;
}
```

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
    Task Create(Tag tag);
    Task Remove(string name);
}

public class TagRepository : ITagRepository
{
    private readonly IMongoCollection<Tag> _tagsCollection;

    public TagRepository(
        IOptions<MongoDBSettingsProvider> mongoDBSettingsProvider)
    {
        var mongoClient = new MongoClient(
            mongoDBSettingsProvider.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            mongoDBSettingsProvider.Value.DatabaseName);

        _tagsCollection = mongoDatabase.GetCollection<Tag>(
            mongoDBSettingsProvider.Value.CollectionName);
    }

    public async Task<List<Tag>> Get() =>
        await _tagsCollection.Find(_ => true).ToListAsync();

    public async Task<Tag?> Get(string name) =>
        await _tagsCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

    public async Task Create(Tag tag) =>
        await _tagsCollection.InsertOneAsync(tag);

    public async Task Remove(string name) =>
        await _tagsCollection.DeleteManyAsync(x => x.Name == name);
}
```

> Note: we are not interesting in update operation (PUT)

- Add a Repository into DI container

```cs
// Program.cs
using TagsApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ITagRepository, TagRepository>();

// ...
```

- Transform `WeatherForecastController.cs` into `TagController.cs`. Move file into root folder

```cs
// TagController.cs
using Microsoft.AspNetCore.Mvc;

namespace TagsApi;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private readonly ITagRepository _tagRepository;

    public TagController(ITagRepository tagRepository) =>
        _tagRepository = tagRepository;

    [HttpGet]
    public async Task<List<Tag>> Get() =>
        await _tagRepository.Get();

    [HttpGet("{name:string}")]
    public async Task<ActionResult<Tag>> Get(string name)
    {
        var tag = await _tagRepository.Get(name);
        if (tag is null)
        {
            return NotFound();
        }
        return tag;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Tag tag)
    {
        if (tag is null || string.IsNullOrWhiteSpace(tag.Name))
        {
            return BadRequest();
        }
        await _tagRepository.Create(tag);
        return CreatedAtAction(nameof(Get), new { name = tag.Name }, tag);
    }

    [HttpDelete("{name:string}")]
    public async Task<IActionResult> Delete(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return NotFound();
        }
        await _tagRepository.Remove(name);
        return NoContent();
    }
}
```

> Note: Implementation do not preventing Tag collisions having the same name

- Well done. API ready to use. Try to add and fetch some tags using swagger UI

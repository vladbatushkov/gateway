# Creating a GraphQL Gateway

Tutorial to learn base concepts of GraphQL and build a Gateway API using Hot Chocolate server supporting Query, Mutation, Subscription and Schema Stitching.

## Theory

- Microservices Architecture
  - Gateway API
- API Design
  - REST
  - GraphQL
- Data
  - Relational Database
  - Key-Value Database
  - Graph Database

## Stack of Technologies

- React
- .NET 6
- Hot Cholocate
- GraphQL
- REST API
- MSSQL
- Redis
- Neo4j

## Prerequisites

- Required:
  - Install IDE (VSCode: https://code.visualstudio.com/download)
  - Install Docker (https://docs.docker.com/get-docker/)
  - Install .NET 6 SDK (https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
  - Install Node 14
- Good to know:
  - What is Docker (read https://docs.docker.com/get-started/)
  - What is REST (read https://en.wikipedia.org/wiki/Representational_state_transfer)
  - What is Neo4j (learn http://www.graphville.com)

## Learning Materials

- GraphQL (read https://graphql.org/)
- Gateway API (read https://microservices.io/patterns/apigateway.html)
- Hot Chocolate (read https://chillicream.com/docs/hotchocolate)
- Hot Chocolate (watch https://www.youtube.com/@ChilliCream)

# Workshop

## Project setup

1.Create new project 
``` CMD
//create project
dotnet new webapi -minimal -o GqlGateway -f net6.0 --no-openapi --no-https
//requied packages
dotnet add package HotChocolate.AspNetCore --version 12.15.2
```
2. Add Query Type
On this, you'll learn in detail about how to query a GraphQL server.

``` csharp
namespace GqlGateway.Schema;
public class Query
{
    public IEnumerable<Tag> GetTags([Service] TagInMemoryDataStore storage) => storage.GetTags();
}

// Model
public record class Tag(int Id, string Name);
```
3. Add Datastore
``` csharp
namespace GqlGateway.Schema;

public class TagInMemoryDataStore
{
    private readonly Dictionary<int, Tag> _storage;
    public TagInMemoryDataStore()
    {
        _storage = new Dictionary<int, Tag>();
        seedData();
    }

    private void seedData()
    {
        _storage[1] = new Tag(1, "C#");
        _storage[2] = new Tag(2, "TS");
        _storage[3] = new Tag(3, "JS");
        _storage[4] = new Tag(4, "scalar");
    }
    public IEnumerable<Tag> GetTags() => _storage.Values;


    public Tag AddTag(Tag tag)
    {
        if (!_storage.ContainsKey(tag.Id))
        {
            _storage.Add(tag.Id, tag);
        }
        return tag;
    }
}


```
4. Register datastore 
``` csharp
builder.Services.AddSingleton<TagInMemoryDataStore>();
```

5. Configure Query Type with HotChocolate

``` csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>(); // <=== add  query type
```

6. Configure asp.net pipeline

``` csharp
var app = builder.Build();
app.UseWebSockets();
app.MapGraphQL(); //<==== Add /graphql endpoint
app.Run();

```


7. Run application 

``` csharp
dotnet run GqlGateway.csproj  --urls=http://localhost:5000 
```
# Add Mutation
A Mutation is **a GraphQL Operation that allows you to insert new data or modify the existing data on the server-side**

1. Add mutation class
``` csharp
using HotChocolate.Subscriptions;
namespace GqlGateway.Schema;

public class Mutation
{
    public async Task<Tag> AddTag(Tag tag,
        [Service] TagInMemoryDataStore storage,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var result = storage.AddTag(tag);
        //await eventSender.SendAsync("AddTag", tag, cancellationToken);
        return result;
    }
}

```
2.Register mutation type
``` csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();
```
3. Run application

```
dotnet run GqlGateway.csproj  --urls=http://localhost:5000 
```

## Subscription
In addition to [queries](https://www.apollographql.com/docs/react/data/queries) and [mutations](https://www.apollographql.com/docs/react/data/mutations), GraphQL supports a third operation type: **subscriptions**.

Subscriptions are useful for notifying your client in real time about changes to back-end data, such as the creation of a new object or updates to an important field.

1.Let's create new class  called  Subscription

``` csharp
namespace GqlGateway.Schema;

public class Subscription
{
    [Subscribe]
    [Topic("AddTag")]
    public Tag TagAdded(
        [EventMessage] Tag tag)
    {
        return tag;
    }
}

```
2. Register Subscription Type to Hotchocolate
``` csharp 
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>() //<=== add subscription type
    .AddInMemorySubscriptions(); //<== Add in-memory message queue

```

3. Start application
```
dotnet run GqlGateway.csproj  --urls=http://localhost:5000 
```


## Fetch data from REST API
We need to create more new project called `TagsWebApi`
1. Create new project
``` csharp
dotnet new webapi -minimal -o TagsWebApi  -f net6.0  --no-https
```

2. Add required packages

```
dotnet add package Microsoft.EntityFrameworkCore.Design --version 7.0.0

dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 7.0.0

dotnet add package Swashbuckle.AspNetCore --version 6.4.0
```


3.Create Tag table 

```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TagsWebApi.Models;


[Table("Tags")]
public class Tag
{

    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
}

```

4. Create Database Context with EF core 
```
using Microsoft.EntityFrameworkCore;

namespace TagsWebApi.Models;

public class TagDatabaseContext : DbContext
{
    public TagDatabaseContext(DbContextOptions<TagDatabaseContext> options)
        :base(options)
    {
    }
    public DbSet<Tag> Tags { get; set; }
}
```

5. Create Migration script inside /Migrations folder
```
//20221116171119_AddTagToDB.cs
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TagsWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddTagToDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
// 20221116171119_AddTagToDB.Designer.cs
// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TagsWebApi.Models;

#nullable disable

namespace TagsWebApi.Migrations
{
    [DbContext(typeof(TagDatabaseContext))]
    [Migration("20221116171119_AddTagToDB")]
    partial class AddTagToDB
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TagsWebApi.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });
#pragma warning restore 612, 618
        }
    }
}

//TagDatabaseContextModelSnapshot.cs
// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TagsWebApi.Models;

#nullable disable

namespace TagsWebApi.Migrations
{
    [DbContext(typeof(TagDatabaseContext))]
    partial class TagDatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TagsWebApi.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });
#pragma warning restore 612, 618
        }
    }
}

```

6. Add MigrationManager 
```
namespace TagsWebApi.Models;

public static class MigrationManager
{
    public static WebApplication InitialDatabase(this WebApplication webapp)
    {
        using var scope = webapp.Services.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<TagDatabaseContext>();
        try
        {
            context.Database.EnsureCreated();
            var hasTags = context.Tags.Any();

            if (!hasTags)
            {
                context.Tags.Add(new Tag { Name = "C#" });
                context.Tags.Add(new Tag { Name = "Java" });
                context.Tags.Add(new Tag { Name = "ts" });
                context.Tags.Add(new Tag { Name = "Javascript" });

                context.SaveChanges();
            }

        }
        catch (Exception ex)
        {
            //Log errors or do anything you think it's needed
            throw;
        }
        return webapp;
    }
}
```

7. Add Repository

```
// 

using Microsoft.EntityFrameworkCore;
using TagsWebApi.Models;

namespace TagsWebApi.Repositories;

public interface ITagRepository
{
    Task<IEnumerable<Tag>> GetAllAsync(CancellationToken cancellationToken);
    Task<(Tag tag, bool isCreated)> CreateNewTag(string tagName, CancellationToken cancellationToken);
    Task<Tag?> GetTagByNameAsync(string name, CancellationToken cancellationToken);
    Task<bool> DeleteTagByIdAsync(int id, CancellationToken cancellationToken);
}


public class EfCoreTagRepository : ITagRepository
{
    private readonly TagDatabaseContext _dbContext;

    public EfCoreTagRepository(TagDatabaseContext dbContext) => _dbContext = dbContext;

    public async Task<(Tag, bool)> CreateNewTag(string tagName, CancellationToken cancellationToken)
    {
        var existingTag = await _dbContext.Tags.FirstOrDefaultAsync(x => x.Name == tagName);
        if (existingTag is not null)
        {
            return (existingTag, false);
        }
        var newTag = new Tag { Name = tagName };
        await _dbContext.Tags.AddAsync(newTag, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return (newTag, true);
    }

    public async Task<bool> DeleteTagByIdAsync(int id, CancellationToken cancellationToken)
    {
        _dbContext.Tags.Remove(new Tag { Id = id });
        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<IEnumerable<Tag>> GetAllAsync(CancellationToken cancellationToken) 
        => await _dbContext.Tags.ToArrayAsync(cancellationToken);

    public async Task<Tag?> GetTagByNameAsync(string name, CancellationToken cancellationToken)
        => await _dbContext.Tags.FirstOrDefaultAsync(x => x.Name == name);

}
```

8. Add Api endpoint 
``` csharp
//TagEndpoints
using Microsoft.AspNetCore.Mvc;
using TagsWebApi.ApiModel;
using TagsWebApi.Models;
using TagsWebApi.Repositories;

namespace TagsWebApi.Endpoints;
public static class TagEndpoints
{
    public static WebApplication MapTagApiEndpoint(this WebApplication app)
    {
        app.MapGet("/api/tags", TagsEndpointRouting.GetAllAsync);
        app.MapPost("/api/tags/{tagName}", TagsEndpointRouting.CreateNewTag).Produces<CreateTagResult>(StatusCodes.Status200OK);
        app.MapDelete("/api/tags/{id}", TagsEndpointRouting.DeleteTagById).Produces(StatusCodes.Status200OK);
        return app;
    }

    internal sealed class TagsEndpointRouting
    {
        internal static async Task<IEnumerable<Tag>> GetAllAsync(
            [FromServices] ITagRepository tagRepos,
            CancellationToken cancellationToken) => await tagRepos.GetAllAsync(cancellationToken);

        internal static async Task<IResult> CreateNewTag(
            [FromServices] ITagRepository tagRepos, string tagName,
           CancellationToken cancellationToken)
        {
            var result = await tagRepos.CreateNewTag(tagName, cancellationToken);
            return Results.Ok(new CreateTagResult { Tag = result.tag, IsCreated = result.isCreated });
        }

        internal static async Task<IResult> DeleteTagById(
           TagDatabaseContext dbContext,
           [FromRoute(Name = "id")] int id,
           CancellationToken cancellationToken)
        {
            dbContext.Tags.Remove(new Tag { Id = id });
            try
            {
                await dbContext.SaveChangesAsync(cancellationToken);
                return Results.Ok();
            }
            catch
            {
                return Results.Problem($"Can not delete Tag with id {id}");
            }
        }

    }

}

```

9. Add CreateTagResult model

```
using TagsWebApi.Models;

namespace TagsWebApi.ApiModel;

public class CreateTagResult
{
    public Tag? Tag { get; set; }
    public bool IsCreated { get; set; }
}
```

10. Configure Api project
```
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using TagsWebApi.Endpoints;
using TagsWebApi.Models;
using TagsWebApi.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.AddEfCore().AddOpenApi();
var app = builder.Build();
app.InitialDatabase();
app.UseSwagger();
app.UseSwaggerUI();
app.MapTagApiEndpoint();
app.Run();



public static class WebApplicationBuilderExtension
{
    public static WebApplicationBuilder AddEfCore(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<TagDatabaseContext>(dbOptions =>
        {
            var connection = builder.Configuration.GetConnectionString(nameof(TagDatabaseContext));
            dbOptions.UseSqlServer(connection);
        });
        // EF core
        builder.Services.AddScoped<ITagRepository, EfCoreTagRepository>();
        return builder;
    }

    public static WebApplicationBuilder AddOpenApi(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer()
            .AddSwaggerGen(options =>
            {
                var contact = new OpenApiContact()
                {
                    Name = "Agoda",
                    Email = "dev@agoda.com",
                    Url = new Uri("http://www.agoda.com")
                };
                var info = new OpenApiInfo()
                {
                    Version = "v1",
                    Title = "Tag Open API",
                    Description = "Swagger Tag Minimal API for GQL",
                    Contact = contact
                };
                options.SwaggerDoc("v1", info);

            })
            .Configure<SwaggerGeneratorOptions>(options =>
            {
                options.InferSecuritySchemes = true;
            });
        return builder;
 
    }
}

```
11. Add MSSQL connection string to appsettings.json
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "TagDatabaseContext": "Server=localhost,1433;Database=TagDB;User Id=sa;Password=yourStrong(!)Password;TrustServerCertificate=True"
  }
}


```

11. Run MSSQL Docker
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -e "MSSQL_PID=Express" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```




12. Add swagger.nswag and  swagger.json to gateway project inside /OpenApi and execute this command

```
// global tools
>> dotnet tool install --global NSwag.ConsoleCore --version 13.18.0
>> nswag run /runtime:Net60 /file:OpenAPI.nswag

```
13. Try run application
```
dotnet run --urls=http://localhost:5003
```

## Change code in gateway

```
// Mutation
using HotChocolate.Subscriptions;
namespace GqlGateway.Schema;

public class Mutation
{
    public async Task<Tag> AddTag(string tagName,
                                [Service] ITagApiClient service,
                                [Service] ITopicEventSender eventSender,
                                CancellationToken cancellationToken)
    {
        var tagResult = await service.ApiTagsPostAsync(tagName);
        if (tagResult.IsCreated)
        {
            await eventSender.SendAsync("AddTag", tagResult.Tag, cancellationToken);
        }
        return tagResult.Tag;
    }
}

// Query 


namespace GqlGateway.Schema;

public class Query { 
     public async Task<ICollection<Tag>> GetTagsAsync(
        [Service] ITagApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.ApiTagsGetAsync(cancellationToken);
    }
}
//Programe.cs
using GqlGateway;
using GqlGateway.Schema;
var builder = WebApplication.CreateBuilder(args);
var serviceSection = builder.Configuration.GetSection("Services");
var tagApiClientEndpoint = serviceSection.GetValue<string>("TagApiClient:endpoint");
//builder.Services.AddSingleton<TagInMemoryDataStore>();
builder.Services.AddHttpClient<ITagApiClient, TagApiClient>(client  => client.BaseAddress = new Uri(tagApiClientEndpoint));
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddInMemorySubscriptions();

var app = builder.Build();
app.UseWebSockets();
app.MapGraphQL();
app.Run();


```

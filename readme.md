# Creating a GraphQL Gateway

Tutorial to learn base concepts of GraphQL and build a Gateway API using Hot Chocolate server supporting Query, Mutation, Subscription and Schema Stitching.

## Theory

- Microservices Architecture
  - Gateway API
- API Design
  - REST
  - GraphQL
- NoSQL
  - Document-Oriented Database
  - Key-Value Database
  - Graph Database

## Stack of Technologies

- React
- .NET 6
- Hot Cholocate
- GraphQL
- MongoDB
- Redis
- Neo4j

## Prerequisites

- Required:
  - Install IDE (VSCode: https://code.visualstudio.com/download)
  - Install Docker (https://docs.docker.com/get-docker/)
  - Install .NET 6 SDK (https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- Good to know:
  - What is Docker (read https://docs.docker.com/get-started/)
  - What is REST (read https://en.wikipedia.org/wiki/Representational_state_transfer)
  - What is Neo4j (learn http://www.graphville.com)

## Learning Materials

- GraphQL (read https://graphql.org/)
- Gateway API (read https://microservices.io/patterns/apigateway.html)
- Hot Chocolate (read https://chillicream.com/docs/hotchocolate)
- Hot Chocolate (watch https://www.youtube.com/@ChilliCream)

# workshop
## Project setup
1.Create new project 
``` CMD
//create project
dotnet new webapi -minimal -o GqlGateway -f net6.0 --no-openapi --no-https
//requied packages
dotnet add package HotChocolate.AspNetCore --version 12.15.2
```
2. Add Query Type
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
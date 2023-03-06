# Hot Chocolate GraphQL Server

## Step 1: Setup GraphQL Server

- Open a folder `/workspace` and work inside that folder only.

- Create a new webapi project.

```dotnet
dotnet new webapi -n GatewayApi -f net6.0 --no-openapi --no-https
```

- Open `/TagsApi` fodler and add `.gitignore` file.

```dotnet
dotnet new gitignore
```

- Install `HotChocolate.AspNetCore` package.

```dotnet
dotnet add package HotChocolate.AspNetCore --version 13.0.5
```

- Remove `/Controllers` folder and `WeatherForecast.cs` file.

- Add a data model as `Tag.cs`.

```cs
// Tag.cs
public class Tag
{
    public string Name { get; set; } = null!;
}
```

- Add GraphQL Query as `Query.cs`. Just a mock result.

```cs
// Query.cs
public class Query
{
    public Tag GetTag()
    {
        return new Tag { Name = "HotChocolate" };
    }
}
```

- Add GraphQL server support into `Program.cs` file.

```cs
// Program.cs
using HotChocolate;

const string AllowedOrigin = "allowedOrigin";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedOrigin,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();
app.UseCors(AllowedOrigin);
app.MapGraphQL();
app.Run();
```

> Note: Support `AllowedOrigin` in advance to prevent CORS issue of using Gateway by Web Client.

- Setup `launchSettings.json` file.

```json
      "launchUrl": "graphql",
      "applicationUrl": "http://localhost:5050",
```

- Run project locally.

```dotnet
dotnet watch --no-hot-reload
```

- Query a single `tag` object using BananaCakePop [http://localhost:5050/graphql/](http://localhost:5050/graphql/).

```graphql
query {
  tag {
    name
  }
}
```

- Stop the app.

## Step 2: GraphQL Query and Mutation using Autogenerated Api Client

- Create a tool manifest inside `GatewayApi` folder.

```sh
dotnet new tool-manifest
```

- Install the NSwag tool.

```dotnet
dotnet tool install NSwag.ConsoleCore --version 13.18.2
```

- Create `swagger.json` file based your REST endpoint. Make sure, that TagsApi app is running.

```sh
curl -o swagger.json http://localhost:5010/swagger/v1/swagger.json
```

- Generate the client from the `swagger.json` file.

```dotnet
dotnet nswag swagger2csclient /input:swagger.json /classname:TagsApiClient /namespace:GatewayApi /output:TagsApiClient.cs /generateClientInterfaces:true /useBaseUrl:false
```

- Install `Newtonsoft.Json` package to support `TagsApiClient` needs.

```dotnet
dotnet add package Newtonsoft.Json
```

- Add `Services` section into `appsettings.json` file.

```json
  "Services": {
    "TagsApi": {
      "endpoint": "http://localhost:5010"
    }
  }
```

- Add Http Client into DI container.

```cs
// Program.cs
using GatewayApi;
using HotChocolate;

var builder = WebApplication.CreateBuilder(args);
// rest service
var serviceSection = builder.Configuration.GetSection("Services");
var tagsApiEndpoint = serviceSection.GetValue<string>("TagsApi:endpoint");
builder.Services.AddHttpClient<ITagsApiClient, TagsApiClient>(client => client.BaseAddress = new Uri(tagsApiEndpoint));
```

- Replace `Query.cs` implementation using Http Client.

```cs
// Query.cs
using System.Collections;

namespace GatewayApi;

public class Query
{
    public async Task<ICollection<Tag>> GetTagsAsync(
        [Service] ITagsApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.TagAllAsync(cancellationToken);
    }
}
```

- Provide Add Tag functionality using GraphQL Mutation with `Mutation.cs`.

```cs
// Mutation.cs
namespace Gateway;

public class Mutation
{
    public async Task<TagPayload> AddTag(string name,
                                [Service] ITagsApiClient service,
                                CancellationToken cancellationToken)
    {
        await service.TagPOSTAsync(name, cancellationToken);
        return new TagPayload { Tag = new Tag { Name = name } };
    }
}

public class TagPayload
{
    public Tag Tag { get; set; } = null!;
}
```

- Support mutation in `Program.cs` file.

```cs
// Program.cs
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddTypeExtension<Mutation>();
```

- Run the app and query `tags` collection using BananaCakePop [http://localhost:5050/graphql/](http://localhost:5050/graphql/).

```graphql
query AllTags {
  tags {
    name
  }
}
```

- You can add new Tag using a mutation request.

```graphql
mutation AddTag {
  addTag(name: "GraphQL") {
    tag {
      name
    }
  }
}
```

> Note: Gateway API proxy your requests to REST API and manage MongoDB storage.

- Stop the app.

## Step 3: GraphQL Subscriptions using Redis

- Add Redis settings into `appsettings.json` file.

```json
    "Redis": {
      "endpoint": "<redis.endpoint>",
      "password": "<redis.password>"
    }
```

> Note: Don't forget to replace connection props. with an actual credentials from our secret chat.

- Install HotChocolate Redis package.

```dotnet
dotnet add package HotChocolate.Subscriptions.Redis
```

- Add `Subscription.cs` file.

```cs
// Subscription.cs
namespace GatewayApi;

public class Subscription
{
    [Subscribe]
    [Topic("AddTag")]
    public Tag TagAdded([EventMessage] Tag tag) => tag;
}
```

- Inject subscription into Mutation.

```cs
// Mutation.cs
using HotChocolate.Subscriptions;

namespace GatewayApi;

public class Mutation
{
    public async Task<TagPayload> AddTag(string name,
                                [Service] ITagsApiClient service,
                                [Service] ITopicEventSender eventSender,
                                CancellationToken cancellationToken)
    {
        await service.TagPOSTAsync(name, cancellationToken);
        var tag = new Tag { Name = name };
        await eventSender.SendAsync("AddTag", tag, cancellationToken);
        return new TagPayload { Tag = tag };
    }
}
```

- Change `Program.cs` file to support GraphQL subscriptions.

```cs
// Program.cs
using StackExchange.Redis
// ...
// redis
(string endpoint, string password) redisConfiguration =
(
  serviceSection.GetValue<string>("Redis:endpoint"),
  serviceSection.GetValue<string>("Redis:password")
);
// graphql
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddRedisSubscriptions(_ =>
        ConnectionMultiplexer.Connect(new ConfigurationOptions
        {
            EndPoints = { redisConfiguration.endpoint },
            Password = redisConfiguration.password
        })
    );
// app
var app = builder.Build();
app.UseWebSockets();
app.MapGraphQL();
app.Run();
```

- Run the app and subscribe to `AddTag` topic.

```graphql
subscription TagAdded {
  tagAdded {
    name
  }
}
```

- Now, once you adding a new Tag, you've been notified.

## Step 4: Docker

- Create `Dockerfile` inside project root folder.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS sdk
WORKDIR /app
COPY ./GatewayApi.csproj ./
RUN dotnet restore

FROM sdk AS publish
WORKDIR /app
COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=publish /app/out .
ENTRYPOINT ["dotnet", "GatewayApi.dll"]
```

- Update `docker-compose.yml` file inside a `/workspace` folder.

```yml
version: "3.6"

services:
  # GRAPHQL GATEWAY API
  gatewayapi:
    image: gatewayapi
    build:
      context: ./GatewayApi
      dockerfile: ./Dockerfile
    environment:
      - ASPNETCORE_ENVIRONMENT=Release
      - ASPNETCORE_URLS=http://+:5050;
    ports:
      - "5050:5050"
    expose:
      - "5050"
    depends_on:
      - tagsapi
      - likesapi

  # WEBAPI MONGODB
  # ...

  # GRAPHQL NEO4J
  # ...
```

- Start service using docker compose.

```sh
docker-compose up
```

###### Refs

- https://chillicream.com/docs/hotchocolate/v13/fetching-data/fetching-from-rest
# Hot Chocolate GraphQL Server

## Step 1: Setup GraphQL Server

- Open a folder `/workspace` and work inside that folder only

- Create a new webapi project

```dotnet
dotnet new webapi -n GatewayApi -f net6.0 --no-openapi --no-https
```

- Open `/TagsApi` fodler and add `.gitignore` file

```dotnet
dotnet new gitignore
```

- Install `HotChocolate.AspNetCore` package

```dotnet
dotnet add package HotChocolate.AspNetCore --version 13.0.2
```

- Remove `/Controllers` folder and `WeatherForecast.cs` file

- Add a data model as `Tag.cs`

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
        return new Tag { Name = "Item" };
    }
}
```

- Add GraphQL server support into `Program.cs` file

```cs
// Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();
app.MapGraphQL();
app.Run();
```

- Run project locally

```dotnet
dotnet watch --no-hot-reload
```

- Check that all works using BananaCakePop [http://localhost:5050/graphql/](http://localhost:5050/graphql/)

- Query Tag

```graphql
query {
  tag {
    name
  }
}
```

## Step 2: Resolve Tag via REST Api dependency



## Step 4: Docker

- Create `Dockerfile` inside project root folder

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

- Create `docker-compose.yml` file inside a `/workspace` folder. (One level up to the project root folder).

- In future you will use this file to assemble all services

```yml
version: "3.6"

services:
  # WEBAPI MONGODB
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

- Start service using docker compose

```sh
docker-compose up
```

###### Resources

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-6.0&tabs=visual-studio

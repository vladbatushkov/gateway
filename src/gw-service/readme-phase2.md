# Hot Chocolate GraphQL Server

## Step 1: Schema Stitching

- Add settings into `appsettings.json` file.

```json
    "LikesApi": {
      "endpoint": "http://likesapi:4000"
    }
```

- Install `HotChocolate.Stitching` package.

```dotnet
dotnet add package HotChocolate.Stitching --version 13.0.5
```

- Support `LikesGqlClient` schema in `Program.cs` file.

```cs
// Program.cs
var likesapiEndpoint = serviceSection.GetValue<string>("LikesApi:endpoint");
builder.Services.AddHttpClient("LikesGqlClient", client
    => client.BaseAddress = new Uri(likesapiEndpoint));
builder.Services
    .AddGraphQLServer()
    .AddTypeExtension<Query>()
    .AddTypeExtension<Mutation>()
    .AddTypeExtension<Subscription>()
    .AddRedisSubscriptions(_ =>
        ConnectionMultiplexer.Connect(new ConfigurationOptions
        {
            EndPoints = { redisConfiguration.endpoint },
            Password = redisConfiguration.password
        }))
    .AddRemoteSchema("LikesGqlClient", ignoreRootTypes: false);
```

- Replace internal Query, Mutation and Subscription by extentions.

```cs
// Query.cs
[ExtendObjectType("Query")]
public class Query
```

```cs
// Mutation.cs
[ExtendObjectType("Mutation")]
public class Mutation
```

```cs
// Subscription.cs
[ExtendObjectType("Subscription")]
public class Subscription
```

## Step 2: Explore

- Run the app and explore new schema [http://localhost:5050/graphql/](http://localhost:5050/graphql/).

- Manage `User` node in Neo4j using GraphQL gateway

```graphql
# create a user
mutation CreateUsers($userName: String!) {
  createUsers(input: { name: $userName }) {
    info {
      nodesCreated
    }
  }
}

# get all users
query Users {
  users {
    name
  }
}

# get user info by name
query User($userName: String!) {
  users(where: { name: $userName }) {
    name
    technologies {
      name
    }
  }
}
```

- Manage connection between `User` and `Technology`.

```graphql
# connect
mutation UpdateUsers($userName: String!, $technologyName: String!) {
  updateUsers(
    connectOrCreate: {
      technologies: {
        where: { node: { name: $technologyName } }
        onCreate: { node: { name: $technologyName } }
      }
    }
    where: { name: $userName }
  ) {
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}

# disconnect
mutation DetachUsers($userName: String!, $technologyName: String!) {
  updateUsers(
    disconnect: { technologies: { where: { node: { name: $technologyName } } } }
    where: { name: $userName }
  ) {
    info {
      relationshipsDeleted
    }
  }
}
```

- Get a recommmendation sample.

```graphql
# get recommendation
query GetRecommendation($userName: String!) {
  users(where: { name: $userName }) {
    technologies {
      users(where: { NOT: { name: $userName } }) {
        name
      }
    }
  }
}
```

###### Refs

- https://chillicream.com/docs/hotchocolate/v13/distributed-schema/schema-stitching

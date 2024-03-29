# Hot Chocolate GraphQL Server

## Step 1: Schema Stitching

- Add settings into `appsettings.json` file.

```json
    "LikesApi": {
      "endpoint": "http://likesapi:4000"
    }
```

- Add `appsettings.Development.json` mode.

```json
    "LikesApi": {
      "endpoint": "http://localhost:4000"
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
using HotChocolate;
using System.Collections;

[ExtendObjectType("Query")]
public class Query
```

```cs
// Mutation.cs
using HotChocolate;
using HotChocolate.Subscriptions;

[ExtendObjectType("Mutation")]
public class Mutation
```

```cs
// Subscription.cs
using HotChocolate;

[ExtendObjectType("Subscription")]
public class Subscription
```

## Step 2: Explore Schema

- Run the app and explore new schema [http://localhost:5050/graphql/](http://localhost:5050/graphql/).

```dotnet
dotnet watch --no-hot-reload
```

- Manage `User` node in Neo4j using GraphQL gateway

```graphql
# create a user
mutation CreateUsers(
  $userAccount: String!
  $userName: String!
  $userImage: String!
  $userBio: String!
) {
  createUsers(
    input: {
      account: $userAccount
      name: $userName
      image: $userImage
      bio: $userBio
    }
  ) {
    info {
      nodesCreated
    }
  }
}

# get all users
query Users {
  users {
    account
    name
    image
    bio
  }
}

# get user info by name
query User($userAccount: String!) {
  users(where: { account: $userAccount }) {
    account
    name
    image
    bio
    technologies {
      name
    }
  }
}
```

- Manage connection between `User` and `Technology`.

```graphql
# connect
mutation UpdateUsers($userAccount: String!, $technologyName: String!) {
  updateUsers(
    connectOrCreate: {
      technologies: {
        where: { node: { name: $technologyName } }
        onCreate: { node: { name: $technologyName } }
      }
    }
    where: { account: $userAccount }
  ) {
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}

# disconnect
mutation DetachUsers($userAccount: String!, $technologyName: String!) {
  updateUsers(
    disconnect: { technologies: { where: { node: { name: $technologyName } } } }
    where: { account: $userAccount }
  ) {
    info {
      relationshipsDeleted
    }
  }
}
```

- Get a recommmendation sample.

```graphql
# get recommended friends
query GetFriends($userAccount: String!) {
  users(where: { account: $userAccount }) {
    technologies {
      users(where: { NOT: { account: $userAccount } }) {
        account
        name
        image
        bio
      }
    }
  }
}
```

## Step 3: Dockerize (Optional)

- Update `docker-compose.yml` file from your root.

```yml
version: "3.6"

services:
  # GRAPHQL GATEWAY API - been created already
  gatewayapi:
    # ...
    depends_on:
      - tagsapi
      - likesapi # add this


  # WEBAPI MONGODB - been created already
  # ...
```

- Start containers again.

```sh
docker-compose up --build
```

###### Refs

- https://chillicream.com/docs/hotchocolate/v13/distributed-schema/schema-stitching

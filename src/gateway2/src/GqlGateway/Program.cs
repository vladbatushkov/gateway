
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddHttpClient<ITagApiClient, TagApiClient>(client
    => client.BaseAddress = new Uri("http://tagswebapi:5003"));

services.AddHttpClient("neo4jgql", c => c.BaseAddress = new Uri("http://neo4jgql:4000"));

var options = new ConfigurationOptions
{
    EndPoints = { "redis-graphql:6379" },
    Password = "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"
};




services
    .AddGraphQLServer()
    //.AddQueryType(d=> d.Name("Query"))
    //.AddMutationType<Mutation>()
    //.AddMutationConventions()
    //.AddSubscriptionType<Subscription>()
    .AddTypeExtension<Queries>()
    .AddTypeExtension<Mutations>()
    .AddTypeExtension<Subscriptions>()

    .AddRedisSubscriptions(_ => ConnectionMultiplexer.Connect(options))
    .AddRemoteSchema("neo4jgql", ignoreRootTypes: false);
var app = builder.Build();
app.UseWebSockets();
app.MapGraphQL();

app.Run();



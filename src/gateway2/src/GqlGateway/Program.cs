
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddHttpClient<ITagApiClient, TagApiClient>(client
    => client.BaseAddress = new Uri("http://tagswebapi:5003"));

var options = new ConfigurationOptions
{
    EndPoints = { "redis-graphql:6379" },
    Password = "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"
};

// Redis configuration 


services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddMutationConventions()
    .AddSubscriptionType<Subscription>()
    .AddRedisSubscriptions(_ => ConnectionMultiplexer.Connect(options));

var app = builder.Build();


app.UseWebSockets();
app.MapGraphQL();

app.Run();

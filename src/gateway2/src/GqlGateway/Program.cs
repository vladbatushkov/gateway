var builder = WebApplication.CreateBuilder(args);
var serviceSection = builder.Configuration.GetSection("Services");

var tagApiClientEndpoint = serviceSection.GetValue<string>("TagApiClient:endpoint");

(string endpoint, string password) redisConfiguration = (serviceSection.GetValue<string>("Redis:endpoint"),
                                            serviceSection.GetValue<string>("Redis:password"));

var neo4jEndpoint =  serviceSection.GetValue<string>("Neo4jgql:endpoint");

builder.Services.AddHttpClient<ITagApiClient, TagApiClient>(client
    => client.BaseAddress = new Uri(tagApiClientEndpoint));
builder.Services.AddHttpClient("Neo4jgql", client
    => client.BaseAddress = new Uri(neo4jEndpoint));

builder.Services
    .AddGraphQLServer()
    .AddTypeExtension<Queries>()
    .AddTypeExtension<Mutations>()
    .AddTypeExtension<Subscriptions>()
    .AddRedisSubscriptions(_ => 
        ConnectionMultiplexer.Connect(new ConfigurationOptions
        {
            EndPoints = { redisConfiguration.endpoint },
            Password = redisConfiguration.password
        }))
    .AddRemoteSchema("Neo4jgql", ignoreRootTypes: false);

var app = builder.Build();

app.UseWebSockets();
app.MapGraphQL();
app.Run();



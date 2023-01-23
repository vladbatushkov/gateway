var builder = WebApplication.CreateBuilder(args);

const string AllowedOrigin = "allowedOrigin";

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

var serviceSection = builder.Configuration.GetSection("Services");
var tagApiClientEndpoint = serviceSection.GetValue<string>("TagApiClient:endpoint");
(string endpoint, string password) redisConfiguration = 
    (serviceSection.GetValue<string>("Redis:endpoint"),
           serviceSection.GetValue<string>("Redis:password"));

var neo4jEndpoint = serviceSection.GetValue<string>("Neo4jgql:endpoint");

builder.Services
    .AddHttpClient<ITagApiClient, TagApiClient>(client   
        => client.BaseAddress = new Uri(tagApiClientEndpoint));


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
        }));

var app = builder.Build();
app.UseCors(AllowedOrigin);
app.UseWebSockets();
app.MapGraphQL();
app.Run();



using GatewayApi;
using HotChocolate;
using StackExchange.Redis;

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
// rest service
var serviceSection = builder.Configuration.GetSection("Services");
var tagsApiEndpoint = serviceSection.GetValue<string>("TagsApi:Endpoint");
builder.Services.AddHttpClient<ITagsApiClient, TagsApiClient>(client => client.BaseAddress = new Uri(tagsApiEndpoint));
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
app.UseCors(AllowedOrigin);
app.UseWebSockets();
app.MapGraphQL();
app.Run();
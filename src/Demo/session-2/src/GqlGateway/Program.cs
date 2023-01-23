using GqlGateway.GraphQL;

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
builder.Services.AddSingleton<TagInMemoryDataStore>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    // Step 1) Add subscription type
    .AddSubscriptionType<Subscription>()
    // Step 2) Use InMemoryPubSub 
    .AddInMemorySubscriptions()
    ;
   

var app = builder.Build();

app.UseCors(AllowedOrigin);
// Step 3) Use Web socket 
app.UseWebSockets();
app.MapGraphQL();
app.Run();



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

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationConventions()
    .AddMutationType<Mutation>()
    .AddInMemorySubscriptions()
    .AddSubscriptionType<Subscription>();

var app = builder.Build();
app.UseCors(AllowedOrigin);
app.UseWebSockets();
app.MapGraphQL();
app.Run();

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
    .AddMutationType<Mutation>();
   

var app = builder.Build();

app.UseCors(AllowedOrigin);
app.UseWebSockets();
app.MapGraphQL();
app.Run();



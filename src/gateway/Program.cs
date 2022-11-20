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
    .AddQueryType<Query>();

var app = builder.Build();
app.UseCors(AllowedOrigin);
app.MapGraphQL();

app.Run();

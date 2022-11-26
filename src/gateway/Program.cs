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

// setup hot chocolate here

var app = builder.Build();
app.UseCors(AllowedOrigin);
// use hot chocolate here
app.Run();

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services
    .AddDbContext<TagDatabaseContext>(opt =>
{
    var connection =
        builder.Configuration.GetConnectionString(nameof(TagDatabaseContext));
    opt.UseSqlServer(connection);
})
    .AddEndpointsApiExplorer()
    .AddSwaggerGen(swaggerOptions =>
    {
        var contact = new OpenApiContact()
        {
            Name = "Agoda",
            Email = "dev@agoda.com",
            Url = new Uri("http://www.agoda.com")
        };
        var info = new OpenApiInfo()
        {
            Version = "v1",
            Title = "Tag Open API",
            Description = "Swagger Tag Minimal API for GQL",
            Contact = contact
        };
        swaggerOptions.SwaggerDoc("v1", info);

    })
    .Configure<SwaggerGeneratorOptions>(swaggerGeneratorOptions => swaggerGeneratorOptions.InferSecuritySchemes = true);

// EF core
services.AddScoped<ITagRepository, EfCoreTagRepository>();


var app = builder.Build();
app.InitialDatabase();
app.UseSwagger();
app.UseSwaggerUI();

app.MapTagApiEndpoint();

app.Run();

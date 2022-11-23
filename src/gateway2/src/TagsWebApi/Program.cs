var builder = WebApplication.CreateBuilder(args);
builder.AddEfCore().AddOpenApi();
var app = builder.Build();
app.InitialDatabase();
app.UseSwagger();
app.UseSwaggerUI();
app.MapTagApiEndpoint();
app.Run();



public static class WebApplicationBuilderExtension
{
    public static WebApplicationBuilder AddEfCore(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<TagDatabaseContext>(dbOptions =>
        {
            var connection = builder.Configuration.GetConnectionString(nameof(TagDatabaseContext));
            dbOptions.UseSqlServer(connection);
        });
        // EF core
        builder.Services.AddScoped<ITagRepository, EfCoreTagRepository>();
        return builder;
    }

    public static WebApplicationBuilder AddOpenApi(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer()
            .AddSwaggerGen(options =>
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
                options.SwaggerDoc("v1", info);

            })
            .Configure<SwaggerGeneratorOptions>(options =>
            {
                options.InferSecuritySchemes = true;
            });
        return builder;
    }
}
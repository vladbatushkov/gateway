var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

app.MapGraphQL();
app.Run();

public class Query
{
    public IEnumerable<Product> Products() => new List<Product>
    {
        new Product(Guid.NewGuid(),"T-Shirt","T00001", 450),
        new Product(Guid.NewGuid(),"Beer","BEERXXX", 1200),
    };
}

public record Product(Guid Id, string Name, string SKU, decimal Price);
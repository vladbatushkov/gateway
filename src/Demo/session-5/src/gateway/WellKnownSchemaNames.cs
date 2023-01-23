namespace gateway;

public static class WellKnownSchemaNames
{
    public const string Accounts = "accounts";
    public static Uri AccountEndpoint = new Uri("http://localhost:5001/graphql");
    public const string Products = "products";
    public static Uri ProductsEndpoint = new Uri("http://localhost:5002/graphql");
}

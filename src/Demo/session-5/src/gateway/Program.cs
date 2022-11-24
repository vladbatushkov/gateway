using static gateway.WellKnownSchemaNames;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient(Accounts, c => c.BaseAddress = AccountEndpoint);
builder.Services.AddHttpClient(Products, c => c.BaseAddress = ProductsEndpoint);
builder.Services
    .AddGraphQLServer()
    .AddRemoteSchema(Accounts)
    .AddRemoteSchema(Products);
var app = builder.Build();
app.MapGraphQL();
app.Run();


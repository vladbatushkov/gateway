using GatewayApi;
using HotChocolate;

var builder = WebApplication.CreateBuilder(args);
// rest service
var serviceSection = builder.Configuration.GetSection("Services");
var tagsApiEndpoint = serviceSection.GetValue<string>("TagsApi:Endpoint");
builder.Services.AddHttpClient<ITagsApiClient, TagsApiClient>(client => client.BaseAddress = new Uri(tagsApiEndpoint));
// graphql
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();
app.MapGraphQL();
app.Run();
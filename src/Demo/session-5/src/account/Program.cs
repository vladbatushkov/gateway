var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

app.MapGraphQL();
app.Run();

public class Query
{
    public IEnumerable<Account> Accounts() => new List<Account>
    {
        new Account(Guid.NewGuid(),"Keattisak","Chinburarat"),
        new Account(Guid.NewGuid(),"Vlad","Batushkov"),
    };
}

public record Account(Guid Id, string Name, string LastName);
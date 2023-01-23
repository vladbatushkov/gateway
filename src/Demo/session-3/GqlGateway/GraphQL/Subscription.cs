namespace GqlGateway.GraphQL;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(Mutation.AddTag))]
    public Tag TagAdded([EventMessage] Tag tag) => tag;
}

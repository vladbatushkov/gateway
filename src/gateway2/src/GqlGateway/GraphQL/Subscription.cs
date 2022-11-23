namespace GqlGateway.GraphQL;

[ExtendObjectType("Subscription")]
public class Subscription
{
    [Subscribe]
    [Topic(nameof(Mutation.AddTag))]
    public Tag OnTagAdded([EventMessage] Tag tag) => tag;
}

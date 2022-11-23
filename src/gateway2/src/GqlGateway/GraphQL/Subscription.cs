using HotChocolate;
using HotChocolate.Types;

namespace GqlGateway.GraphQL;


[ExtendObjectType("Subscription")]
public class Subscriptions
{
    [Subscribe]
    [Topic(nameof(Mutations.AddTag))]
    public Tag OnTagAdded([EventMessage] Tag tag) => tag;
}

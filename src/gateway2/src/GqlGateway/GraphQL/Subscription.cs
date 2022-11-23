using HotChocolate;
using HotChocolate.Types;

namespace GqlGateway.GraphQL;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(Mutation.AddTag))]
    public Tag OnTagAdded([EventMessage] Tag tag) => tag;
}

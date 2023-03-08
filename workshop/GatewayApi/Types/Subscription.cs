// Subscription.cs
namespace GatewayApi;

public class Subscription
{
    [Subscribe]
    [Topic("AddTag")]
    public Tag TagAdded([EventMessage] Tag tag) => tag;
}

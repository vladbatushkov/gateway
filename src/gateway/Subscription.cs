public class Subscription
{
    [Subscribe]
    [Topic("TagAdded")]
    public Tag TagAdded([EventMessage] Tag tag) => tag;
}
using HotChocolate.Subscriptions;

namespace GqlGateway.GraphQL;

public class Query
{
    public IEnumerable<Tag> GetTags([Service] TagInMemoryDataStore storage) => storage.GetTags();
}

public class Mutation
{
    public async Task<Tag> AddTag(Tag tag,
        [Service] TagInMemoryDataStore storage,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var result = storage.AddTag(tag);
        await eventSender.SendAsync("AddTag", tag, cancellationToken);
        return result;
    }
}

public class Subscription
{
    [Subscribe]
    [Topic("AddTag")]
    public Tag TagAdded(
        [EventMessage] Tag tag)
    {
        return tag;
    }
}

// Model
public record class Tag(int Id, string Name);
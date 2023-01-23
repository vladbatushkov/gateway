using HotChocolate.Subscriptions;

namespace GqlGateway.GraphQL;

public class Mutation
{
    public async Task<Tag> AddTag(string tagName,
                                [Service] ITagApiClient service,
                                [Service] ITopicEventSender eventSender,
                                CancellationToken cancellationToken)
    {
        var tagResult = await service.ApiTagsPostAsync(tagName);
        if (tagResult.IsCreated)
        {
            await eventSender.SendAsync(nameof(AddTag), tagResult.Tag, cancellationToken);
        }
        return tagResult.Tag;
    }
}

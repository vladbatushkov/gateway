using HotChocolate.Subscriptions;

namespace GqlGateway.GraphQL;

[ExtendObjectType("Mutation")]
public class Mutations
{
    /// <summary>
    /// Example
    /// mutation {
    ///    addTag(input: { tagName: "F#" }){
    ///    tag {
    ///      name
    ///     }
    ///  }
    ///}
    /// </summary>
    /// <param name="tagName"></param>
    /// <param name="service"></param>
    /// <param name="topicEventSender"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>

    public async Task<Tag> AddTag(string tagName,
                                [Service] ITagApiClient service,
                                [Service] ITopicEventSender eventSender,
                                CancellationToken cancellationToken)
    {
        var tagResult = await service.ApiTagsPostAsync(tagName);
        if (tagResult.IsCreated)
        {
            //publish new tag name
           // await eventSender.SendAsync(nameof(AddTag), tagResult.Tag, cancellationToken);
        }
        return tagResult.Tag;
    }
}

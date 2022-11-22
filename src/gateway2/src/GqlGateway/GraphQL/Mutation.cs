using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace GqlGateway.GraphQL;

public class Mutation
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
            await eventSender.SendAsync(nameof(AddTag), tagResult.Tag, cancellationToken);
        }
        return tagResult.Tag;
    }
}

using HotChocolate.Subscriptions;

public class Mutation
{
    public async Task<Tag> AddTag(string name, [Service] ITopicEventSender sender)
    {
        var tag = new Tag(Guid.NewGuid(), name);
        Storage.Tags.Add(tag);
        await sender.SendAsync("TagAdded", tag);
        return tag;
    }
}
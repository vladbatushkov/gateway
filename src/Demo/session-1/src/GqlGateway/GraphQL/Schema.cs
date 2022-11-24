namespace GqlGateway.GraphQL;

public class Query
{
    public IEnumerable<Tag> GetTags([Service] TagInMemoryDataStore storage) => storage.GetTags();
}

public class Mutation
{
    public Tag AddTag(Tag tag, [Service] TagInMemoryDataStore storage) => storage.AddTag(tag);
}

public record class Tag(int Id, string Name);
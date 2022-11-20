public class Query
{
    public IEnumerable<Tag> GetTags() => Storage.Tags;
}
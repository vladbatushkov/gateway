namespace GqlGateway.GraphQL;

public class TagInMemoryDataStore
{
    private readonly Dictionary<int, Tag> _storage;
    public TagInMemoryDataStore()
    {
        _storage = new Dictionary<int, Tag>();
        seedData();
    }

    private void seedData()
    {
        _storage[1] = new Tag(1, "C#");
        _storage[2] = new Tag(2, "TS");
        _storage[3] = new Tag(3, "JS");
        _storage[4] = new Tag(4, "scalar");
    }
    public IEnumerable<Tag> GetTags() => _storage.Values;


    public Tag AddTag(Tag tag)
    {
        if (!_storage.ContainsKey(tag.Id))
        {
            _storage.Add(tag.Id, tag);
        }
        return tag;
    }

}

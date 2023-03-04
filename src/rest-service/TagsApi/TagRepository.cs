using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TagsApi;

public interface ITagRepository
{
    Task<List<Tag>> Get();
    Task<Tag?> Get(string name);
    Task<Tag> Create(string name);
}

public class TagRepository : ITagRepository
{
    private readonly IMongoCollection<Tag> _tagsCollection;

    public TagRepository(
        IOptions<MongoDBSettingsProvider> mongoDBSettingsProvider)
    {
        var dbSettings = mongoDBSettingsProvider.Value;
        var clientSettings = MongoClientSettings.FromConnectionString(dbSettings.ConnectionString);
        _tagsCollection = new MongoClient(clientSettings)
                                .GetDatabase(dbSettings.DatabaseName)
                                .GetCollection<Tag>(dbSettings.CollectionName);
    }

    public async Task<List<Tag>> Get() =>
        await _tagsCollection.Find(_ => true).ToListAsync();

    public async Task<Tag?> Get(string name) =>
        await _tagsCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

    public async Task<Tag> Create(string name)
    {
        var tag = new Tag { Name = name };
        await _tagsCollection.InsertOneAsync(tag);
        return tag;
    }
}
// MongoDBSettingsProvider.cs
namespace TagsApi;

public class MongoDBSettingsProvider
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string CollectionName { get; set; } = null!;
}
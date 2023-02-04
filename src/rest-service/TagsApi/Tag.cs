using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ThirdParty.Json.LitJson;

namespace TagsApi;

public record Tag
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore()]
    public string? Id { get; set; }

    [BsonElement("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;
}

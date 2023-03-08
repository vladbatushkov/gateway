// Tag.cs
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TagsApi;

public class Tag
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore()]
    public string? Id { get; set; }

    [BsonElement("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;
}
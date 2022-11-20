public record Tag(Guid Id, string Name);

public static class Storage
{
    public static List<Tag> Tags = new List<Tag>()
    {
        new Tag(Guid.NewGuid(), "GraphQL"),
        new Tag(Guid.NewGuid(), "C#"),
        new Tag(Guid.NewGuid(), "NoSQL"),
        new Tag(Guid.NewGuid(), "EF")
    };
}
public class Query
{
    public IEnumerable<Tag> GetTags()
        => new[] {
            new Tag(1, "GraphQL", new[] { new Person("Vlad"), new Person("Pom") }),
            new Tag(2, "C#", new[] { new Person("Vlad"), new Person("Pom") }),
            new Tag(3, "NoSQL", new[] { new Person("Vlad") }),
            new Tag(4, "EF", new[] { new Person("Pom") })
            };
}
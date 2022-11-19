public class Query
{
    public Tag GetTag()
        => new Tag("C#", new[] { new Person("Vlad"), new Person("Pom") });
}
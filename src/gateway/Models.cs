public record Tag(int Id, string Name, IEnumerable<Person> People);

public record Person(string Name);

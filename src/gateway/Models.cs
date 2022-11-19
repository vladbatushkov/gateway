public record Tag(string Name, IEnumerable<Person> People);

public record Person(string Name);

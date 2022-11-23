namespace TagsWebApi.Models;

public class TagDatabaseContext : DbContext
{
    public TagDatabaseContext(DbContextOptions<TagDatabaseContext> options)
        :base(options)
    {
    }
    public DbSet<Tag> Tags { get; set; }
}

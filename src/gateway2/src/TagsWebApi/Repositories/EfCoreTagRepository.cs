namespace TagsWebApi.Repositories;

public class EfCoreTagRepository : ITagRepository
{

    private readonly TagDatabaseContext _dbContext;

    public EfCoreTagRepository(TagDatabaseContext dbContext) => _dbContext = dbContext;

    public async Task<(Tag, bool)> CreateNewTag(string tagName, CancellationToken cancellationToken)
    {
        var existingTag = await _dbContext.Tags.FirstOrDefaultAsync(x => x.Name == tagName);
        if (existingTag is not null)
        {
            return (existingTag, false);
        }
        var newTag = new Tag { Name = tagName };
        await _dbContext.Tags.AddAsync(newTag, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return (newTag, true);
    }

    public async Task<bool> DeleteTagByIdAsync(int id, CancellationToken cancellationToken)
    {
        _dbContext.Tags.Remove(new Tag { Id = id });
        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<IEnumerable<Tag>> GetAllAsync(CancellationToken cancellationToken) 
        => await _dbContext.Tags.ToArrayAsync(cancellationToken);

    public async Task<Tag?> GetTagByNameAsync(string name, CancellationToken cancellationToken)
        => await _dbContext.Tags.FirstOrDefaultAsync(x => x.Name == name);

}

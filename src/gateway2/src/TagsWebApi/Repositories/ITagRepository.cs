namespace TagsWebApi.Repositories;

public interface ITagRepository
{
    Task<IEnumerable<Tag>> GetAllAsync(CancellationToken cancellationToken);
    Task<(Tag tag, bool isCreated)> CreateNewTag(string tagName, CancellationToken cancellationToken);
    Task<Tag?> GetTagByNameAsync(string name, CancellationToken cancellationToken);
    Task<bool> DeleteTagByIdAsync(int id, CancellationToken cancellationToken);
}

namespace GqlGateway.GraphQL;

public class Query
{
    public async Task<ICollection<Tag>> GetTagsAsync(
        [Service] ITagApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.ApiTagsGetAsync(cancellationToken);
    }
}

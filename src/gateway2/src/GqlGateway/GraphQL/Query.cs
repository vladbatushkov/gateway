using Microsoft.AspNetCore.Mvc;

namespace GqlGateway.GraphQL;


[ExtendObjectType("Query")]
public class Queries
{
    public async Task<ICollection<Tag>> GetTagsAsync(
        [Service] ITagApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.ApiTagsGetAsync(cancellationToken);
    }
}

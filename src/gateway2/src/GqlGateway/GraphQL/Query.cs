using Microsoft.AspNetCore.Mvc;

namespace GqlGateway.GraphQL;



public class Query
{
    public async Task<ICollection<Tag>> GetTagAsync(
        [Service] ITagApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.ApiTagsGetAsync(cancellationToken);
    }
}

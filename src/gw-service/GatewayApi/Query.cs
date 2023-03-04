using System.Collections;

namespace GatewayApi;

public class Query
{
    public async Task<ICollection<Tag>> GetTagsAsync(
        [Service] ITagsApiClient service,
        CancellationToken cancellationToken)
    {
        return await service.TagAllAsync(cancellationToken);
    }
}
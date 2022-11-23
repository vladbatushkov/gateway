

namespace TagsWebApi.Endpoints;
public static class TagEndpoints
{
    public static WebApplication MapTagApiEndpoint(this WebApplication app)
    {
        app.MapGet("/api/tags", TagsEndpointRouting.GetAllAsync);
        app.MapPost("/api/tags/{tagName}", TagsEndpointRouting.CreateNewTag).Produces<CreateTagResult>(StatusCodes.Status200OK);
        app.MapDelete("/api/tags/{id}", TagsEndpointRouting.DeleteTagById).Produces(StatusCodes.Status200OK);
        return app;
    }

    internal sealed class TagsEndpointRouting
    {
        internal static async Task<IEnumerable<Tag>> GetAllAsync(
            [FromServices] ITagRepository tagRepos,
            CancellationToken cancellationToken) => await tagRepos.GetAllAsync(cancellationToken);

        internal static async Task<IResult> CreateNewTag(
            [FromServices] ITagRepository tagRepos, string tagName,
           CancellationToken cancellationToken)
        {
            var result = await tagRepos.CreateNewTag(tagName, cancellationToken);
            return Results.Ok(new CreateTagResult { Tag = result.tag, IsCreated = result.isCreated });
        }

        internal static async Task<IResult> DeleteTagById(
           TagDatabaseContext dbContext,
           [FromRoute(Name = "id")] int id,
           CancellationToken cancellationToken)
        {
            dbContext.Tags.Remove(new Tag { Id = id });
            try
            {
                await dbContext.SaveChangesAsync(cancellationToken);
                return Results.Ok();
            }
            catch
            {
                return Results.Problem($"Can not delete Tag with id {id}");
            }
        }

    }

}

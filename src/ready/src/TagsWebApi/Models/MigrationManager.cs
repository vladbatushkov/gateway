namespace TagsWebApi.Models;

public static class MigrationManager
{
    public static WebApplication InitialDatabase(this WebApplication webapp)
    {
        using var scope = webapp.Services.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<TagDatabaseContext>();
        try
        {
            context.Database.EnsureCreated();
            var hasTags = context.Tags.Any();

            if (!hasTags)
            {
                context.Tags.Add(new Tag { Name = "C#" });
                context.Tags.Add(new Tag { Name = "Java" });
                context.Tags.Add(new Tag { Name = "ts" });
                context.Tags.Add(new Tag { Name = "Javascript" });

                context.SaveChanges();
            }

        }
        catch (Exception ex)
        {
            //Log errors or do anything you think it's needed
            throw;
        }
        return webapp;
    }
}

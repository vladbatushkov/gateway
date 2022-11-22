namespace TagsWebApi.Models;

[Table("Tags")]
public class Tag
{

    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
}

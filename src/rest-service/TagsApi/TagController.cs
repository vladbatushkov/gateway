using Microsoft.AspNetCore.Mvc;

namespace TagsApi;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private readonly ITagRepository _tagRepository;

    public TagController(ITagRepository tagRepository) =>
        _tagRepository = tagRepository;

    [HttpGet("tags")]
    public async Task<List<Tag>> GetAll() =>
        await _tagRepository.Get();

    [HttpGet]
    public async Task<ActionResult<Tag>> Get([FromQuery] string name)
    {
        var tag = await _tagRepository.Get(name);
        if (tag is null)
        {
            return NotFound();
        }
        return tag;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Bad name");
        }

        name = name.ToLowerInvariant().Trim();
        var tag = await _tagRepository.Get(name);
        if (tag is not null)
        {
            return BadRequest("Tag already exists");
        }

        await _tagRepository.Create(new Tag { Name = name });
        return CreatedAtAction(nameof(Get), new { name });
    }

    [HttpDelete("name")]
    public async Task<IActionResult> Delete(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return NotFound();
        }
        await _tagRepository.Remove(name);
        return NoContent();
    }
}
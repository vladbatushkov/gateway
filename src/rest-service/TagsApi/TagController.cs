using Microsoft.AspNetCore.Mvc;

namespace TagsApi;

[ApiController]
[Route("api/tag")]
public class TagController : ControllerBase
{
    private readonly ITagRepository _tagRepository;

    public TagController(ITagRepository tagRepository) =>
        _tagRepository = tagRepository;

    [HttpGet]
    public async Task<List<Tag>> Get() =>
        await _tagRepository.Get();

    [HttpGet("{name}")]
    public async Task<ActionResult<Tag>> Get(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Empty input not allowed");
        }
        name = name.ToLowerInvariant().Trim();

        var tag = await _tagRepository.Get(name);
        if (tag is null)
        {
            return NotFound("Tag not found");
        }
        return tag;
    }

    [HttpPost]
    public async Task<ActionResult<Tag>> Post([FromBody] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Empty input not allowed");
        }
        name = name.Trim();

        var tag = await _tagRepository.Get(name);
        if (tag is not null)
        {
            return BadRequest("Tag already exists");
        }

        tag = await _tagRepository.Create(name);
        return Ok(tag);
    }
}

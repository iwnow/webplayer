namespace api.Controllers
{
  using System;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Extensions.Logging;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.AspNetCore.Http;
  using Services;
  using Models;
  using System.Linq;
  using Microsoft.EntityFrameworkCore;


  public class PlaylistController : Controller {
    readonly ILogger _logger;
    readonly IHostingEnvironment _env;
    readonly IPlaylistService _playListService;
    public PlaylistController(ILogger<PlaylistController> logger, 
      IHostingEnvironment env,
      IPlaylistService plls) {
      _logger = logger;
      _env = env;
      _playListService = plls;
    }

    [HttpGet]
    [Route("api/playlist")]
    public async Task<object> GetPLaylist() {
      var tracks = await _playListService.GetPlaylist().ToListAsync();
      return Json(tracks);
    }

    [HttpPost]
    [Route("api/playlist")]
    public async Task<IActionResult> UploadTrack() {
      if (Request.Form.Files.Count == 0) {
        WriteWarning("0 files where found");
        return BadRequest();
      }
      
      try
      {
        var file = Request.Form.Files[0];
        var t = new Track();
        t.Name = file.FileName;
        t.PathName = $"{Guid.NewGuid().ToString("N").Substring(0, 8)}_{file.FileName}";
        await _playListService.AddTrackAsync(file, t);
        return Json(true);
      }
      catch (Exception ex)
      {
        WriteWarning(ex.Message);
        throw;
      }
    }

    void WriteWarning(string msg) {
      _logger.LogWarning(msg);
    }
  }
}
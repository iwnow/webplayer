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
    
#region constructor with inject services
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

#endregion

    /* 
        without catch exceptions 
        application insights collect statistics
     */

    [HttpGet]
    [Route("api/playlist")]
    public async Task<object> GetPLaylist() {
      var tracks = await _playListService.GetPlaylist().ToListAsync();
      return Json(tracks);
    }

    [HttpPost]
    [Route("api/playlist")]
    public async Task<IActionResult> UploadTrack() {
      
      if (Request.Form == null ||
          Request.Form.Files == null ||
          Request.Form.Files.Count == 0) {
        //no files -> bad req
        return BadRequest();
      }
      
      //add one file (first)
      await _playListService.AddTrackAsync(Request.Form.Files[0]);
      return Json(true);
    }

    [HttpDelete]
    [Route("api/playlist")]
    public async Task<IActionResult> DeleteTrack([FromBody] long id) {
      _logger.LogWarning(id.ToString());
      await _playListService.DeleteTrackById(id);
      return Json(true);
    }
  }
}
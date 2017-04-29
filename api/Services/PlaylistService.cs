using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace api.Services
{
  using Microsoft.AspNetCore.Hosting;

  public class PlaylistService : IPlaylistService, IDisposable
  {
    readonly PlaylistDbContext _context;
    readonly IHostingEnvironment _env;
    public PlaylistService(PlaylistDbContext context, IHostingEnvironment env) {
      _context = context;
      _env = env;
    }

    async Task IPlaylistService.AddTrackAsync(IFormFile track, Track model)
    {
      model.Created = DateTime.Now;
      var t = _context.Tracks.Add(model);
      await _context.SaveChangesAsync();
      
      var path = Path.Combine(_env.WebRootPath, "audio", model.PathName);
      using (var fs = new FileStream(path, FileMode.Create)) {
        await track.CopyToAsync(fs);
      }
    }

    async Task<int> IPlaylistService.AddTracksAsync(IEnumerable<Track> tracks)
    {
      throw new NotImplementedException();
    }

    Task IPlaylistService.DeleteTrackById(long id)
    {
      throw new NotImplementedException();
    }

    void IDisposable.Dispose()
    {
      if (_context != null)
        _context.Dispose();
    }

    IQueryable<Track> IPlaylistService.GetPlaylist()
    {
      return _context.Tracks;
    }

    Task<Track> IPlaylistService.GetTrackByIdAsync(long id)
    {
      throw new NotImplementedException();
    }
  }
}
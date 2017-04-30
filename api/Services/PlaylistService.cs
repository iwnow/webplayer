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
  using Microsoft.EntityFrameworkCore;

  public class PlaylistService : IPlaylistService, IDisposable
  {
    readonly PlaylistDbContext _context;
    readonly IHostingEnvironment _env;
    public PlaylistService(PlaylistDbContext context, IHostingEnvironment env) {
      _context = context;
      _env = env;
    }

    async Task<Track> IPlaylistService.AddTrackAsync(IFormFile track)
    {
      if (track == null)
        throw new ArgumentNullException(nameof(track));

      var model = new Track {
        Name = track.FileName,
        PathName = $"{Guid.NewGuid().ToString("N").Substring(0, 10)}{track.FileName}",
        Created = DateTime.Now
      };
      
      _context.Tracks.Add(model);
      await _context.SaveChangesAsync();
      
      var path = Path.Combine(_env.WebRootPath, "audio", model.PathName);
      using (var fs = new FileStream(path, FileMode.Create)) {
        await track.CopyToAsync(fs);
      }
      return model;
    }

    async Task<int> IPlaylistService.AddTracksAsync(IEnumerable<Track> tracks)
    {
      throw new NotImplementedException();
    }

    async Task IPlaylistService.DeleteTrackById(long id)
    {
      var toDelete = await _context.Tracks.FirstOrDefaultAsync(i => i.Id == id);
      if (toDelete == null)
        return;
      var pathName = toDelete.PathName;
      _context.Tracks.Remove(toDelete);
      await _context.SaveChangesAsync();
      File.Delete(Path.Combine(_env.WebRootPath, "audio", pathName));
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
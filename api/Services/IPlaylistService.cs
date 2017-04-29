namespace api.Services
{
  using Microsoft.AspNetCore.Http;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using System.Linq;
  using Models;

  public interface IPlaylistService {
    Task<int> AddTracksAsync(IEnumerable<Track> tracks);
    Task AddTrackAsync(IFormFile track, Track model);
    Task<Track> GetTrackByIdAsync(long id);
    Task DeleteTrackById(long id);
    IQueryable<Track> GetPlaylist();
  }
}
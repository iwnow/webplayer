namespace api.Models
{
  using Microsoft.EntityFrameworkCore;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using System.Threading;

  public class PlaylistDbContext : DbContext {
    public DbSet<Track> Tracks {get;set;}

    public PlaylistDbContext(DbContextOptions<PlaylistDbContext> options) : base(options) {
      
     }

  }
}
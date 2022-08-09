using photoalbum_backend.Data;

namespace photoalbum_backend.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly ApplicationDbContext _context;

        public List<Album> GetAllAlbums()
        {
            return _context.Albums.ToList();
        }

        public Album GetAlbumById(int id)
        {
        
            return _context.Albums.FirstOrDefault(a => a.Id == id);
                  
        }

        
    }
}

using photoalbum_backend.Data;

namespace photoalbum_backend.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly ApplicationDbContext _context;

        public List<Photo> GetAllPhotos()
        {
            return _context.Photos.ToList(); 
        }

        public Photo GetPhotoById(int id)
        {
            return _context.Photos.FirstOrDefault(p => p.Id == id);
        }
    }
}

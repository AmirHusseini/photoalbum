using photoalbum_backend.Data;

namespace photoalbum_backend.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly ApplicationDbContext _context;

        public PhotoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Photo> GetAllPhotos()
        {
            return _context.Photos.ToList(); 
        }

        public Photo GetPhotoById(int id)
        {
            return _context.Photos.FirstOrDefault(p => p.Id == id);
        }

        public void PostPhoto(Photo photo)
        {
            _context.Photos.Add(photo);
            _context.SaveChanges();
        }
        public async Task DeletePhotoAsync(Photo photo)
        {
            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();
        }
    }
}

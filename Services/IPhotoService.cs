using photoalbum_backend.Data;

namespace photoalbum_backend.Services
{
    public interface IPhotoService
    {
        List<Photo> GetAllPhotos();
        Photo GetPhotoById(int id);
        
    }
}

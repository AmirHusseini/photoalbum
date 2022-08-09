using photoalbum_backend.Data;

namespace photoalbum_backend.Services
{
    public interface IAlbumService
    {
        List<Album> GetAllAlbums();
        Album GetAlbumById(int id);
    }
}

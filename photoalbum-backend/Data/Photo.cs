namespace photoalbum_backend.Data
{
    public class Photo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PhotoPath { get; set; }
        
        public int? AlbumId { get; set; }
        public virtual Album? Album { get; set; }
    }
}

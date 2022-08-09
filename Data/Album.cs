namespace photoalbum_backend.Data
{
    public class Album
    {
        public int Id { get; set; }
        public string Album_Name { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }
    }
}

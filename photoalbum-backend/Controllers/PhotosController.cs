using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using photoalbum_backend.Data;
using photoalbum_backend.Services;

namespace photoalbum_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly ApplicationDbContext _context;
        public PhotosController(IPhotoService photoService, ApplicationDbContext context)
        {
            _photoService = photoService;
            _context = context;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photo>>> Get()
        {
          if (_photoService.GetAllPhotos == null)
          {
              return NotFound();
          }
            return _photoService.GetAllPhotos();
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Photo>> Get(int id)
        {
            var foto = _photoService.GetPhotoById(id);
          if (foto == null)
          {
              return NotFound();
          }         

            return foto;
        }

        // PUT: api/Photos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            var currentPhoto = _photoService.GetPhotoById(id);
            //if ( != photo.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(photo).State = EntityState.Modified;

            try
            {
                var file = Request.Form.Files[0];
                var desc = Request.Form["description"].ToString();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    currentPhoto.Title = fileName.Split(".")[0];
                    currentPhoto.CreatedDate = DateTime.Now;
                    currentPhoto.Description = desc;
                    currentPhoto.PhotoPath = dbPath;
                    _context.SaveChanges();
                    //_photoService.UpdatePhoto(currentPhoto);
                    return CreatedAtAction("GetPhoto", new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

            return NoContent();
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Post()
        {
            try
            {
                var file = Request.Form.Files[0];
                var desc = Request.Form["description"].ToString();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');                    
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    var newphoto = new Photo() { Title = fileName.Split(".")[0], CreatedDate = DateTime.Now, Description = desc, PhotoPath = dbPath };
                    _photoService.PostPhoto(newphoto);
                    return CreatedAtAction("GetPhoto", new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_photoService.GetPhotoById(id) == null)
            {
                return NotFound();
            }
            var photo = _photoService.GetPhotoById(id);
            if (photo == null)
            {
                return NotFound();
            }

            await _photoService.DeletePhotoAsync(photo);

            return NoContent();
        }

        //private bool PhotoExists(int id)
        //{
        //    return (_context.Photos?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}

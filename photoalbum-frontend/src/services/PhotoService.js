import axios from "axios";

const PHOTO_API_BASE_URL = "https://localhost:7293/api/Photos";

class PhotoService {
    getPhotos() {
        return axios.get(PHOTO_API_BASE_URL);
    }

    getPhotoByID(id) {
        return axios.get(PHOTO_API_BASE_URL + "/" + id);
    }

    uploadPhoto(photo) {
        return axios.post(PHOTO_API_BASE_URL, photo);        
    }

    updatePhoto(id, photo) {
        return axios.put(PHOTO_API_BASE_URL + "/" + id, photo);
    }
    
    deletePhoto(id) {
        return axios.delete(PHOTO_API_BASE_URL + "/" + id);
    }
}
export default new PhotoService()
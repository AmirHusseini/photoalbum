import React, {useState, useEffect} from "react";
import PhotoService from "../services/PhotoService";
import {useNavigate} from 'react-router-dom';
import '../style/Style.css';
import Spotlight from "https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/spotlight.bundle.js";

export default function Photo (props) {
    const [PhotoList, setList] = useState([]);
    const navigate = useNavigate();

    const navigateForm = (photoId) => {
        navigate('/form', {state: {id: photoId, update:true}});
    }

    const navigateFormAdd = () => {
        navigate('/form', {state:{update:false}});
    }

    const handleDelete = (id) => {
        PhotoService.deletePhoto(id).then((res)=>{
            this.setState({photos: this.state.photos.filter(photo => photo.id !== id)});
        });
    }
    useEffect(() => {
        PhotoService.getPhotos().then((res) => {            
            setList(res.data);                
        });
        
    },[PhotoList])

    return(
        <div>
            <h1>List of Photos</h1>
            <button className="btn btn-primary" onClick={ navigateFormAdd}>Add New Photo</button>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {PhotoList.map(photo =>
                    <div className="col" key={photo.id}>
                        <div className="card h-100">                        
                            <a className="spotlight" href={photo.photoPath} data-download="true" >
                                <img src={photo.photoPath} className="card-img-top image" alt="..." />
                                
                                <div className="middle">
                                    <div className="text">{photo.title}</div>
                                    <div className="text">{photo.description}</div>
                                </div>                                        
                            </a>
                            <button className="btn btn-primary" onClick={() => navigateForm(photo.id)}>Update</button>                                
                            <button className="btn btn-danger" onClick={() => handleDelete(photo.id)}>Delete</button>                                
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    )
}

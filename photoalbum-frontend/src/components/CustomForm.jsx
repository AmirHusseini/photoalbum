import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
import PhotoService from "../services/PhotoService";
import {useNavigate} from "react-router-dom";

export default function UIForm () {
    const location = useLocation();
    const data = location.state;
    const [currentPhoto, setPhoto] = useState();
    const [urlPhoto, setUrl] = useState();
    const [show, setShow] = useState(true);
    const [description, setDesc] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        
        if(data.update === false){
            setShow(false);                
        }

        else {            
            PhotoService.getPhotoByID(data.id).then((res)=>{
                
                setPhoto(res.data);
                setUrl(res.data.photoPath);
            })                                
        }                   
    },[])
        
    const handleInputChange = (event) => { 
        setPhoto(event.target.files[0]);
        setUrl(URL.createObjectURL(event.target.files[0]));        
        setShow(true);
    };

    const handleInputDescChange = (event) => {       
        setDesc(event.target.value);   
    };

    const handleUploadImage = async (event) => {  
        if (data.update === false) {
            event.preventDefault();
            const formdata = new FormData();
            formdata.append("image", currentPhoto );    
            formdata.append("description", description);
        
            PhotoService.uploadPhoto(formdata).then(res => {
                console.log(res);
            });
            navigate('/');    
        }              
        else {
            
            event.preventDefault();
            const formdata = new FormData();
            formdata.append("image", currentPhoto );    
            formdata.append("description", description);
            
            PhotoService.updatePhoto(data.id, formdata).then(res => {
                console.log(res);
            });
            navigate('/');
        }
        
    };


    return(
        <div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <br /><br />
                    <form onSubmit={handleUploadImage}>
                        <div className="form-row">                                
                            <div className="form-group col-md-6">
                                <label className="text-black">Select Photo :</label>
                                <input type="file" className="form-control" name="selectedFile" onChange={handleInputChange} />
                                <label className="text-black">Description :</label>
                                <input type="text" className="form-control" name="description" onChange={handleInputDescChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <input type="submit" className="btn btn-dark"/>
                            </div>                                
                        </div>
                    </form>
                    <img id="img" src={urlPhoto} width={250} height={250} style={{ visibility: show ? "visible" : "hidden" }}/>
                </div>
            </div>
        </div>
    )
}
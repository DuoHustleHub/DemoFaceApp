import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [idSearch, setIdSearch] = useState('');

    const [inputImage, setInputImage] = useState('');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleIdSearchChange = (e) => {
        setIdSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('images', file);
        formData.append('id_search', idSearch);

        try {
            const response = await axios.post('https://facecheck.id/api/upload_pic', formData, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': '3r/8VtiWco0S0aehI9P07MHA4EiALtTXuVR8JuK2ab0d8uXf9n2a0xwkVuB55CFsmsepqoFrYEU=',
                    'Content-Type': 'multipart/form-data',
                    'Cookie': 'c=1; i=HJBzQ2aEc0FnhHBDZYRwQGE%3D',
                    "Access-Control-Allow-Origin" : "http://localhost:3000/"
                },
            });

            console.log('Response:', response.data);

            setInputImage(response.data.input[0].base64)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>
                Select Image:
        <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        </div>
        <div>
        <label>
            ID Search:
        <input type="text" value={idSearch} onChange={handleIdSearchChange} />
    </label>
    </div>
    <button type="submit">Upload</button>

        </form>
            <div>

                <p> you have uploaded this image: </p>
                <Image src={inputImage} alt={"no image uploaded"} width={100} height={100}/>

                <p> search in online: </p>
            </div>


        </div>
    );
};

export default UploadImage;

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import "./cliente56.scss";
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import React, { useRef } from 'react';
import Dni from "../../components/lectordni/Dni";


const New = ({ inputs, title, apiUrl }) => {

  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    adress: "",
    documentNumber: "",
    type: "",
    phone: "",
    image: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qarsntph");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzil7l5p/image/upload",
        formData
      );
      setFormData({ ...formData, image: res.data.secure_url });
      setIsButtonDisabled(true); // Deshabilitar el botón
      alert("La imagen se subió correctamente");
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://disfracesrosario.up.railway.app/clients/newClient", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'
        },
      })
      .then((response) => {
        console.log(response);
        alert("Cliente creado correctamente")
        window.location.href = '/users';
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="dni">
        <Dni></Dni>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              style={{
                width: "500px",
                height: "400px",
                borderRadius: "0" // Agrega esta línea para quitar los bordes redondeados
              }}
            />
          </div>
          
          <div className="right">
            <form onSubmit={handleSubmit}>
            
              <div className="formInput">
                <label htmlFor="image">Imagen:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className={`submitButton ${isUploading ? 'disabledButton' : ''}`}
                  onClick={handleImageUpload}
                  disabled={isButtonDisabled}
                >
                  Subir imagen
                </button>
              </div>
             
              <div className="formInput">
                <label>Nombre:</label>

                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Apellido:</label>

                <input
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="address">Dirección:</label>
                <input
                  type="text"
                  placeholder="Ingrese su dirección"
                  name="adress"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>DNI:</label>

                <input
                  type="text"
                  placeholder="Ingrese su número de documento"
                  name="documentNumber"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Tipo de cliente:</label>
                <input
                  type="text"
                  placeholder="Ingrese el tipo de cliente"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="text"
                  placeholder="Ingrese su teléfono"
                  name="phone"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submitButton">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
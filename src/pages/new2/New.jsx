import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import "./new.scss";
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

const New = ({ inputs, title, apiUrl }) => {
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
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
    setIsUploading(true); // Establece el estado de isUploading a true para bloquear el botón de subir imagen
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qarsntph"); // Reemplaza "tu_upload_preset" con el nombre de tu upload preset en Cloudinary
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzil7l5p/image/upload", // Reemplaza "tu_cloud_name" con el nombre de tu cloud name en Cloudinary
        formData
      );
      setFormData({ ...formData, image: res.data.secure_url }); // Actualiza el estado del formulario con la URL de la imagen subida
      //setIsUploading(false); // Establece el estado de isUploading a false una vez que la imagen se haya cargado
      setIsButtonDisabled(true); 
      alert("La imagen se subio correctamnte");
    } catch (err) {
      console.error(err);
      setIsUploading(false); // Establece el estado de isUploading a false en caso de error
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0])); // Actualiza la vista previa de la imagen
  };


  // Maneja el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://disfraces-production.up.railway.app/costumes/newCostume", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Disfraz creado correctamente")
        window.location.href = '/disfraces';
      })
      .catch((error) => {
        console.log(error);
        alert("Faltan campos por rellenar")
      });
  };


  // Maneja el cambio de los campos de entrada del formulario.
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
                  type="file" // Cambia el tipo de entrada a "file"
                  name="image"
                  onChange={handleFileChange} // Maneja la selección de archivos
                />
                <button
                  type="submit"
                  className={`submitButton ${isUploading ? 'disabledButton' : ''}`} // Aplica la clase `disabledButton` si `isUploading` es `true`
                  onClick={handleImageUpload}
                  disabled={isButtonDisabled} // Deshabilitar el botón si se está cargando una imagen o si ya se ha cargado una imagen
                >
                  Subir imagen
                </button>
                {/*imagePreview && (
                  <img src={imagePreview} alt="Vista previa de la imagen" /> // Muestra la vista previa de la imagen
                )*/}
              </div>
              <div className="formInput">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="colour">Color:</label>
                <input
                  type="text"
                  placeholder="Ingrese el Color"
                  name="colour"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="detail">Detalle:</label>
                <input
                  type="text"
                  placeholder="Ingrese su dirección"
                  name="detail"
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
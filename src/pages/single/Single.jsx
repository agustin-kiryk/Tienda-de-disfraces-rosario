import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List2 from '../../components/lista1/Table';
import "./single.scss";
import Table from "../table/Table";


const Single = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    name: '',
    lastName: '',
    phone: '',
    adress: '',
    type: '',
    documentNumber: '',
    joinDate: '',
    costumeRented: '',
    pickupDate: '',
    returnDate: '',
    clientStatus: '',
    image: ''
  });
  const url = window.location.href;
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://disfracesrosario.up.railway.app/clients/${id}`);
      const data = await response.json();
      setDetails(data);
    }
    fetchData();
  }, [id]);

  const handleEditClick = () => setIsEditing(!isEditing);

  const [editedDetails, setEditedDetails] = useState({
    name: '',
    lastName: '',
    phone: '',
    adress: '',
    type: '',
    documentNumber: ''
  });

  const handleInputChange = (event) => {
    const { name, value, documentNumber,lastName,phone ,adress,type, image} = event.target;
    setEditedDetails({ ...editedDetails, [name]: value, [documentNumber]: value,[lastName]: value,[phone]: value,[type]: value,[adress]: value,[image]: value});
  }

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`https://disfracesrosario.up.railway.app/clients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDetails),
      });
      const data = await response.json();
      setDetails(editedDetails);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className='datos'>
            <div className="editButton" onClick={handleEditClick}>
              {isEditing ? 'Terminar' : 'Editar'}
            </div>
            {isEditing && (
              <div className="editButtons">
                <div className="saveButton" onClick={handleSaveClick}>Guardar</div>
              </div>
            )}
            <h1 className="title1">Informacion</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Cliente</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="id" value={details.id} onChange={handleInputChange} />
                    ) : (
                      details.id
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="name" value={editedDetails.name || details.name} onChange={handleInputChange} />
                    ) : (
                      details.name
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Apellido:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="lastName" value={editedDetails.lastName || details.lastName} onChange={handleInputChange} />
                    ) : (
                      details.lastName
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefono:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="phone" value={editedDetails.phone || details.phone}  onChange={handleInputChange} />
                    ) : (
                      details.phone
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estatus:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="clientStatus" value={editedDetails.clientStatus || details.clientStatus} onChange={handleInputChange} />
                    ) : (
                      details.clientStatus
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Direccion:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="adress" value={editedDetails.adress || details.adress} onChange={handleInputChange} />
                    ) : (
                      details.adress
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Documento:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="documentNumber" value={editedDetails.documentNumber || details.documentNumber} onChange={handleInputChange} />
                    ) : (
                      details.documentNumber
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tipo de Cliente:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="type" value={editedDetails.type || details.type} onChange={handleInputChange} />
                    ) : (
                      details.type
                    )}
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dni">
            <img src={details.image} alt="" width="650px" height="500px" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Historial de Alquileres</h1>
        </div>
        <div className="tabla">
          <Table></Table>
        </div>
      </div>
    </div>
  );
};

export default Single;
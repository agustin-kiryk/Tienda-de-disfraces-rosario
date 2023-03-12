import "./single.scss";
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List2 from '../../components/lista1/Table';

const Single = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    phone: '+1 2345 67 89',
    address: 'Elton St. 234 Garden Yd. NewYork',
    document: 'USA',
    joinDate: '01/01/2021',
    costumeRented: 'Pirate',
    pickupDate: '01/02/2021',
    returnDate: '01/05/2021',
    status: 'Returned'
  });
  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  }

  const handleSaveClick = () => {
    // Send details to server
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
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
                <h1 className="itemTitle">Facturacion 20/5/05</h1>
                <div className="detailItem">

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

                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                      {isEditing ? (
                        <input type="text" name="email" value={details.email} onChange={handleInputChange} />
                      ) : (
                        details.email
                      )}
                    </span>
                </div>
                <div className="detailItem">
            <span className="itemKey">Telefono:</span>
            <span className="itemValue">
              {isEditing ? (
                <input type="text" name="phone" value={details.phone} onChange={handleInputChange} />
              ) : (
                details.phone
              )}
            </span>
          </div>

          <div className="detailItem">
            <span className="itemKey">Direccion:</span>
            <span className="itemValue">
              {isEditing ? (
                <input type="text" name="adress" value={details.adress} onChange={handleInputChange} />
              ) : (
                details.adress
              )}
            </span>
          </div>

  
                <div className="detailItem">
                  <span className="itemKey">N° Documento:</span>
                  <span className="itemValue">
              {isEditing ? (
                <input type="text" name="dni" value={details.dni} onChange={handleInputChange} />
              ) : (
                details.dni
              )}
            </span>

                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de Alta:</span>
                  <span className="itemValue">
              {isEditing ? (
                <input type="text" name="alta" value={details.alta} onChange={handleInputChange} />
              ) : (
                details.alta
              )}
            </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Disfraz Alquilado:</span>
                  <span className="itemValue">
              {isEditing ? (
                <input type="text" name="disalq" value={details.disalq} onChange={handleInputChange} />
              ) : (
                details.disalq
              )}
            </span>

                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de Retiro:</span>
                  <span className="itemValue">
              {isEditing ? (
                <input type="text" name="retiro" value={details.retiro} onChange={handleInputChange} />
              ) : (
                details.retiro
              )}
            </span>
                </div>
    
                <div className="detailItem">
                  <span className="itemKey">Fecha de Entrega:</span>
                  <span className="itemValue">
              {isEditing ? (
                <input type="text" name="entrega" value={details.entrega} onChange={handleInputChange} />
              ) : (
                details.entrega
              )}
            </span>
                </div>
                <div className="detailItem">
            <span className="itemKey">Estatus:</span>
            <span className="itemValue">
              {isEditing ? (
                <input type="text" name="status" value={details.status} onChange={handleInputChange} />
              ) : (
                details.status
              )}
            </span>
          </div>
              </div>
            </div>
          </div>
          <div className="dni">
            <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2AYDKWFWUBG7VNZ24CJVPHHOWI.jpg" alt="" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Historial de Alquileres</h1>
        </div>
        <List2></List2>
      </div>
    </div>
  );
};

export default Single;
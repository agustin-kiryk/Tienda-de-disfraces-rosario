import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List2 from '../lista/ListaDis';
import "./single.scss";

const Single2 = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    name: '',
    colour: '',
    detail: '',
    creationDay: '',
    lastClientRented: '',
    image: '',
    status: '',
    lastClientRented: ''
  });

  const url = window.location.href;
  const id = url.split("/").pop();// Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      console.log(id)
      const response = await fetch(`https://disfracesrosario.up.railway.app/transactions/${id}`);
      const data = await response.json();
      setDetails(data);
    }
    fetchData();
  }, [id]);

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
                <h1 className="itemTitle">Transaccion</h1>
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
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="clientName" value={details.clientName} onChange={handleInputChange} />
                    ) : (
                      details.clientName
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tipo:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="type" value={details.type} onChange={handleInputChange} />
                    ) : (
                      details.type
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Disfraz:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="names" value={details.names} onChange={handleInputChange} />
                    ) : (
                      details.names
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CheckIn:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="checkIn" value={details.checkIn} onChange={handleInputChange} />
                    ) : (
                      details.checkIn
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pago parcial:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="partialPayment" value={details.partialPayment} onChange={handleInputChange} />
                    ) : (
                      details.partialPayment == null ? "No realizo un pago parcial" : details.partialPayment
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pago Pendiente:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="pending" value={details.pending} onChange={handleInputChange} />
                    ) : (
                      details.pending == null ? "No debe dinero" : details.pending
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de retrio:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="reservationDate" value={details.reservationDate} onChange={handleInputChange} />
                    ) : (
                      details.reservationDate
                    )}
                  </span>
                </div>  <div className="detailItem">
                  <span className="itemKey">Fecha de devolucion:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="deadline" value={details.deadline} onChange={handleInputChange} />
                    ) : (
                      details.deadline
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single2;
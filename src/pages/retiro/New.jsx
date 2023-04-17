import "./new2.scss";
import * as React from 'react';
import { userColumns, userRows } from "../../datatablesource2";
import { useState, useEffect } from "react";
import Single7 from "../single7/Single";
import Button from '@mui/joy/Button';
import BasicGrid from "../../pages/single7/Single";
import Check from "../check/Check";
import { Input } from '@mui/joy';

const Datatable = ({ singleId,onTransactionIdChange,onIdChange }) => {
  const [selectedDni, setSelectedDni] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [costumeIds, setCostumeIds] = useState([]);
  const [checkIn, setCheckIn] = useState([]);
  const [id, setId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState(null);

  const handleCostumeIdChange = (id) => {
    setCostumeIds(id);
  }

  const handleTransactionIdChange = (id) => {
    console.log("transactionId:", id); // Agrega este console.log
    setTransactionId(id); // Establecer el valor de transactionId con el valor recibido
  };
  
  const handleCheckInChange = (name, checked) => {
    if (checked) {
      setCheckIn([...checkIn, name]);
    } else {
      setCheckIn(checkIn.filter((item) => item !== name));
    }
  };

  const onCostumeSelect = (id) => {
    setCostumeIds((prevIds) => [...prevIds, id]);
  };

  const handleAccept = () => {
    const data = {
      costumeIds,
      transactionId, // Verifica que transactionId se esté incluyendo en el objeto data
      checkIn: checkIn.join(',')
    };
    // Realizar la petición PUT a la URL especificada con los datos obtenidos
    fetch(`https://disfraces-production.up.railway.app/costumes/return`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al realizar la petición PUT');
      }
      return response.json();
    })
    .then(data => {
      // Realizar las acciones necesarias con la respuesta del servidor
    })
    .catch(error => {
      setError(error.message);
    });
  };

  const handleImageUrlChange = (url, clientIdValue) => {
    setImageUrl(url);
    setClientId(clientIdValue);
  };

  const handleSelect = (ids) => {
    onCostumeSelect(ids);
  };

  const handleSelectionChange = (selection) => {
    const selectedIds = selection.map((selectedRow) => selectedRow.id);
    handleSelect(selectedIds);
  };

  const handleIdChange = (id) => {
    setClientId(id);
    handleTransactionIdChange(id); // Llama a handleTransactionIdChange con la ID obtenida
  };

  const handleCostumeSelect = (id) => {
    setCostumeIds([id]); // Actualizar el valor de costumeIds con la id seleccionada
  };
  const handleTransactionIdInputChange = (e) => {
    const id = e.target.value;
    setTransactionId(id); // Actualiza el estado con el valor del campo de texto
    onTransactionIdChange(id); // Llama a onTransactionIdChange con la ID ingresada
    onIdChange(id); // Llama a onIdChange con la ID ingresada
  };


  return (
    <div className="datatable">
        {error && <p>{error}</p>}
      <button>
        <a href="/">Volver</a>
      </button>
      <div className="info-cliente">
      <BasicGrid onImageUrlChange={setImageUrl} onIdChange={handleCostumeIdChange} onTransactionIdChange={handleTransactionIdChange} />
      <Input
        type="text"
        value={transactionId}
        onChange={(e) => handleTransactionIdInputChange(e)}
        placeholder="Ingresa la ID de transacción"
        sx={{ width: "250px" }} 
        color="info"
      />
    </div>
      <div className="id">
      </div>
  
      <div className="check">
        <div className="check">
          <Check name="Retiro" onCheckInChange={handleCheckInChange} />
          <Check name="Entrego" onCheckInChange={handleCheckInChange} />
        </div>
      </div>

      <div className="final">
        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  );
};

export default Datatable;
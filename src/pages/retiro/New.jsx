import "./new2.scss";
import * as React from 'react';
import { userColumns, userRows } from "../../datatablesource2";
import { useState, useEffect } from "react";
import Single7 from "../single7/Single";
import Button from '@mui/joy/Button';
import BasicGrid from "../../pages/single7/Single";
import Check from "../check/Check";
import { Input } from '@mui/joy';
import Tabla from "../Clientes/Datatable";
import { Checkbox, FormControlLabel } from '@mui/material';

const Datatable = ({ singleId, onTransactionIdChange, onIdChange, onTransactionIdImport }) => {
  const [selectedDni, setSelectedDni] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [clientDocument, setClientDocument] = useState('');
  const [costumesIds, setCostumesIds] = useState([]);
  const [devolution, setDevolution] = useState([]);
  const [id, setId] = useState('');
  const [dni, setDni] = useState(''); // nuevo estado para el campo DNI
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isMoneyOwed, setIsMoneyOwed] = useState(false);
  const isEntregado = devolution === "Entrego";
  const isPaid = isPaymentComplete;
  const isOwedMoney = isMoneyOwed;


  const handleIdChange = (id) => {
    setClientDocument(id);
  };


  const handleTransactionIdInputChange = (e) => {
    const id = e.target.value;
    setTransactionId(id);
    onTransactionIdChange(id);
  };

  const handleDocumentNumberChange = (value) => {
    setClientDocument(value);
  };

  const handleTransactionIdImport = (transactionId) => {
    setTransactionId(transactionId);
  };

  const handleCostumeIdChange = (id) => {
    setCostumesIds(id);
  }

  const handleTransactionIdChange = (id) => {
    console.log("transactionId:", id);
    setTransactionId(id);
  };

  const handleDevolutionChange = (name, checked, value) => {
    if (checked) {
      setDevolution(value);
    } else {
      setDevolution([]);
    }
  };

  const handlePaymentCompleteChange = (event) => {
    setIsPaymentComplete(event.target.checked);
  };

  const handleMoneyOwedChange = (event) => {
    setIsMoneyOwed(event.target.checked);
  };


  const onCostumeSelect = (id) => {
    setCostumesIds((prevIds) => [...prevIds, id]);
  };

  const handleAccept = () => {
    const data = {
      clientDocument: clientDocument,
      costumesIds,
      transactionId, // Verifica que transactionId se esté incluyendo en el objeto data
      devolution,
      totalPayment: isPaid ? true : isOwedMoney ? false : null,
    };
    // Realizar la petición PUT a la URL especificada con los datos obtenidos
    fetch(`https://disfracesrosario.up.railway.app/costumes/return`, {
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

  const handleImageUrlChange = (url, clientDocumentValue) => {
    setImageUrl(url);
    setClientDocument(clientDocumentValue);
  };

  const handleSelect = (ids) => {
    onCostumeSelect(ids);
  };

  const handleSelectionChange = (selection) => {
    const selectedIds = selection.map((selectedRow) => selectedRow.id);
    handleSelect(selectedIds);
  };




  const handleCostumeSelect = (id) => {
    setCostumesIds([id]); // Actualizar el valor de costumeIds con la id seleccionada
  };

  



  return (
    <div className="datatable">
      {error && <p>{error}</p>}
      <button>
        <a href="/">Volver</a>
      </button>
      <Tabla></Tabla>
      <div className="info-cliente">
        <BasicGrid
          onImageUrlChange={setImageUrl}
          onIdChange={handleCostumeIdChange}
          onTransactionIdChange={handleTransactionIdChange}
          onTransactionIdImport={onTransactionIdImport}
          onDocumentNumberChange={handleDocumentNumberChange}
        />
        <Input
          type="text"
          value={transactionId}
          onChange={(e) => handleTransactionIdInputChange(e)}
          placeholder="Ingresa la ID de transacción"
          sx={{ width: "250px" }}
          color="info"
        />
        <Input
          type="text"
          value={clientDocument}
          onChange={(e) => handleIdChange(e.target.value)}
          placeholder="Ingrese el DNI del cliente"
          color="info"
        />
      </div>
      <div className="id">
      </div>

      <div className="check">
        <FormControlLabel
          control={<Checkbox checked={isPaymentComplete} onChange={handlePaymentCompleteChange} />}
          label="Pago Completo"
        />
        <FormControlLabel
          control={<Checkbox checked={isMoneyOwed} onChange={handleMoneyOwedChange} />}
          label="Adeuda Dinero"
        />
        <Check name="Devolucion" value={true} onCheckInChange={(checked) => handleDevolutionChange("Entrego", checked, true)} />
      </div>

      <Button onClick={handleAccept}>Aceptar</Button>
    </div>
  );

};

export default Datatable;
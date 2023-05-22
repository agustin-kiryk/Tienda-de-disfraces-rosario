import "./new1.scss";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource8";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from '@mui/joy';
import Single6 from "../single6/Single";
import Button from '@mui/joy/Button';
import Calendario from "../calendario/Calendario";
import BasicGrid from "../single6/Single";
import Productos from "../productos/Disfraces";
import axios from 'axios';
import Check from "../check/Check";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker, Space } from 'antd';
import { FormControlLabel, Checkbox } from '@material-ui/core';



const Datatable = ({ singleId }) => {
  const [selectedDni, setSelectedDni] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [costumeIds, setCostumeIds] = useState([]);
  const [checkIn, setCheckIn] = useState([]);
  const [id, setId] = useState('');
  const [partialPayment, setPartialPayment] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newConstant, setNewConstant] = useState(0);
  const [isInvoiceChecked, setIsInvoiceChecked] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleInvoiceChange = (event) => {
    setIsInvoiceChecked(event.target.checked);
  };

  


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/user" style={{ textDecoration: "none" }}>
              <div className="viewButton">Detalles</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];

  const handleCheckInChange = (name, checked) => {
    if (checked) {
      setCheckIn([...checkIn, name]);
    } else {
      setCheckIn(checkIn.filter((item) => item !== name));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partialPayment", e.target.elements.partialPayment.value);
    // enviar formData al servidor
  };

  const [error, setError] = useState(null);

  const onCostumeSelect = (id) => {
    // Verificar si la ID ya está seleccionada
    if (!selectedCostumeIds.includes(id)) {
      // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
      const updatedIds = [...selectedCostumeIds, id];
      setSelectedCostumeIds(updatedIds);

      // Establecer el valor del estado costumeIds como un array de cadenas de texto
      const idsString = updatedIds.join(',');
      setCostumeIds(idsString);

      // Mostrar las IDs que se van sumando en la consola
      console.log(`IDs seleccionadas: ${idsString}`);
    }
  };

  const handleAccept = () => {
    const selectedRowsData = selectedRows.map((rowId) =>
      data.find((row) => row.id === rowId)
    );
    const selectedIds = selectedRowsData.map((row) => row.id);
    const partialPaymentAmount = partialPayment ? Number(partialPayment) : 0;

    const data = {
      amount,
      type,
      clientId,
      costumeIds: costumeIds,
      reservationDate,
      deadline,
      checkIn: checkIn.join(','),
      partialPayment,
    };

    setPartialPaymentAmount(amount - partialPaymentAmount);

    axios
      .post('https://disfracesrosario.up.railway.app/transactions/newTransaction', data)
      .then(response => {
        console.log(response.data);
        setCheckIn([]);
        alert("Alquiler realizado correctamente")
        window.location.href = '/';
      })
      .catch(error => {
        alert(error.response.data.details);
        setError(error.response.data.details);
      });
  };



  const handleImageUrlChange = (url, clientIdValue) => {
    setImageUrl(url);
    setClientId(clientIdValue);
  };


  const handleSelect = (id) => {
    // Verificar si la ID ya está seleccionada
    if (!selectedCostumeIds.includes(id)) {
      // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
      const updatedIds = [...selectedCostumeIds, id];
      setSelectedCostumeIds(updatedIds);
      setCostumeIds((prevIds) => [...prevIds, id]); // Agregar la ID del disfraz seleccionado a la matriz costumeIds

      // Mostrar las IDs que se van sumando en la consola
      console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
    }
  };

  const handleSelectionChange = (selection) => {
    const selectedIds = selection.map((selectedRow) => selectedRow.id);
    handleSelect(selectedIds);
  };


  const handleIdChange = (id) => {
    setClientId(id);
  };
  const handleCostumeSelect = (id) => {
    setCostumeIds([id]); // Actualizar el valor de costumeIds
  };



  return (
    <div className="datatable">
      {error && <p>{error}</p>}
      <button>
        <a href="/">Volver a la pantalla</a>
      </button>
      <div className="info-cliente">
        <BasicGrid onImageUrlChange={handleImageUrlChange} onIdChange={handleIdChange} />
      </div>
      <div className="id">
      </div>
      <div className="tabla">
        <Productos onCostumeSelect={handleCostumeSelect} />
        <Input
          color="info"
          placeholder="IDs de disfraces (separados por comas)"
          variant="outlined"
          value={costumeIds}
          onChange={(event) => {
            const ids = event.target.value.split(',').map((id) => id.trim());
            setCostumeIds(ids.join(',')); // Actualizar el estado costumeIds
          }}
        />

      </div>
      <div className="info">
      </div>
      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TextField
          color="info"
          select
          label="Tipo"
          variant="outlined"
          value={type}
          onChange={handleTypeChange}
          style={{ minWidth: "100px" }}
        >
          <MenuItem value="mercado_pago">Mercado Pago</MenuItem>
          <MenuItem value="efectivo">Efectivo</MenuItem>
          <MenuItem value="tarjeta">Tarjeta</MenuItem>
          <MenuItem value="factura electronica">Factura electronica (Marcar Casillero)</MenuItem>
        </TextField>
      </div>

      <div className="check">
        <div className="check">
          <div className="invoice">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isInvoiceChecked}
                  onChange={handleInvoiceChange}
                  name="invoice"
                  color="primary"
                />
              }
              label="Facturación Electrónica"
            />
            {isInvoiceChecked && <Button variant="outlined"  color="info"><a  target="_blank" href="https://auth.afip.gob.ar/contribuyente_/login.xhtml?action=SYSTEM&system=rcel">Generar Factura</a></Button>}
          </div>
          <Check name="Banco" onCheckInChange={handleCheckInChange} />
          <Check name="Remito" onCheckInChange={handleCheckInChange} />
        </div>
      </div>

      <div className="final">
        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  );
};

export default Datatable;
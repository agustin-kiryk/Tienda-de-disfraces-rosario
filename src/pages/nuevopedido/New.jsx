import "./new1.scss";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from '@mui/joy';
import Single6 from "../single6/Single";
import Button from '@mui/joy/Button';
import Calendario from "../calendario/Calendario";
import BasicGrid from "../../pages/single6/Single";
import Disfraces from "../disfraces2/Disfraces";
import axios from 'axios';
import Check from "../check/Check";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker, Space } from 'antd';




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

  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);

  const handleTypeChange = (event) => {
    setType(event.target.value);
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

    // Obtener las filas seleccionadas del estado
    const selectedRowsData = selectedRows.map((rowId) =>
      data.find((row) => row.id === rowId)
    );

    // Obtener las IDs seleccionadas de las filas
    const selectedIds = selectedRowsData.map((row) => row.id);

    const partialPaymentAmount = partialPayment ? Number(partialPayment) : 0;

    // Realizar la petición POST con las IDs seleccionadas
    const data = {
      amount,
      type,
      clientId,
      costumeIds: costumeIds,
      reservationDate,
      deadline,
      checkIn: checkIn.join(','), // Convertir el array a un string separado por comas
      partialPayment, // Agregar el campo partialPayment con el valor true
    };

    setPartialPaymentAmount(amount - partialPaymentAmount);
    axios.post('https://disfracesrosario.up.railway.app/transactions/newTransaction', data)
      .then(response => {
        console.log(response.data);
        // Aquí puedes hacer algo con la respuesta, como redirigir a otra página
        // Resetear el estado checkIn después de realizar la petición POST
        setCheckIn([]);
        setSelectedRows([]); // Limpiar las filas seleccionadas
        alert("Alquiler realizada correctamente")
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
        alert("Faltan campos por rellenar")
        // Aquí puedes manejar el error de alguna manera
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
        <a href="/">Volver</a>
      </button>
      <div className="info-cliente">
        <BasicGrid onImageUrlChange={handleImageUrlChange} onIdChange={handleIdChange} />
      </div>
      <div className="id">
      </div>
      <div className="tabla">
        <Disfraces onCostumeSelect={handleCostumeSelect} />
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
        <div className="calendario">
          <Calendario
            reservationDate={reservationDate}
            setReservationDate={setReservationDate}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        </div>
      </div>
      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <Input
          color="info"
          variant="soft"
          placeholder="Monto de pago parcial"
          value={partialPayment}
          onChange={(e) => setPartialPayment(e.target.value)}
          type="number"
        />
        <TextField
          label="Monto a pagar"
          value={amount - partialPayment}
          InputProps={{
            readOnly: true,
          }}
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
          <MenuItem value="factura electronica">factura electronica</MenuItem>
        </TextField>
      </div>

      <div className="check">
        <div className="check">
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
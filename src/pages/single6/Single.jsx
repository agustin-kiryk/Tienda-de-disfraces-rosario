import "./single.scss";
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Input } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "black",
  backgroundColor: "#e7e7e7"
}));

export default function BasicGrid({ onImageUrlChange, onIdChange }) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [clientData, setClientData] = useState(null);
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleDniChange = (event) => {
    setDocumentNumber(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://disfracesrosario.up.railway.app/clients/document/${documentNumber}`);
      setClientData(response.data);

      const imageUrl = response.data.imageUrl;
      if (imageUrl) {
        setImageUrl(imageUrl);
        // Llama a la prop onImageUrlChange para actualizar el estado del padre con la URL de la imagen
        if (onImageUrlChange) {
          onImageUrlChange(imageUrl);
        }
      }

      // Establece el ID del cliente
      setId(response.data.id);
      if (onIdChange) {
        onIdChange(response.data.id);
      }

    } catch (error) {
      console.error(error);
      alert("El Dni no existe")
    }
  };

  return (
    <div className='tabla'>
      <div className="bar">
      <Input
        color="info"
        type="text"
        placeholder="Escribir DNI "
        onChange={handleDniChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        sx={{ width: "200px" }} // Ajustar el ancho del input con sx
      />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </div>

      <div className="datos2">      
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={1}>
          <Item>Id: {clientData ? clientData.id : ''}</Item>
        </Grid>
        <Grid xs={2}>
          <Item>Nombre: {clientData ? clientData.name : ''}</Item>
        </Grid>
        <Grid xs={2}>
          <Item>Apellido: {clientData ? clientData.lastName : ''}</Item>
        </Grid>
        <Grid xs={2}>
          <Item>Tipo: {clientData ? clientData.type : ''}</Item>
        </Grid>
    
      </Grid></div>

          {clientData?.image && (
          <img style={{ maxWidth: '600px', maxHeight: '400px', paddingLeft: '35%', paddingTop: '2%' }} src={clientData?.image} alt="" />
        )}
      {imageUrl && (
        <div className="image">
          <img src={clientData.image} alt="Client image" style={{ maxWidth: '600px', maxHeight: '400px' }} />
        </div>
      )}

      <div className="bar1">
        <Input
          type="text"
          placeholder="ID del cliente"
          value={id}
          onChange={handleIdChange}
        />
      </div>
    </div>

  );
}
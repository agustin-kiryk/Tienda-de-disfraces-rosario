import "./single.scss";
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Input } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "black",
  backgroundColor: "#e7e7e7"
}));

export default function BasicGrid({ onImageUrlChange, onIdChange, onTransactionIdChange }) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [clientData, setClientData] = useState(null);
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  // Función para manejar el cambio del ID del cliente
  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://disfraces-production.up.railway.app/clients/${id}/history`);
      setClientData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // Función para manejar la selección de un disfraz
  const handleSelectCostume = (costume) => {
    onImageUrlChange(costume.image);
    onIdChange(costume.costumeIds);
    alert("Disfraz seleccionado");
    console.log("Datos de la transacción:", costume);
  }

  return (
    <div className='tabla'>
      <div className="datos2">
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={2}>
            <Item>Nombre: {clientData ? clientData.name : ''}</Item>
          </Grid>
          <Grid xs={2}>
            <Item>Apellido: {clientData ? clientData.lastName : ''}</Item>
          </Grid>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={4}>
              <Input
                type="text"
                placeholder="ID del cliente"
                value={id}
                onChange={handleIdChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={handleSearch}>Buscar</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="bar1">
      </div>
      {clientData && clientData.transactions &&
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID de la transaccion</TableCell>
                <TableCell>Nombre del Disfraz</TableCell>
                <TableCell>Fecha de Reserva</TableCell>
                <TableCell>Fecha de Entrega</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Seleccionar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientData && clientData.transactions && clientData.transactions.map((costume) => (
                 <TableRow key={costume.id} style={{ minWidth: '500px' }}>
                 <TableCell style={{ minWidth: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.id}</TableCell>
                 <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.names}</TableCell>
                 <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.reservationDate}</TableCell>
                 <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.deadline}</TableCell>
                 <TableCell>
                    {costume.image && (
                      <img src={costume.image} alt="Disfraz" height="100" width="100" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSelectCostume(costume)}>
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    
    </div>
  );

}  
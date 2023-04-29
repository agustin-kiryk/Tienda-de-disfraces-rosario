import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";


export const userColumns = [
  {
    field: "id",
    headerName: "Id",
    width: 20,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 290,
    renderCell: (params) => {
      return (
        <div>
          {params.row.clientLastName + ' ' + params.row.clientName}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Monto",
    width: 230,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 230,
  },
  {
    field: "checkIn",
    headerName: "CheckIn",
    width: 200,
    renderCell: (params) => {
    },
  },
  {
    field: "reservationDate",
    headerName: "Fecha de entrega",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {new Date(params.row.checkIn).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    field: "reservationDate",
    headerName: "Fecha de Reserva",
    width: 230,
    renderCell: (params) => {
      return (
        <div>
          {new Date(params.row.reservationDate).toLocaleDateString()}
        </div>
      );
    },
  },

];

export function UserTable() {
  const [userRows, setUserRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const rows = await userRows();
      setUserRows(rows);
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filtrar los disfraces en función de la búsqueda
  const filteredData = userRows.filter((row) => {
    const costumeName = row.name.toLowerCase();
    return costumeName.includes(searchValue.toLowerCase());
  });

  return (
    <div>
      <h1>Tabla de usuarios</h1>
      <TextField
        label="Buscar disfraces"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
        fullWidth
      />
      <DataGrid rows={filteredData} columns={userColumns} />
    </div>
  );
}

export async function userRows() {
  try {
    const response = await axios.get(
      "https://disfracesrosario.up.railway.app/transactions"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Estilos CSS
const styles = {
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

export default UserTable;

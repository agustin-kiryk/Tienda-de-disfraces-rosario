import "./data.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";


export const userColumns = [
  {
    field: "name",
    headerName: "Nombre",

    cellClassName: "name-cell",
    renderCell: (params) => {
      return (
        <div className="image-container">
          <img className="user-image" alt="" src={params.row.image} />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "detail",
    headerName: "Detalle",
    width: 230,
  },
  {
    field: "clientRented",
    headerName: "Cliente",
    width: 230,
  },
  {
    field: "reservationDate",
    headerName: "Fecha de Reserva",
    width: 230,
  },
  {
    field: "deadlineDate",
    headerName: "Fecha de Entrega",
    width: 200,
  },
  {
    field: "costumeStatus",
    headerName: "Estatus",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.costumeStatus}`}>
          {params.row.costumeStatus}
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
      "https://disfraces-production.up.railway.app/costumes"
    );
    console.log(response.data);
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

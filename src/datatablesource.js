import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const userColumns = [
  //Cambiar ancho tablas
  {
    field: "name",
    headerName: "Nombre",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="">
          <img className="" alt="" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "lastName",
    headerName: "Apellido",
    width: 200,
  },

  {
    field: "rentedCustome",
    headerName: "Disfraz Alquilado",
    width: 200,
  },
  {
    field: "fecahentrega",
    headerName: "Fecha de Entrega",
    width: 100,
  },
  {
    field: "type",
    headerName: "Tipo De Cliente",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Telefono",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export function UserTable() {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://disfraces-production.up.railway.app/clients")
      .then((response) => setUserRows(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Tabla de usuarios</h1>
      <DataGrid rows={userRows} columns={userColumns} />
    </div>
  );
}

export async function userRows() {
  try {
    const response = await axios.get('https://disfraces-production.up.railway.app/clients');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default UserTable;

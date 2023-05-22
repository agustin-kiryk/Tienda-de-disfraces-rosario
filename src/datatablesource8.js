import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const userColumns = [
  //Cambiar ancho tablas
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 190,
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
    field: "productDescription",
    headerName: "Descripcion",
    width: 200,
  },

  {
    field: "price",
    headerName: "Precio",
    width: 200,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 140,
  },
];

export function UserTable() {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://disfracesrosario.up.railway.app/products")
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
    const response = await axios.get('https://disfracesrosario.up.railway.app/products');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default UserTable;

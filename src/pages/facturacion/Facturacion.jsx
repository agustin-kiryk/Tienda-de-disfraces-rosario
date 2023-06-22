import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource4";
import UserTable, { userRows } from "../../datatablesource4";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Widget from "../../components/widget2/Widget2";
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      axios
        .delete(`https://disfracesrosario.up.railway.app/transactions/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const { id } = useParams(); // Obtener la ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/single8/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
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

  // Filtrar los datos en función del término de búsqueda
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="datatable">
    <Button variant="outlined">
      <a href="/">Volver</a>
      </Button>
      <div className="datatableTitle">
        <h1>Historial de Facturacion del mes</h1>
      </div>
      <div>
        <Widget></Widget>
      </div>
      <div className="searchBarWrapper">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={filteredData}
          columns={userColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          rowHeight={140}
          autoHeight
        />
      </div>
    </div>
  );
};

export default Datatable;

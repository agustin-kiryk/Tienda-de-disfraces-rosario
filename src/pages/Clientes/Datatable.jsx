import "./datatable.scss";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource7";
import UserTable, { userRows } from "../../datatablesource7";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [{ columnField: "id", operatorValue: "contains", value: "" }]
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id);
      setData(rows);
    };
    fetchData();
  }, [id]);

  const handleFilterChange = (model) => {
    setFilterModel(model);
  };

  // Definir el componente GridToolbarContainer que incluirá la barra de búsqueda
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div>Buscar por ID:</div>
          <input
            value={filterModel.items[0].value}
            onChange={(e) =>
              setFilterModel({
                items: [
                  { ...filterModel.items[0], value: e.target.value },
                ],
              })
            }
          />
        </div>
      </GridToolbarContainer>
    );
  };

  return (
    <div className="datatable">
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat()}
          pageSize={8}
          hideFooterPagination={true}
          rowsPerPageOptions={[8]}
          checkboxSelection
          autoHeight
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
          components={{
            Toolbar: CustomToolbar, // Agregar el componente CustomToolbar como Toolbar del DataGrid
          }}
        />
      </div>
    </div>
  );
};

export default Datatable;

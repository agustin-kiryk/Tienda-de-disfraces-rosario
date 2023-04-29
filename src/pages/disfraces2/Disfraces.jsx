import React, { useState, useEffect } from "react";
import "./disfraces.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource2";
import UserTable, { userRows } from "../../disfra/datatablesource2";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Datatable2 = ({ onCostumeSelect, selectedCostume }) => { // Paso el estado del input como una prop llamada "selectedCostume"
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);

  const handleSelect = (id, name) => { // Incluyo el nombre del disfraz en la función handleSelect
    // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
    const updatedIds = [...selectedCostumeIds, id];
    setSelectedCostumeIds(updatedIds);
    onCostumeSelect(id, name); // Llamo la función onCostumeSelect con la ID y el nombre del disfraz seleccionado

    // Mostrar las IDs que se van sumando en la consola
    console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleSelectButtonClick = (params) => {
    // Obtener la ID del disfraz seleccionado en la fila de la tabla
    const costumeId = params.getValue(params.id, "id");
    const costumeName = params.getValue(params.id, "name"); // Obtener el nombre del disfraz seleccionado
    if (costumeId) {
      handleSelect(costumeId, costumeName); // Llamar la función handleSelect con la ID y el nombre del disfraz seleccionado
    }
  };

  const { id } = useParams(); // Obtener la ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);

  const CustomSelectButton = (params) => {
    return (
      <button
        className="selectButton"
        onClick={() => handleSelectButtonClick(params)}
      >
        Seleccionar
      </button>
    );
  };
  const handleCostumeSelect = (id) => {
    // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
    const updatedIds = [...selectedCostumeIds, id];
    setSelectedCostumeIds(updatedIds);
  };

return (
  <div className="datatable">
    <div className="tableWrapper">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={[
          ...userColumns,
          {
            field: "selectButton",
            headerName: "Seleccionar",
            width: 120,
            renderCell: CustomSelectButton,
          },
        ]}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        autoHeight
        rowHeight={130}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel);
        }}
      />
    </div>
    <div className="selectedCostumes">
      <h2>Disfraces seleccionados:</h2>
      {selectedCostumeIds.length > 0 ? (
        <ul>
          {selectedCostumeIds.map((id) => (
            <li key={id}>{`Disfraz ${id}`}</li>
          ))}
        </ul>
      ) : (
        <p>No se ha seleccionado ningún disfraz</p>
      )}
      {selectedCostumeIds.length > 0 ? (
        <input
          type="text"
          className="selectedCostumesInput"
          value={`Disfraces seleccionados: ${selectedCostumeIds.join(", ")}`}
          readOnly
        />
      ) : (
        <input
          type="text"
          className="selectedCostumesInput"
          value="No se ha seleccionado ningún disfraz"
          readOnly
        />
      )}
    </div>
  </div>
);
};

export default Datatable2;

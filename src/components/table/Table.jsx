import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const List = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [hasShownDeadlineAlert, setHasShownDeadlineAlert] = useState(false);
  const [hasShownTwoDayAlert, setHasShownTwoDayAlert] = useState(false);

  function handleSearchTextChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }


  function checkDeadline(deadlineDate) {
    if (!deadlineDate) {
      return "-";
    }

    const today = new Date();
    const deadline = new Date(deadlineDate);
    const isDeadlinePassed = today > deadline;

    if (isDeadlinePassed && !hasShownDeadlineAlert) {
      alert("¡Hay disfraces que han pasado su fecha límite!");
      setHasShownDeadlineAlert(true);
    } else if (
      !isDeadlinePassed &&
      Math.abs(deadline - today) / (1000 * 60 * 60 * 24) <= 2 &&
      !hasShownTwoDayAlert
    ) {
      alert("¡Hay disfraces que deben retirarse en los próximos dos días!");
      setHasShownTwoDayAlert(true);
    }

    return (
      <span style={{ color: isDeadlinePassed ? "red" : "black" }}>
        {deadline.toLocaleDateString()}
      </span>
    );
  }



  useEffect(() => {
    fetch("https://disfracesrosario.up.railway.app/costumes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const filteredRows = data.filter(
    (row) =>
      row.id.toString().match(new RegExp(searchText, "i")) ||
      (row.name && row.name.toString().match(new RegExp(searchText, "i"))) || // Agregar comprobación de nulidad y convertir a string
      (row.detail && row.detail.toString().match(new RegExp(searchText, "i"))) || // Agregar comprobación de nulidad y convertir a string
      (row.clientRented && row.clientRented.toString().match(new RegExp(searchText, "i"))) || // Agregar comprobación de nulidad y convertir a string
      (row.reservationDate && row.reservationDate.toString().match(new RegExp(searchText, "i"))) || // Agregar comprobación de nulidad y convertir a string
      (row.deadlineDate && row.deadlineDate.toString().match(new RegExp(searchText, "i"))) || // Agregar comprobación de nulidad y convertir a string
      (row.costumeStatus && row.costumeStatus.toString().match(new RegExp(searchText, "i"))) // Agregar comprobación de nulidad y convertir a string
  );


  return (
    <>
      <TextField
        label="Buscar"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre del Disfraz</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha de Retiro</TableCell>
              <TableCell>Fecha de Entrega</TableCell>
              <TableCell>Estatus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <img
                    src={row.image}
                    alt={row.name}
                    style={{ width: 100, height: 100 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>{row.clientRented || "-"}</TableCell>
                <TableCell>{checkDeadline(row.reservationDate)}</TableCell>
                <TableCell>{checkDeadline(row.deadlineDate)}</TableCell>
                <TableCell style={{ color: row.costumeStatus === 'ALQUILADO' ? 'green' : row.costumeStatus === 'RESERVADO' ? 'blue' : 'goldenrod' }}>
                  <span className={`status ${row.costumeStatus}`}>
                    {row.costumeStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;

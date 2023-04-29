import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useParams } from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const List2 = () => {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState([]);

  function handleSearchTextChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }

  useEffect(() => {
    axios
      .get(`https://disfracesrosario.up.railway.app/costumes/clients/7/history`)
      .then((response) => {
        console.log(response.data);
        setRows(response.data.transactions); // Extracts the array of the "transactions" property
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);



  return (
    <>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Nombre</TableCell>
              <TableCell className="tableCell">Apellido</TableCell>
              <TableCell className="tableCell">Transacciones</TableCell>
              <TableCell className="tableCell">Disfraz</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

export default List2;

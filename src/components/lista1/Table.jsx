import "./table.scss";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";


const List2 = () => {
  function handleSearchTextChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }
  const [searchText, setSearchText] = useState("");
  const rows = [
    {
      id: 1143155,
      product: "Difras Shrek",
      img: "https://static1.funidelia.com/142444-f6_big2/disfraz-de-la-casa-de-papel.jpg",
      customer: "John Smith",
      date: "1 Marzo",
      amount: 785,
      method: "Efectivo",
     
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://static1.funidelia.com/503840-f6_big2/disfraz-de-hormiga-para-ninos.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://static1.funidelia.com/448950-f6_big2/disfraz-de-t-rex-hinchable-jurassic-world-para-adulto.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
    
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://static1.funidelia.com/509851-f6_big2/disfraz-de-gallina-para-ninos.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
     
    },
 
    
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.id.toString().includes(searchText) ||
      row.product.toLowerCase().includes(searchText.toLowerCase()) ||
      row.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      row.date.toLowerCase().includes(searchText.toLowerCase()) ||
      row.amount.toString().includes(searchText) ||
      row.method.toLowerCase().includes(searchText.toLowerCase()) ||
      row.status.toLowerCase().includes(searchText.toLowerCase())
  );



  return (
    <>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth:200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Nombre</TableCell>
              <TableCell className="tableCell">Apellido</TableCell>
              <TableCell className="tableCell">Disfraz</TableCell>
              <TableCell className="tableCell">Fecha de Retiro</TableCell>
              <TableCell className="tableCell">Fecha de Devolucion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </>
  );
};

export default List2;

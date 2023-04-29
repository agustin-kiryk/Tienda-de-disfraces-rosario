import { useState, useEffect } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  const [amount2, setAmount2] = useState(null);
  const [number, setNumber] = useState(null);
  const [newLimit, setNewLimit] = useState(null); // Nuevo límite ingresado por el usuario
  const [totalElectronic, setTotalElectronic] = useState(null); // Total de facturación electrónica

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const response = await fetch("https://disfracesrosario.up.railway.app/configs/limite");
        const data = await response.json();
        setNumber(data); // Establecer el valor del estado 'number' con el valor obtenido de la API
      } catch (error) {
        console.log(error);
      }
    };
    fetchLimit();

    const fetchTotalElectronic = async () => {
      try {
        const response = await fetch("https://disfracesrosario.up.railway.app/transactions/totalsMain");
        const data = await response.json();
        setTotalElectronic(data.totalElectronic);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalElectronic();
  }, []);

  const updateLimit = async (newLimit) => {
    try {
      const response = await fetch(
        `https://disfracesrosario.up.railway.app/configs/limite?limite=${newLimit}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log(data);
      setNumber(data.limit);
    } catch (error) {
      console.log(error);
    }
  };



  //temporary
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "FACTURACION ELECTRONICA",
        isMoney: true,
        link: "",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
        value: totalElectronic, // Agrega esta línea para mostrar el valor de facturación electrónica
      };
      break;

    case "order":
      data = {
        title: "LIMITE",
        isMoney: true,
        link: (
          <div>
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              InputProps={{
                style: {
                  fontSize: '0.8rem', // ajusta el tamaño del texto
                  height: '30px',// ajusta la altura del TextField
                  backgroundColor: '#42231'
                }
              }}
            />

            <Button onClick={() => updateLimit(number)}>Modificar</Button>
          </div>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "red",
            }}
          />
        ),
      };
      break;

    case "earning":
      data = {
        title: "RESTO PARA FACTURAR",
        isMoney: true,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {type === "order" ? (amount2 !== null ? amount2 : number) : data.value}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className=" "></div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

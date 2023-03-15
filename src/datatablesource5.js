export const userColumns = [
 
    {
      field: "user",
      headerName: "ID",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="">
            <img className=""  alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      
      field: "monto",
      headerName: "Monto",
      width: 180,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 180,
    },
    {
      field: "tipodepago",
      headerName: "Tipo De Pago",
      width: 230,
    },
  
    {
      field: "cliente",
      headerName: "Cliente",
      width: 200,
    },
    {
      field: "remi",
      headerName: "Remito",
      width: 200,
    },
    /*
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    */
    
  ];
  
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "56",
      status: "active",
      monto:"5500$",
      fecha: "21/3/23",
      tipodepago: "Mercado Pago",
      cliente: "Juan Perez",
      remi: <button><a>Descargar</a></button>
    },
    {
      id: 2,
      username: "Messi",
      
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "T34-85",
      
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
  
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
     
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
     
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  
export const userColumns = [
 
    {
      field: "user",
      headerName: "ID",
      width: 230,
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
      
      field: "email",
      headerName: "Monto",
      width: 230,
    },
    {
      field: "disfraz",
      headerName: "Fecha",
      width: 230,
    },
    {
      field: "tipocliente",
      headerName: "Tipo De Pago",
      width: 230,
    },
  
    {
      field: "age",
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
      username: "El Papu",
      status: "active",
      email: "1snow@gmail.com",
      disfraz: "batman",
      tipocliente: "Habitual",
      age: 35,
      remi: "aprobado"
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
  
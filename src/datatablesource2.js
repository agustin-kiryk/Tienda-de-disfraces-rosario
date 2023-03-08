export const userColumns = [
 
    {
      field: "user",
      headerName: "Nombre",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
      
        );
      },
    },
    {
      
      field: "email",
      headerName: "Apellido",
      width: 230,
    },
    {
      field: "disfraz",
      headerName: "Disfraz Alquilado",
      width: 230,
    },
    {
      field: "tipocliente",
      headerName: "Tipo De Cliente",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Telefono",
      width: 200,
    },
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
    
  ];
  
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "El Papu",
      img: "https://static1.funidelia.com/142444-f6_big2/disfraz-de-la-casa-de-papel.jpg",
      status: "active",
      email: "1snow@gmail.com",
      disfraz: "batman",
      tipocliente: "Habitual",
      age: 35,
    },
    {
      id: 2,
      username: "Messi",
      img: "https://www.tododisfraz.com.ar/wp-content/uploads/2018/08/Todo-Disfraz-Botella-Fernet-2003.jpg",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "T34-85",
      img: "http://d3ugyf2ht6aenh.cloudfront.net/stores/454/193/products/maq-de-disfraces-1233-en-baja1-2d2d270dcaa0f7a97916057347350671-640-0.jpg",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  
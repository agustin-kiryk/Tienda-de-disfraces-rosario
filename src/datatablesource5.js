export const userColumns = [
  {
    field: "user",
    headerName: "ID",
    width: 80,
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
    width: 130,
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 120,
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

  /*
  {
    field: "remi",
    headerName: "Remito",
    width: 200,
    renderCell: (params) => {
      return (
        <button>
          <a href={params.row.remi}>Descargar</a>
        </button>
      );
    },
  },
  */
];

// obtener datos de la API y actualizar userRows
fetch('https://disfracesrosario.up.railway.app/transactions')
  .then(response => response.json())
  .then(data => {
    const newData = data.map((item, index) => ({
      id: index + 1,
      username: item.user_id,
      status: item.status,
      monto: `${item.amount}$`,
      fecha: item.date,
      tipodepago: item.payment_type,
      cliente: item.customer_name,
      remi: item.receipt_url,
    }));
    userRows = newData;
  });

  
  //temporary data
 // Temporary data
export const userRows = [];

// Fetch data from API
fetch('https://disfracesrosario.up.railway.app/transactions')
  .then(response => response.json())
  .then(data => {
    // Process data and assign to userRows
    userRows = data.map(transaction => {
      return {
        id: transaction.id,
        username: transaction.user,
        monto: transaction.amount,
        fecha: transaction.date,
        tipodepago: transaction.paymentType,
        cliente: transaction.clientName,
        remi: <button><a>Descargar</a></button>
      };
    });
  })
  .catch(error => console.error(error));

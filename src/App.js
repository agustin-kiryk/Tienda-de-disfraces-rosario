import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Usuarios from "./components/datatable/Datatable";
import Single from "./pages/single/Single";
import Single2 from "./pages/single2/Single"
import Single3 from "./pages/single3/Single";
import Single4 from "./pages/single4/Single";
import Single5 from "./pages/single5/Single";
import New from "./pages/new/New";
import New2 from "./pages/new2/New";



import Nuevafac from "./pages/nuevafac/New";
import Facturacion from "./pages/facturacion/Facturacion";
import Disfraces from "./components/disfraces/Disfraces";
import Histfac from "./pages/histfac/Histfac";
import Factele from "./pages/factele/Factele";
import New3 from "./pages/nuevopedido/New";
import New4 from "./pages/retiro/New";



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { userInputs2 } from "./disfraces";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="facturacion" element={<Facturacion />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="histfac" element={<Histfac />} />
            <Route path="factele" element={<Factele />} />
            <Route path="disfraces" element={<Disfraces />} />
            <Route path="nuevopedido" element={<New3 />} />
            <Route path="retiro" element={<New4 />} />
            

            <Route path="users">

              <Route index element={<List />} />


              <Route path=":userId" element={<Single />} />

              <Route
                path="new"
                element={<New inputs={userInputs} title="Agregar Nuevo Usuario" />}
              />

            </Route>



            <Route path="user">

              <Route index element={<Single2 />} />

              <Route path=":userId" element={<Single2 />} />

              <Route
                path="new2"
                element={<New2 inputs={userInputs2} title="Agregar Disfraz Nuevo" />}
              />
            </Route>



            


            <Route path="single2">

              <Route index element={<Single2 />} />

              <Route path=":userId" element={<Single2 />} />


            </Route>



            <Route path="single3">

              <Route index element={<Single3 />} />

              <Route path=":userId" element={<Single3 />} />


            </Route>

            <Route path="single4">

              <Route index element={<Single4 />} />

              <Route path=":userId" element={<Single4 />} />


            </Route>
            <Route path="single5">

              <Route index element={<Single5 />} />

              <Route path=":userId" element={<Single5 />} />


            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

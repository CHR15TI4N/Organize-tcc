import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CadInstituicao from "../pages/CadInstituicao";
import CadPolos from "../pages/CadPolos";
import Reserva from "../pages/Reserva";
import CadBlocos from "../pages/CadBlocos";
import CadSala from "../pages/CadSala";
import ReservaCons from "../consulta/ReservaCons";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<LoginPage/>}>    
                </Route>
                <Route
                    path={"/login"}
                    element={<LoginPage/>}>    
                </Route>
                <Route
                    path={"/registro"}
                    element={<RegisterPage/>}>    
                </Route>
                <Route
                    path={"/home"}
                    element={<HomePage/>}>    
                </Route>
                <Route
                    path={"/cadastro-instituicao"}
                    element={<CadInstituicao/>}>    
                </Route>
                <Route
                    path={"/cadastro-polo"}
                    element={<CadPolos/>}>    
                </Route>
                <Route
                    path={"/cadastro-bloco"}
                    element={<CadBlocos/>}>    
                </Route>
                <Route
                    path={"/cadastro-sala"}
                    element={<CadSala/>}>    
                </Route>
                <Route
                    path={"/reserva"}
                    element={<Reserva/>}>    
                </Route>
                <Route
                    path={"/reserva-consulta"}
                    element={<ReservaCons/>}>    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
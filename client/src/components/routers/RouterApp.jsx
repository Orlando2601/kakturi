import { Routes, Route } from "react-router-dom";
import Productos from "../Productos";
import Usuarios from "../Usuarios";

function RouterApp(){
    return(
        <Routes>
            <Route exact path="/usuarios" element={<Usuarios/>}/>
            <Route exact path="/productos" element={<Productos/>}/>

        </Routes>

    );
}
export default RouterApp;
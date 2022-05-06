import Header from "./Header";
import Footer from "./Footer"
import React from "react";
import RouterApp from "./routers/RouterApp";
import { Link } from "react-router-dom";

function App(){
    return(
        <React.Fragment>
            <Header/>
            
            <main className="mainHome">
                <div id="contenedor_botones" className="d-grid gap-2">
                     <Link to="/usuarios"><button className="btn btn-primary" id="btn_usuarios" type="button">Usuarios</button></Link> 
                    <Link to="/productos"><button className="btn btn-primary" id="btn_usuarios" type="button">Productos </button></Link>
                </div>
                <RouterApp/>
                
               
            </main>
            
           
            
            <Footer/>
        </React.Fragment>
        
    );

}

export default App;
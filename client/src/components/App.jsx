import Header from "./Header";
import Footer from "./Footer"
import React from "react";
import RouterApp from "./routers/RouterApp";

function App(){
    return(
        <React.Fragment>
            <Header/>
            
            <main className="mainHome">
                <div id="contenedor_botones" className="d-grid gap-2">
                    <button className="btn btn-primary" id="btn_usuarios" type="button"> <a href="/usuarios">Usuarios</a> </button>
                    <button className="btn btn-primary" id="btn_usuarios" type="button"><a href="/productos">Productos</a> </button>
                </div>
                <RouterApp/>
                
               
            </main>
            
           
            
            <Footer/>
        </React.Fragment>
        
    );

}

export default App;
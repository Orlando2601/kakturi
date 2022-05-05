import React, { Component } from "react";
import UsuariosList from "./UsuariosList";

class Usuarios extends Component{
    constructor(){
        super();
        this.state = {
            usuarios:[]
        }

    }

    async componentDidMount(){
        const response =await fetch("/api/usuarios");
        const users = await response.json()
        console.log(users)
        this.setState({
            usuarios: users.listaUsers,
            cantidad:users.count
        })
    
        
    }
    
    
    
        render(){
            
        
            return (
               
                <React.Fragment>
                    {
                        <div class="container overflow-hidden">
                            <h1>Total usuarios registrados {this.state.cantidad}</h1>
                        {
                            this.state.usuarios.map((usuario, index)=>{
                                return <UsuariosList { ...usuario} key={index}/>
                            })
                        }
    
                        </div>
                        
                            
                    }
                       
                </React.Fragment>
                
            );
        }



}

export default Usuarios
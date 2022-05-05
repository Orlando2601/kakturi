import { Component } from "react";
import ProductosList from "./ProductosList";

class Productos extends Component{
    constructor(){
        super();
        this.state = {
            productos:[]
        }
    }


    async componentDidMount(){

        const response = await fetch("/api/productos");
        const products = await response.json();

        this.setState({
            productos:products.lista,
            cantidad:products.count
        })
        
    }
    
    render(){
        return(
            <>
            
                {
                        <div className="container overflow-hidden">
                            <h1>Total Productos {this.state.cantidad}</h1>
                        {
                            this.state.productos.map((producto, index)=>{
                                return (
                                    <>
                                        <ProductosList { ...producto} key={index}/>
                                        
                                    </>
                                    
                                    
                                );
                                
                                
                            })
                            
                        }
    
                        </div>
                        
                            
                }
            
            </>
        );

    }

}

export default Productos
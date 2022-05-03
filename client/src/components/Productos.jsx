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
            productos:products.lista
        })
    }

    render(){
        return(
            <>
            
                {
                        <div class="container overflow-hidden">
                            <h1>Productos</h1>
                        {
                            this.state.productos.map((producto, index)=>{
                                return <ProductosList { ...producto} key={index}/>
                            })
                        }
    
                        </div>
                        
                            
                }
            
            </>
        );

    }

}

export default Productos
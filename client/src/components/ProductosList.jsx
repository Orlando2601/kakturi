
function ProductosList(props){
  



    return(
        <>
           
           
        


        
           <img  className="img-fluid" src={props.imagen} alt="" width="200vw" />
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Url</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">{props.id}</th>
                    <td> {props.nombre}</td>
                    <td>{props.descripcion}</td>
                    <td><a href={'http://localhost:3001/api/usuario/'+props.id}>{props.urlDetalleProduct}</a></td>
                    </tr>
                </tbody>
                
            </table>
        
        </>

    );
}

export default ProductosList
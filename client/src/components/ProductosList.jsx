function ProductosList(props){
  
    return(
        <>
            
            <table className="table table-dark table-hover">
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
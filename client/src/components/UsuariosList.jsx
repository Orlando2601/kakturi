function UsuariosList(props){
  
    return(
        <>
            
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Url</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">{props.id}</th>
                    <td> {props.nombre}</td>
                    <td>{props.correo}</td>
                    <td><a href={'http://localhost:3001/api/usuario/'+props.id}>{props.urlDetalleUser}</a></td>
                    </tr>
                </tbody>
            </table>
        
        </>

    );
}

export default UsuariosList
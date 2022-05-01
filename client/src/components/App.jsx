import Header from "./Header";
import Footer from "./Footer"
import Productos from "./Productos";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
function App(){
    return(
        <>
            <Header/>
            <h1>hola desde react</h1>
            <Productos/>
            <Footer/>
        </>
        
    );

}

export default App;
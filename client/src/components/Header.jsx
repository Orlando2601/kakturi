function Header(){
    return(
        <>
        <header>
            <div className="caja-logo">
                <a href="/"><img src="/images/logo cacturinuevo.png"  alt="Logo PuppieShop" /></a>              
                                
            </div>
            
            <div className="header-right">
                <div className="redes">
                    <div className="iconred">
                        <a href="https://www.google.com/" target="blank" /><i classclassName="fab fa-instagram"></i> 
                        
                    </div>
                    <div className="iconred">
                        <a href="https://www.google.com/" target="blank" /><i className="fab fa-facebook-f"></i>
                        
                    </div>
                    <div className="iconred">
                        <a href="https://www.google.com/" target="blank" /><i className="fab fa-whatsapp"></i>
                    </div>

                </div>

                <div className="caja-enlace-header">
                    <div className="div-btn-header">
                        <a className="a-btn-header" href="/products">Productos</a>
                    </div>
                    <div className="div-btn-header">
                        <a className="a-btn-header" href="#">Contactanos</a>
                    </div>

                   
                        <div className="iconred">
                            <a href="/user/login" /><i className="fa-solid fa-user"></i>
                        </div>

                   


                    <div className="iconred">
                        <a href="#" target="blank" /><i className="fas fa-shopping-cart"></i>
                    </div>
                </div>
            </div>
        </header>
        </>
    );

}

export default Header;
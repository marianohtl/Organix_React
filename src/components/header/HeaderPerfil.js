import React, { Component } from "react"
import bars from "../../assets/img/bars-solid.svg"
import ativo1 from "../../assets/img/Ativo 1.svg"
import ativo6 from "../../assets/img/Ativo 6.png"

export default class HeaderPerfil extends Component{
<<<<<<< HEAD

    logout = () => {
        localStorage.removeItem("usuario-organix")

        this.props.history.push("/")
    }

=======
>>>>>>> origin/iguinho2
    render(){
        return(
            <header>
             
<<<<<<< HEAD
            {/* <div className="container-home-responsivo"/>
                    <a href=""><img src={bars} className="menu-bar" alt="botão menu hamburger"/></a>
                    <p>CADASTRO DE PRODUTOS</p>
                    <a href="index.html"><img src={ativo1} className="logo-cenoura" alt="Duas cenouras cruzadas formando o x de organix"/></a> */}
                
        
        <div className="container-home">
            <div>
                <a href="/"><img src={ativo6} alt="Duas cenouras cruzadas formando o x de organix"/></a>
            </div>
            <nav className="nav-perfil"/>
                <ul className="ul-perfil">
                    <a href="/" className="btn_perfil">
                        <li>Página Inicial</li>
                    </a>
                    <a href="/" onClick={this.logout} className="btn_perfil btn_perfil2">
=======
            {/* <div class="container-home-responsivo"/>
                    <a href=""><img src={bars} class="menu-bar" alt="botão menu hamburger"/></a>
                    <p>CADASTRO DE PRODUTOS</p>
                    <a href="index.html"><img src={ativo1} class="logo-cenoura" alt="Duas cenouras cruzadas formando o x de organix"/></a> */}
                
        
        <div class="container-home">
            <div>
                <a href="index.html"><img src={ativo6} alt="Duas cenouras cruzadas formando o x de organix"/></a>
            </div>
            <nav class="nav-perfil"/>
                <ul class="ul-perfil">
                    <a href="/" class="btn_perfil">
                        <li>Página Inicial</li>
                    </a>
                    <a href="/quemsomos" class="btn_perfil btn_perfil2">
>>>>>>> origin/iguinho2
                        <li>Sair</li>
                    </a>
                </ul>
        </div>

</header>
        )
    }

}
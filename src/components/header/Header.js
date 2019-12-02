import React, {Component} from "react"
import Logo from "../../assets/img/Ativo 6.png"
import Menu from "../../assets/img/bars-solid.svg"
import {Link} from "react-router-dom"

class Header extends Component{
    render(){
        return(
            <header>
        <div class="container-home-responsivo">
          <Link href=""><img src={Menu} class="menu-bar" alt="botão menu hamburger" /></Link>
          <p>HOME</p>
          <Link href=""><img src="imagens/Ativo 1.svg" class="logo-cenoura" alt="logo cenoura" /></Link>
        </div>
        <div class="container-home">
          <h1>
            <img src={Logo} alt="LOGO ORGANIX COM UMA CENOURA NO FINAL" />
          </h1>
          <nav class="nav-home">
            <ul class="ul-home">
              <li><a href="index.html">HOME</a></li>
              <li class="tracinho">|</li>
              <li><a href="quemsomos.html">QUEM SOMOS</a></li>
              <li class="tracinho">|</li>
              <li><a href='#dicas'>DICAS</a></li>
            </ul>
          </nav>
          <nav class="nav-home">
            <ul class="ul-home">
              <li class="nav-2-home"><a href="perfil.html">Entrar</a></li>
              <li class="nav-2-home"><a href='cadastro.html'>Cadastre-se</a></li>
            </ul>
          </nav>
        </div>
      </header>
        )
    }
}

export default Header;
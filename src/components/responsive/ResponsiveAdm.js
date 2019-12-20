import React,{Component} from "react"
import "../../assets/css/responsive.css"
import { withRouter } from 'react-router-dom';


class ResponsiveAdm extends Component{
  
  logout = () => {
    localStorage.removeItem("usuario-organix")

    this.props.history.push("/")
  }
  
  render(){
        return(
            <header className="ResponsiveMenu">
            <div className="header"></div>
  <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
  <label for="openSidebarMenu" className="sidebarIconToggle">
    <div className="spinner diagonal part-1"></div>
    <div className="spinner horizontal"></div>
    <div className="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu">
    <ul className="sidebarMenuInner">
      <li><a href="/">Home</a></li>
      <li><a href="#/PerfilAdm">Perfil</a></li>
      <li><a href="#/EditUsers">Editar Usuario</a></li>
      <li><a href="#/CadastrarCategoria">Cadastrar Produtos</a></li>
      <li><a href="#/AlterarCategoria">Alterar Produtos Cadastrados</a></li>
      <li><a href="#/NewCategoria">Cadastrar Categoria de Receita</a></li>
      <li ><a href="#/" onClick={this.logout}>Sair</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}

export default withRouter(ResponsiveAdm);
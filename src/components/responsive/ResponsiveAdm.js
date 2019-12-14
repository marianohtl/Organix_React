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
      <li><a href="/" target="_blank">Home</a></li>
      <li><a href="#/PerfilAdm" target="_blank">Perfil</a></li>
      <li><a href="#/EditUsers" target="_blank">Editar Usuario</a></li>
      <li><a href="#/CadastrarCategoria" target="_blank">Cadastrar Produtos</a></li>
      <li><a href="#/AlterarCategoria" target="_blank">Alterar Produtos Cadastrados</a></li>
      <li><a href="#/NewCategoria" target="_blank">Cadastrar Categoria de Receita</a></li>
      <li ><a href="#/" onClick={this.logout}>Sair</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}

export default withRouter(ResponsiveAdm);
import React,{Component} from "react"
import "../../assets/css/responsive.css"
import { withRouter } from 'react-router-dom';


class ResponsiveComprador extends Component{
  
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
      <li><a href="#/PerfilComprador" target="_blank">Perfil</a></li>
      <li><a href="#/BuscarProdutos" target="_blank">Buscar Produtos</a></li>
      <li><a href="#/TodasReceitas" target="_blank">Encontrar Receitas</a></li>
      <li><a href="#/MinhasReceitas" target="_blank">Minhas Receitas</a></li>
      <li><a href="#/CadastrarReceitas" target="_blank">Cadastrar Receitas</a></li>
      <li ><a onClick={this.logout}>Sair</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}

export default withRouter(ResponsiveComprador);
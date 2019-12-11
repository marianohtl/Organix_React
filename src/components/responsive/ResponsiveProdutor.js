import React,{Component} from "react"
import "../../assets/css/responsive.css"

export default class ResponsiveProdutor extends Component{
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
      <li><a href="#/perfilprodutor" target="_blank">Perfil</a></li>
      <li><a href="#/produtoscadastrados" target="_blank">Produtos Cadastrados</a></li>
      <li><a href="#/cadastrarprodutos" target="_blank">Cadastrar Produtos</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}
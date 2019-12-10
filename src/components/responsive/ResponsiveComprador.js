import React,{Component} from "react"
import "../../assets/css/responsive.css"

export default class ResponsiveComprador extends Component{
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
      <li><a href="#/perfilcomprador" target="_blank">Perfil</a></li>
      <li><a href="#/buscarprodutos" target="_blank">Buscar Produtos</a></li>
      <li><a href="#/todasreceitas" target="_blank">Receitas</a></li>
      <li><a href="#/minhasreceitas" target="_blank">Minhas Receitas</a></li>
      <li><a href="#/cadastroreceitas" target="_blank">Cadastrar Receitas</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}
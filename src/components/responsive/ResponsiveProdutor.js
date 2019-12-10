import React,{Component} from "react"
import "../../assets/css/responsive.css"

export default class ResponsiveProdutor extends Component{
    render(){
        return(
            <header>
            <div class="header"></div>
  <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"/>
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu">
    <ul class="sidebarMenuInner">
      <li><a href="/perfilprodutor" target="_blank">Perfil</a></li>
      <li><a href="/produtoscadastrados" target="_blank">Produtos Cadastrados</a></li>
      <li><a href="/cadastrarprodutos" target="_blank">Cadastrar Produtos</a></li>
      <li><a href="/" target="_blank">Dicas</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}
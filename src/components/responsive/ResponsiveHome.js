import React,{Component} from "react"
import "../../assets/css/responsive.css"

export default class ResponsiveHome extends Component{
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
      <li><a href="/" target="_blank">Home</a></li>
      <li><a href="/quemsomos" target="_blank">Quem Somos</a></li>
      <li><a href="/minhasreceitas" target="_blank">Receitas</a></li>
      <li><a href="/cadastrarreceitas" target="_blank">Cadastrar Receitas</a></li>
      <li><a href="/" target="_blank">Dicas</a></li>
    </ul>
  </div>
  
  </header>
        )
    }
}
import React,{Component} from 'react'





export default class CardReceita extends Component {
  render() {
      return(
        <>
      
        <div class="card-produto">
        <div class="imagem-redonda-card-receita"> <img src="#"
                alt="torta de morango"/></div>
        <p class='nome-produto'>Torta de Morango</p>
        <ul>
            <li>Preço Médio: 25R$</li>
            <li>Rendimento: 2 porções</li>
        </ul>
        <button type="button">VER RECEITA</button>
        </div>
  
      </>

      
        
    
      )
  }
}

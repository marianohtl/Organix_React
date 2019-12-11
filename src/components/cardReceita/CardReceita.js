import React, { Component } from 'react'
import '../../assets/css/estilo.css'


import {api} from '../../services/api';




export default class CardReceita extends Component {

  constructor() {
    super()
    this.state = {

      listaOferta: [],

      getOferta: {
        preco: "",
        nomeProduto: "",
      }

    }
  }

  getOferta = () => {
    api.get('/Oferta')
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaOferta: response.data })
          console.log(this.state.listaOferta)
        }
      })
  }


  componentDidMount() {
    this.getOferta();

  }

  render() {

    return (
      this.state.listaOferta.map(function (a) {
        return (
          <>
          

            <div className="card-produto">
              <div className="imagem-redonda-card-receita"> <img src="#"
                alt="torta de morango" /></div>
              <p className='nome-produto'>{a.idProdutoNavigation.nomeProduto}</p>

              <ul>
                <li>Preço Médio: {a.preco}R$</li>
                <li>Rendimento: 2 porções</li>
              </ul>
             <button type="button" to="/cadastro">VER PRODUTO</button>
            </div>

          </>
        )
      })


    )
  }
}





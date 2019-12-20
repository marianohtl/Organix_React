import React, { Component } from 'react'
import '../../assets/css/estilo.css'
import {api} from '../../services/api';

import { withRouter } from 'react-router-dom'

class CardReceita extends Component {

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

  irParaAPagina = (pagina) => {
    this.props.history.push(pagina);
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
              <div className="imagem-redonda-card-receita"> <img src={"http://localhost:5000/" + a.idProdutoNavigation.imagem}
                alt="torta de morango" /></div>
              <p className='nome-produto'>{a.idProdutoNavigation.nomeProduto}</p>

              <ul>
                <li>Preço Médio por KG: R${a.preco}</li>
                
              </ul>
             <button type="button" onClick={() => this.irParaAPagina("/Cadastro")}>VER PRODUTO</button>
            </div>

          </>
        )
      }.bind(this))


    )
  }
}

export default withRouter(CardReceita)




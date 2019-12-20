import React from "react"
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css';
import { Component } from 'react'
import '../../assets/css/estilo.css'
import {api} from '../../services/api'
// import { userInfo } from "os";
import { withRouter } from 'react-router-dom'



class SwiperProducts extends Component {
  constructor() {
    super()
    this.state = {
      listaOferta: [
        {
          estadoProduto:"",
          idProdutoNavigation:""
        }
      ],

      getOferta: {
        preco: "",
        nomeProduto: "",
        estadoProduto:"",
        idProdutoNavigation : {
          imagem : ""
        }
      }
    }
    this.params = {
      slidesPerView: 5,
      spaceBetween: 30,
      observer: true,
      pagination: {
        // el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }

  irParaAPagina = (pagina) => {
    this.props.history.push(pagina);
  }

  
  getOferta = () => {
    api.get('/Oferta')
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaOferta: response.data }, () => console.log("produtos",this.state.listaOferta))
          // console.log(this.state.listaOferta)
        }
      })
  }


  componentDidMount() {
    this.getOferta();
  }


  render() {
    return (
      
      // <Swiper {...SimpleSwiper.params}>
      <Swiper {...this.params}>
      
      {this.state.listaOferta.map(function (a) {
        return (
                <div className="swiper-slide">
                  <div className="card-produto">
                    <div className="imagem-redonda-card-receita"> <img src={"http://localhost:5000/" + a.idProdutoNavigation.imagem}
                      alt="torta de morango" /></div>
                    <p className='nome-produto'>{a.idProdutoNavigation.nomeProduto}</p>
                    <ul>
                      <li>Preço Médio: R${a.preco}</li>
                      {/* <li>Estado do produto: {a.estadoProduto}</li> */}
                    </ul>
                    <button type="button" onClick={() => this.irParaAPagina("/Cadastro")}>VER PRODUTO</button>
                  </div>
                </div>
                )
              }.bind(this))}
              
        </Swiper>
        )
  }
}

export default withRouter(SwiperProducts)




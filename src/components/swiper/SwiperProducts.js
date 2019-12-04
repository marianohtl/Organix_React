import React from "react"
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { Component } from 'react'
import '../../assets/css/estilo.css'
import  {api,apiFormData} from '../../services/api';


const SimpleSwiper = () => {
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  }
}



export default class SwiperProducts extends Component {
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
          this.setState({ listaOferta: response.data }, () => console.log("produtos",this.state.listaOferta))
        }
      })
  }


  componentDidMount() {
    this.getOferta();
  }


  render() {
    return (
      
      <Swiper {...SimpleSwiper.params}>
      
      {this.state.listaOferta.map(function (a) {
            return (
                <div className="swiper-slide">
                  <div className="card-produto">
                    <div className="imagem-redonda-card-receita"> <img src="#"
                      alt="torta de morango" /></div>
                    <p className='nome-produto'>{a.idProdutoNavigation.nomeProduto}</p>
                    <ul>
                      <li>Preço Médio: {a.preco}R$</li>
                    </ul>
                    <button type="button" to="/cadastro">VER PRODUTO</button>
                  </div>
                </div>
            )
          })}

          </Swiper>
        )
  }
}



/* // export default function Swiper(){
//     return( */


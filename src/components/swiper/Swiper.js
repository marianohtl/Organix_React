import React from "react"
import Swiper from 'react-id-swiper'
import { Link } from "react-router-dom"
import Woman from "../../assets/img/slides/woman.svg"
import Fruit from "../../assets/img/slides/fruit.svg"
import Conversation from "../../assets/img/slides/conversation.svg"
import Farmer from "../../assets/img/slides/farmer.svg"
import Sold from "../../assets/img/slides/vendeu.svg"
import Buy from "../../assets/img/slides/shopping-online.svg"
import Arrow from "../../assets/img/slides/right-arrow.svg"

import 'swiper/css/swiper.css'

const SimpleSwiper = () => {
  const params = {
  
    // slidesPerView: 3,
    // spaceBetween: 10,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false
    //   },
    // },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        // el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
  }

  
  return (
    <div ClassName="swiperHome">
     
        <Swiper {...params}>
        
          <div className="swiper-slide">
          
          <Link href=""><img src={Farmer} alt="Imagem de um Fazendeiro"  width="250vw" /></Link>
            <p>Sobrou?</p>  
          </div>
            <div className="swiper-slide">
              <Link href=""><img src={Fruit} alt="Imagem de bananas " width="250vw" /></Link>
              <p>Cadastrou</p>
            </div>
            <div className="swiper-slide">
              <Link href=""><img src={Sold} alt="Imagem de morangos" width="250vw"  /></Link>
              <p>Vendeu</p>
            </div>
            <div className="swiper-slide">
          
              <Link href=""><img src={Woman} alt="Imagem de morangos" width="250vw"  /></Link>
              <p>Escolheu</p>
            </div>
            <div className="swiper-slide">
              <Link href=""><img src={Conversation} alt="Imagem de morangos" width="250vw"  /></Link>
              <p>Negociou</p>
            </div>
            <div className="swiper-slide">
              <Link href=""><img src={Buy} alt="Imagem de morangos" width="250vw"  /></Link>
              <p>Comprou</p>
            </div>
        </Swiper>
    </div>
      )
    }
    
/* // export default function Swiper(){
//     return( */

export default SimpleSwiper;
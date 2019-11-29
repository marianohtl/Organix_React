import React from "react"
import Swiper from 'react-id-swiper';
import {Link} from "react-router-dom"
import morango from "../../assets/img/Slider/morango.png"
import banana from "../../assets/img/Slider/banana.png"
import abacaxi from "../../assets/img/Slider/abacaxi.png"
import tomate from "../../assets/img/Slider/tomate.png"

import 'swiper/css/swiper.css';

const SimpleSwiperDicas = () =>{
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
    return(
    <Swiper {...params}>
        
        <div className="swiper-slide">
                     <Link href=""><img src={morango} alt="Imagem de morangos"/></Link>
                     <p>Cesta Sortidas</p>
                     <p>Por apenas R$1,00</p>
                   </div>
                   <div className="swiper-slide">
                    <Link href=""><img src={banana} alt="Imagem de bananas"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={morango} alt="Imagem de morangos"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={abacaxi} alt="Imagem de um abacaxi"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={tomate} alt="Imagem de tomates"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={banana} alt="Imagem de bananas"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={morango} alt="Imagem de morangos"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={abacaxi} alt="Imagem de um abacaxi"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                  <div className="swiper-slide">
                    <Link href=""><img src={tomate} alt="Imagem de tomates"/></Link>
                    <p>Cesta Sortidas</p>
                    <p>Por apenas R$1,00</p>
                  </div>
                 
            </Swiper>
    )
}    

/* // export default function Swiper(){
//     return( */
                                            
export default SimpleSwiper;
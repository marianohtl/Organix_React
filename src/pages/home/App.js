import React from 'react';
import '../../assets/css/estilo.css';
import SimpleSwiper from "../../components/swiper/Swiper"
import Header from "../../components/header/Header"
import CardReceita from '../../components/cardReceita/CardReceita';
import SwiperProducts from '../../components/swiper/SwiperProducts'




function App() {  
  return (
    <>
      <Header/>
      <main>
        <div className="banner"></div>
        <div className="marg"></div>
        <SwiperProducts/>
        <div className="h1_dicas">
          <h2>Ofertas</h2>
        </div>
        <section id="dicas" className="dicas">
          
        <CardReceita/>
        </section>
      </main>
    </>
  )
}

export default App;




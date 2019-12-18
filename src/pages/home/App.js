import React from 'react';
import '../../assets/css/estilo.css';
import SimpleSwiper from "../../components/swiper/Swiper"
import Header from "../../components/header/Header"
import CardReceita from '../../components/cardReceita/CardReceita';
// import SwiperProducts from '../../components/swiper/SwiperProducts'
import ResponsiveHome from "../../components/responsive/ResponsiveHome"
import Footer from '../../components/Footer/Footer'
import Banner from "../../components/banner/Banner"






function App() {  
  return (
    <>
    <ResponsiveHome/>
      <Header/>
        <div className="banner"></div>
        <div className="swiperHome">
        <h2>Como Funciona?</h2>
        <SimpleSwiper/>
        </div>
      <main>
        <div className="marg"></div>
        <div className="h1_dicas">
          <h2>Ofertas</h2>
        </div>
        <section id="dicas" className="dicas">
          
        <CardReceita/>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App;




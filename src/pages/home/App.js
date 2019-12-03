import React from 'react';
import '../../assets/css/estilo.css';
import SimpleSwiper from "../../components/swiper/Swiper"
import Header from "../../components/header/Header"
import CardReceita from '../../components/cardReceita/CardReceita';
<<<<<<< Updated upstream
import SwiperProducts from '../../components/swiper/SwiperProducts'
=======
>>>>>>> Stashed changes




function App() {
  
  return (

    <>
      <Header/>
      <main>
        <div className="banner"></div>
        <div className="marg"></div>
<<<<<<< Updated upstream
        <SwiperProducts/>
        <div className="h1_dicas">
          <h2>Ofertas</h2>
=======
        <SimpleSwiper/>
        <div className="h1_dicas">
          <h2>Dicas</h2>
>>>>>>> Stashed changes
        </div>
        <section id="dicas" className="dicas">
          
        <CardReceita/>
        </section>
      </main>
    </>


  )
}

export default App;




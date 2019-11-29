import React from 'react';
import '../../assets/css/estilo.css';
import SimpleSwiper from "../../components/swiper/Swiper"
import Header from "../../components/header/Header"



function App() {
  return (

    <>
      <Header/>


      <main>
        <div className="banner"></div>
        <div className="marg"></div>
        <SimpleSwiper/>
        <div className="h1_dicas">
          <h2>Dicas</h2>
        </div>
        <section id="dicas" className="dicas">
          <div className="card">
            <img src="img/agrotóxico.png" alt="Homem em meio a plantação com agrotóxicos." />
            <h3>Não há dose segura de agrotóxico!</h3>
            <a href="https://www.hojeemdia.com.br/horizontes/pesquisa-indica-que-n%C3%A3o-h%C3%A1-dose-segura-de-agrot%C3%B3xico-1.733131" target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="/img/organix.jpg" alt="Um montante de peras, laranjas e ameixas sob uma bancada." />
            <h3>10 benefícios que os alimentos orgânicos</h3>
            <a href="http://www.organicsnet.com.br/2015/07/10-beneficios-que-os-alimentos-organicos-podem-proporcionar-a-sua-saude/"
              target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/vegetaias.jpg" alt="Geladeira com ovos, pimentões, pepinos, alface,couve flor e leite." />
            <h3>Aprenda a guardar frutas e verduras na sua casa!</h3>
            <a href="https://content.paodeacucar.com/saudabilidade/aprenda-a-guardar-frutas-e-verduras" target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/vacas.jpg" alt="Foto de um boi e uma vaca pastando." />
            <h3>Deveríamos parar de comer carne?</h3>
            <a href="https://super.abril.com.br/ciencia/deveriamos-parar-de-comer-carne/" target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/mulher.jpg" alt="Mulher cheirando uma maçã." />
            <h3>4 benefícios do consumo de alimentos orgânicos</h3>
            <a href="https://blog.drconsulta.com/4-beneficios-do-consumo-de-alimentos-organicos-para-saude/" target="_blank" className="btn_saiba_mais">
              SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/marmita.jpg"
              alt="Duas menininhas pequenas olhando o que tem dentro de uma bolsa de marmitas." />
            <h3>Marmita gourmet: veja como ganhar dinheiro.</h3>
            <a href="https://www.eduk.com.br/blog-gastronomia-e-ponto/marmita-gourmet/" target="_blank"
              className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/agrotóxico.png" alt="Homem em meio a plantação com agrotóxicos." />
            <h3>Não há dose segura de agrotóxico!</h3>
            <a href="https://www.hojeemdia.com.br/horizontes/pesquisa-indica-que-n%C3%A3o-h%C3%A1-dose-segura-de-agrot%C3%B3xico-1.733131" target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/organix.jpg" alt="Um montante de peras, laranjas e ameixas sob uma bancada." />
            <h3>10 benefícios que os alimentos orgânicos</h3>
            <a href="http://www.organicsnet.com.br/2015/07/10-beneficios-que-os-alimentos-organicos-podem-proporcionar-a-sua-saude/"
              target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
          <div className="card">
            <img src="img/vegetaias.jpg" alt="Geladeira com ovos, pimentões, pepinos, alface,couve flor e leite." />
            <h3>Aprenda a guardar frutas e verduras na sua casa!</h3>
            <a href="https://content.paodeacucar.com/saudabilidade/aprenda-a-guardar-frutas-e-verduras" target="_blank" className="btn_saiba_mais">SAIBA MAIS</a>
          </div>
        </section>
      </main>
    </>


  )
}

export default App;




import React, { Component } from "react"
import "../../assets/css/estilo.css"
//  import "../../assets/css/img/"
import SwiperProducts from "../../components/swiper/SwiperProducts"
import Header from "../../components/header/Header"
import ResponsiveHome from "../../components/responsive/ResponsiveHome"
import Footer from '../../components/Footer/Footer'


export default class QuemSomos extends Component {
  render() {
    return (

      <>
        <ResponsiveHome />
        <Header />
        <main>
          <section className="nossa-historia">
            <div className="blur-quem-somos">
              <div className="historia-txt">
                <h2>Nossa História</h2>
                <p className="text-quem-somos">
                  Tudo começou em Julho de 2019 quando 6 desenvolvedores encontraram um problema: Grandes quantidades de Produtos orgânicos estavam sendo descartados. Visando resolver esse problema, foi criado a Organix, onde o objetivo é conectar produtores orgânicos com pessoas interessadas em comprar estes produtos. </p>
              </div>
            </div>
          </section>
          <section className="quem-somos">
            <h3>Quem Somos</h3>
            <div className="valores">
              <div className="div-box">
                <div className="div-txt">
                  <h4>Missão</h4>
                  <p>Conectar em uma só plataforma tanto produtores orgânicos que querem vender o excedente de sua produção, quantos compradores interessados nestes produtos, assim, evitando o desperdício de produtos e deixando mais acessível a compra e venda de produtos orgânicos</p>
                </div>
              </div>
              <div className="div-box">
                <div className="div-txt">
                  <h4>Visão</h4>
                  <p>Tornar-se referência como a melhor plataforma de produtores/consumidores de produtos orgânicos do Brasil.
                    </p>

                </div>
              </div>
              <div className="div-box">
                <div className="div-txt">
                  <h4>Valores</h4>
                  <p>Ética<br />  Respeito<br /> Comprometimento <br /> Preservação do meio ambiente</p>
                </div>
              </div>
            </div>
          </section>
          <div className="swiperHome">
            <SwiperProducts />
          </div>


        </main>
        <Footer />

      </>
    )
  }
}

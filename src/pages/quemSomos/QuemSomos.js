import React, {Component} from "react"
import "../../assets/css/estilo.css"
//  import "../../assets/css/img/"
import SimpleSwiper from "../../components/swiper/Swiper"
import Header from "../../components/header/Header"

export default class QuemSomos extends Component{
    render(){
        return(
         
           <>
            <Header/>
            <main>
            <section className="nossa-historia">
              <div className="historia-txt">
                <h2>Nossa História</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.</p>
              </div>
            </section>
            <section className="quem-somos">
              <h3>Quem Somos</h3>
              <div className="valores">
                <div className="div-box">
                  <div className="div-txt">
                    <h4>Missão</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.</p>
                  </div>
                </div>
                <div className="div-box">
                  <div className="div-txt">
                    <h4>Valores</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                  </div>
                </div>
                <div className="div-box">
                  <div className="div-txt">
                    <h4>Visão</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.</p>
                  </div>
                </div>
              </div>
            </section>
            <SimpleSwiper/>
            
          </main>
          </>
        )
    }
}

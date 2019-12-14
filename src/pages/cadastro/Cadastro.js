import React, { Component } from 'react';

import '../../assets/css/estilo.css';

// import LogoCenoura from '../../assets/img/Ativo 1.png'

// import api from '../../services/api';


import Comprador from '../../assets/img/cadastro/comprador.svg'
import Produtor from '../../assets/img/cadastro/produtor.svg'

import FormularioCadastro from '../../components/formularioCadastro/formularioCadastro'
import Header from '../../components/header/Header'
import ResponiveHome from "../../components/responsive/ResponsiveHome"

import Footer from '../../components/Footer/Footer'

export default class Cadastro extends Component {

    constructor(){
        super();
        this.state={
           showModal: false,
           userProfile: "",
        }
    }

    showModal = (user_profile) => {
        this.setState({showModal:true})
        this.setState({userProfile:user_profile})
    };

    hideModal=(fechar_modal)=>{
        this.setState({showModal:false})
        this.setState({fechar_modal:fechar_modal})
    }

    

    render() {
        return (
            <div>
                <ResponiveHome/>
                <Header/>
                <main className="main_cad">
                    <div className="esquerdo_cadastro">
                        <div className="btn_cadastro">
                            <img src={Produtor} alt="icone de um produtor"/>
                            <p><button onClick={() => this.showModal(2)} className="btnCadastro">Produtor</button></p>
                        </div>
                    </div>
                    <div className="direito_cadastro">
                        <div className="btn_cadastro">
                            <img src={Comprador} alt="icone de um comprador"/>
                            <p><button onClick={() => this.showModal(1)} className="btnCadastro">Comprador</button></p>
                        </div>
                    </div>
                </main>
                { this.state.showModal && <FormularioCadastro user_profile={this.state.userProfile} fechar_modal={this.hideModal}/> }

                <Footer/>
            </div>
        )}
}



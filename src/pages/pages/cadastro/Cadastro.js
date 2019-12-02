import React, { Component } from 'react';

import '../../assets/css/estilo.css';

// import LogoCenoura from '../../assets/img/Ativo 1.png'

// import api from '../../services/api';


import Comprador from '../../assets/img/cadastro/comprador.svg'
import Produtor from '../../assets/img/cadastro/produtor.svg'

import FormularioCadastro from '../../components/formularioCadastro/formularioCadastro'

export default class PerfilComprador extends Component {

    constructor(){
        super();
        this.state={
           showModal: false,
           userProfile: ""
        }
    }

    showModal = (user_profile) => {
        this.setState({showModal:true})
        this.setState({userProfile:user_profile})
    };

    hideModal = () => {
        this.setState({showModal:false})
    };

    render() {
        return (
            <div>
                <main className="main_cad">
                    <div className="esquerdo_cadastro">
                        <div className="btn_cadastro">
                            <img src={Produtor} alt="icone de um produtor"/>
                            <button onClick={() => this.showModal("produtor")} value="">Produtor</button>
                            {/* <p><a href="form_produtor.html" className="btn_cadastro1">Produtor</a></p> */}
                        </div>
                    </div>
                    <div className="direito_cadastro">
                        <div className="btn_cadastro">
                            <img src={Comprador} alt="icone de um comprador"/>
                            <button onClick={() => this.showModal("comprador")} value="">Comprador</button>
                        </div>
                    </div>
                </main>
                { this.state.showModal && <FormularioCadastro user_profile={this.state.userProfile}/> }
            </div>
        )}
}



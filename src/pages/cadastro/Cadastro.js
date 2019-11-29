import React, { Component } from 'react';

import '../../assets/css/estilo.css';

// import LogoCenoura from '../../assets/img/Ativo 1.png'

// import api from '../../services/api';

import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";

import Comprador from '../../assets/img/cadastro/comprador.svg'
import Produtor from '../../assets/img/cadastro/produtor.svg'

import FormularioCadastro from '../../components/formularioCadastro/formularioCadastro'

export default class PerfilComprador extends Component {


    render() {
        return (
            <div>
            <main class="main_cad">
                 <div class="esquerdo_cadastro">
                    <div class="btn_cadastro">
                        <img src={Produtor} alt="icone de um produtor"/>
                        <button onClick='' value="">Produtor</button>
                    {/* <p><a href="form_produtor.html" class="btn_cadastro1">Produtor</a></p> */}
                </div>
            </div>
            <div class="direito_cadastro">
                <div class="btn_cadastro">
                 <img src={Comprador} alt="icone de um comprador"/>
                 <button onClick='' value="">Comprador</button>
                </div>
            </div>
        </main>
        <FormularioCadastro/>
        </div>
    )} 
}


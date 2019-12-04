import React, {Component} from 'react';

import { Link} from 'react-router-dom';
import '../../assets/css/estilo.css'

import Comprador from '../../assets/img/Perfil/comprador.png'

// import api from '../../services/api';

// import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";


export default class PainelAdm extends Component{

    // constructor(){
    //     super();
    // }

    render(){
        return(
            

            <div className="esquerdo_perfil">
                <img src={Comprador} alt="avatar do produtor"/>
                <div className="menu_perfil">
                        <h2>Renata Amaral</h2>
                        <p><Link to ="#/PerfilComprador">Perfil</Link></p>
                        <p><Link to ="#/">Buscar Produtos</Link></p>
                        <p><Link to ="#/">Receita</Link></p>
                        <p><Link to ="#/">Cadastro de Receitas</Link></p>
                        <p><Link to ="#/">Dicas</Link></p>
                    </div>
            </div>
    ) 
}

}
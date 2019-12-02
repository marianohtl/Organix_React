import React, {Component} from 'react';

import '../../assets/css/estilo.css';

import PainelAdm from '../../components/painelAdm/PainelAdm';

import Footer from '../../components/Footer/Footer'

// import api from '../../services/api';


// import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";



export default class PerfilComprador extends Component{

    // constructor(){
    //     super()
    //     this.state = {
    //         //gets
    //         listaUsuario:[],
    //         listaEndereco:[],
    //         listaTelefone:[],

    //     }
    // }

    // componentDidMount(){
      
    // }
    
    // //#region GETS
    // getUsuario = () =>{
     
    // }

    render(){
        return(
            <div>
            <main class="itens-encontrados">
                <PainelAdm/>
            <div class="lado-direito-perfil-produtor">

                    <div class="container-perfil">
        
                        <h2>Meus Dados</h2>
        
                        <div class="container-perfil2">
        
                            <div class="dados-produtor">
                                <h4>Dados Pessoais</h4>
                                <p><span class="bold-info-type">Nome:</span> Renata Amaral</p>
                                <p><span class="bold-info-type">CPF</span> 111.222.333.44</p>
                                <p><span class="bold-info-type">Telefone:</span> 8002-8922</p>
                                <p><span class="bold-info-type">E-mail:</span> bomdia@hotmail.com</p>
                            </div>
        
                            <div class="dados-localizacao-produtor">
                                <h4>Endereço</h4>
                                <p><span class="bold-info-type">CEP:</span> 222222-22</p>
                                <p><span class="bold-info-type">Endereço:</span> Blabla, 23</p>
                                <p><span class="bold-info-type">Bairro:</span> Algum</p>
                                <p><span class="bold-info-type">Cidade:</span> Osasco</p> 
                                <p><span class="bold-info-type">Estado:</span> SP</p>
                                <p><span class="bold-info-type">Zona:</span> Zona Oeste</p>
                            </div>
                        </div>
                        <button class="editar-perfil" onClick="">Editar Perfil</button>
                        <div class="lado-direito-resultado1"></div>
                    </div>
                </div>
                </main>
                 <Footer/>
                 </div>
    ) 
   
}

}
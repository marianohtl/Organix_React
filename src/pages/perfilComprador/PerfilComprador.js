import React, {Component} from 'react';

import '../../assets/css/estilo.css';

import { parseJwt } from "../../services/auth"

import PainelAdm from '../../components/painelAdm/PainelAdm';

import Footer from '../../components/Footer/Footer'

import api from '../../services/api';


// import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";



export default class PerfilComprador extends Component{

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],
            // listaTelefone:[],

        }
    }
    // getUsuario = () => {
    //     api.get('/Usuario')
    //         .then(response => {
    //             if (response.status === 200) {
    //                 this.setState({ listaUsuario: response.data })
    //             }
    //             console.log(response)
    //         })
    // }

    componentDidMount() {
        this.getUsuarioId();
        // this.getTelefone();
        // console.log(parseJwt().IdUsuario)

        console.log(this.state.listaUsuario)
     }

    getUsuarioId = () => {
        
        let idUser = parseJwt().IdUsuario
        console.log(idUser)
        api.get('/Usuario/' + idUser)
        .then(response => {
            if (response.status === 200) 
            this.setState({ listaUsuario: [response.data] })
            console.log(this.state.listaUsuario)
    
            })
    }

    // getTelefone = () => {
    //     // let idUser = parseJwt().IdUsuario
    //     // console.log(idUser)

    //     api.get('/Telefone')
    //         .then(response => {
    //             if (response.status === 200) 
    //             this.setState({ listaTelefone: [response.data] })
    //         })
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
                                {
                                    this.state.listaUsuario.map(
                                        function(u){
                                            return(
                                            <>
                                                <p><span class="bold-info-type">Nome: </span> {u.nome}</p>
                                                <p><span class="bold-info-type">CPF: </span>{u.cpfCnpj}</p>
                                                {/* {
                                                    this.u.telefone.map(
                                                        function(t){
                                                            return(
                                                                 <p><span class="bold-info-type">Telefone:</span> {t.telefone1}</p>
                                                            )
                                                        }.bind(this)
                                                        )
                                                }
                                                */}
                                                <p><span class="bold-info-type">E-mail: </span>{u.email}</p>
                                            </>                                   
                                            )
                                        }.bind(this)
                                    )
                                }
                            </div>
        
                            <div class="dados-localizacao-produtor">

                                <h4>Endereço</h4>
                                {
                                    this.state.listaUsuario.map(
                                        function(e){
                                            return(
                                                <>
                                <p><span class="bold-info-type">CEP:</span></p>
                                <p><span class="bold-info-type">Endereço:</span></p>
                                <p><span class="bold-info-type">Bairro:</span> Algum</p>
                                <p><span class="bold-info-type">Cidade:</span> Osasco</p> 
                                <p><span class="bold-info-type">Estado:</span> SP</p>
                                <p><span class="bold-info-type">Zona:</span> Zona Oeste</p>
                            
                            
                            </>
                            )
                        }.bind(this)
                    )
                }
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
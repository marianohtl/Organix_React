import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import { parseJwt } from "../../services/auth"

import PainelAdm from '../../components/painelAdm/PainelAdm';

import Footer from '../../components/Footer/Footer'

import api from '../../services/api';


export default class PerfilComprador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],
            listaTelefone: [],
            listaEndereco: []

        }
    }

    componentDidMount() {
        this.getUsuarioId();
        this.getTelefone();
        this.getEndereco();
    }

    getUsuarioId = () => {

        let idUser = parseJwt().IdUsuario
        console.log('id de usuario logado', idUser)
        api.get('/Usuario/' + idUser)
            .then(response => {
                if (response.status === 200)
                    this.setState({ listaUsuario: [response.data] })
                console.log(this.state.listaUsuario)

            })
    }

    getTelefone = () => {
        api.get('/Telefone')
            .then(response => {
                console.log('peguei os tel')
                if (response.status === 200)
                    this.setState({ listaTelefone: response.data })
                console.log('lista de telefone', this.state.listaTelefone)
            }
        )
    }

    getEndereco = () => {
        api.get('/Endereco')
            .then(response => {
                console.log('peguei os end')
                if (response.status === 200)
                    this.setState({ listaEndereco: response.data })
                console.log('lista de Endereco', this.state.listaEndereco)
            }
        )
    }

    render() {
        return (
            <div>
                <main class="itens-encontrados">
                    <PainelAdm />
                    <div class="lado-direito-perfil-produtor">
                        <div class="container-perfil">
                            <h2>Meus Dados</h2>
                            <div class="container-perfil2">
                                {
                                    this.state.listaUsuario.map(
                                        function (u) {
                                            return (
                                                <div class="dados-produtor">
                                                    <h4>Dados Pessoais</h4>
                                                    <>
                                                        <p><span class="bold-info-type">Nome: </span> {u.nome}</p>
                                                        <p><span class="bold-info-type">CPF: </span>{u.cpfCnpj}</p>
                                                        {
                                                            this.state.listaTelefone.map(
                                                                function (t) {
                                                                    if (t.idUsuario === u.idUsuario) {
                                                                        return (
                                                                            <p><span class="bold-info-type">Telefone: </span> {t.telefone1}</p>
                                                                        )
                                                                    }
                                                                }.bind(this)
                                                            )
                                                        }
                                                        <p><span class="bold-info-type">E-mail: </span>{u.email}</p>
                                                    </>
                                                </div>
                                            )
                                        }.bind(this)
                                    )
                                }
                                <div class="dados-localizacao-produtor">
                                    <h4>Endereço</h4>
                                    {
                                        this.state.listaUsuario.map(
                                            function (u) {
                                                return (
                                                    <>
                                                        {
                                                            this.state.listaEndereco.map(
                                                                function (e) {
                                                                    if (e.idUsuario === u.idUsuario) {
                                                                        return (
                                                                            <>
                                                                                <p><span class="bold-info-type">CEP: </span>{e.cep}</p>
                                                                                <p><span class="bold-info-type">Endereco: </span>{e.rua}</p>
                                                                                <p><span class="bold-info-type">Bairro: </span>{e.bairro}</p>
                                                                                <p><span class="bold-info-type">Cidade: </span>{e.cidade}</p>
                                                                                <p><span class="bold-info-type">Estado: </span>{e.estado}</p>
                                                                                <p><span class="bold-info-type">Zona: </span>{e.regiao}</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                }.bind(this)
                                                            )
                                                        }
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
                <Footer />
            </div>
        )

    }

}
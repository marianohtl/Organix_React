import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import api from '../../services/api';
import { parseJwt } from "../../services/auth"
import {Link} from 'react-router-dom'

import Footer from '../../components/Footer/Footer'

export default class perfilAdm extends Component {

    constructor() {
        super();
        this.state = {
            listaUsuario: [],

            //modal
            open: false

        }
    }

    componentDidMount() {
        this.getUsuarioId();
    }

    getUsuarioId = () => {
        let idUser = parseJwt().IdUsuario
        // console.log('id de usuario logado', idUser)
        api.get('/Usuario/' + idUser)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: [response.data] })
                }
            })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (fechar_modal) => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <div className="lado-direito-perfil-produtor">

                    <div className="container-perfil">
                        <div className="container-perfil2">

                            <div className="dados-produtor">
                                <h4>Painel Administrador</h4>
                                {
                                    this.state.listaUsuario.map(
                                        function (u) {
                                            return (
                                                <>
                                                    <p><span className="bold-info-type">Nome:</span>{u.nome}</p>
                                                    <p><span className="bold-info-type">E-mail:</span>{u.email}</p>
                                                </>
                                            )
                                        }.bind(this)
                                    )
                                }
                            </div>

                        </div>
                        <button type="button" className="editar-perfil" onClick={() => this.handleClickOpen()}>Listar Usuários</button>
                        <Link to='/editUsers'>Editar Usuario</Link>
                        <Link to='/newCategoria'>Cadastar categoria de Receitas</Link>
                        <Link to='/perfilAdm'>Perfil</Link>

                        <div className="lado-direito-resultado1"></div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}



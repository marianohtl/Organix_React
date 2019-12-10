import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import api from '../../services/api';

import Fechar from '../../assets/img/fechar.png'

export default class FormularioCadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ListaUsuario: [],
            ListaEndereco: [],

            postCadastro: {
                nome: "",
                cpfCnpj: "",
                email: "",
                senha: "",
                senhaConfirmacao: "",
                idTipo: this.props.user_profile
            },
            erroMsg: "",
            successMsg: "",
        }
    }
    componentDidMount() {
        this.getUsuario();
    }

    componentDidUpdate() {
        console.log(this.state.postCadastro)
        //  console.log(this.state.postEndereco)
    }

    getUsuario = () => {
        api.get('/Usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                }
                console.log(response)
            })
    }

    postSetState = (input) => {
        this.setState({
            postCadastro: {
                ...this.state.postCadastro, [input.target.name]: input.target.value
            }
        })
    }

    postCadastro = (c) => {
        // console.log(this.ListaUsuario);

        c.preventDefault();

        api.post('/Usuario', this.state.postCadastro)
            .then(response => {
                console.log(response);

            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível Cadastrar! Tente Novamente" });
            })


        setTimeout(() => {
            this.props.fechar_modal();
            { this.setState({ erroMsg: "" }) }
        }, 2000);
    }

    render() {

        const submitDisabled = this.state.postCadastro.senha !== this.state.postCadastro.senhaConfirmacao

        return (

            <div className="backdrop_form">

                <main className="main_cadastro_produtor">
                    <div className="h1_form">

                        <button onClick={this.props.fechar_modal} className="btnCloseModal_form errMsg">
                            <img src={Fechar} />
                        </button>
                        <h1>Cadastro</h1>

                    </div>
                    <div className="container-cadastro-produtor">
                        <div>
                            {this.props.user_profile}
                            <form id="cadastro_produtor" onSubmit={this.postCadastro} >
                                <div>
                                    <label>Nome Completo/Razão Social:</label>
                                    <input id="POST-nome-produtor" type="text" placeholder="Digite seu Nome Completo/Razão Social..." className="form_txt media_input_cad"
                                        name="nome"
                                        value={this.state.postCadastro.nome}
                                        onChange={this.postSetState}
                                    />

                                    <label>CPF/CNPJ:</label>
                                    <input id="POST-cpf-comprador" type="text" placeholder="Digite seu CPF..." className="form_number  media_input_cad"
                                        name="cpfCnpj"
                                        value={this.state.postCadastro.cpfCnpj}
                                        onChange={this.postSetState}
                                    ></input>

                                    <label>E-mail:</label>
                                    <input id="POST-email-produtor" type="email" placeholder="Mínimo 6 caracteres..." className="form_txt media_input_cad"
                                        name="email"
                                        value={this.state.postCadastro.email}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="form_dir">
                                    <label>Senha:</label>
                                    <input id="POST-senha-prod" type="password" placeholder="Mínimo 6 caracteres..." className="form_number media_input_cad" className={submitDisabled}
                                        name="senha"
                                        value={this.state.postCadastro.senha}
                                        onChange={this.postSetState}
                                    />

                                    <label> Confirme sua senha:</label>
                                    <input id="POST-senha-prod2" type="password" placeholder="Confirme sua senha..." className="form_number media_input_cad"
                                        name="senhaConfirmacao"
                                        value={this.state.postCadastro.senhaConfirmacao}
                                        onChange={this.postSetState}
                                    />
                                    <button className="btn media_input_cad" disabled={submitDisabled}>Cadastrar</button>
                                </div>
                            </form>
                            <div className="erroMsg">
                                
                                {submitDisabled ? (
                                    <p>As senhas devem ser iguais</p>
                                ) : null}

                                {this.state.erroMsg}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

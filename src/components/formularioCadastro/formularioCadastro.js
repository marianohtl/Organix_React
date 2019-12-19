import React, { Component } from 'react';

// import '../../assets/css/estilo.css';
import '../../assets/css/formularioCadastro.css';

import { api } from '../../services/api';

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

            postTelefone: {
                telefone1: "",
                celular: "",
                idUsuario: "",
            },

            postEndereco: {
                cep: "",
                rua: "",
                bairro: "",
                cidade: "",
                estado: "",
                regiao: "",
                idUsuario: ""
            },

            erroMsg: "",
            successMsg: "",
        }
    }
    // componentDidMount() {
    //     this.getListaUsuario();
    // }

    componentDidUpdate() {
        console.log(this.state.postCadastro)
        //  console.log(this.state.postEndereco)
    }

    postSetState = (input) => {
        this.setState({
            postCadastro: {
                ...this.state.postCadastro, [input.target.name]: input.target.value
            }
        })
    }

    postSetStateTel = (input) => {
        this.setState({
            postTelefone: {
                ...this.state.postTelefone, [input.target.name]: input.target.value
            }
        })
    }

    postSetStateEnd = (input) => {
        this.setState({
            postEndereco: {
                ...this.state.postEndereco, [input.target.name]: input.target.value
            }
        })
    }


    postCadastro = (c) => {

        c.preventDefault();

        api.post('/Usuario', this.state.postCadastro)
            .then(response => {
                this.setState({ ListaUsuario: response.data })
                console.log("Response do usuário cadastrado: ", this.state.ListaUsuario.idUsuario);

                let userTelefone = this.state.postTelefone;
                let userEndereco = this.state.postEndereco;

                userTelefone.idUsuario = response.data.idUsuario

                userEndereco.idUsuario = response.data.idUsuario

                api.post('/Telefone/', userTelefone)
                    .then(response => {

                    }).catch(error => {
                        console.log(error);
                        this.setState({ erroMsg: "Não foi possível cadastrar telefone" });
                    }
                    )

                api.post('/Endereco/', userEndereco)
                    .then(response => {
                        console.log(response);

                    }).catch(error => {
                        console.log(error);
                        this.setState({ erroMsg: "Não foi possível cadastrar Endereço" });
                    }
                    )

            }).catch(error => {
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
                <div className="formCadastro">
                    <div className="h1_form">
                        <button onClick={this.props.fechar_modal} className="btnCloseModal_form errMsg">
                            <img src={Fechar} alt="icone de fechar modal" />
                        </button>
                    </div>

                    <form id="cadastro_produtor" onSubmit={this.postCadastro}>
                        <h2>Dados Pessoais</h2>
                        <div className="container">
                            <div className="dadosPessoais">
                                <div className="dadosPessoais1">
                                    <label className="labelForm">Nome Completo/Razão Social:</label>
                                    <input id="POST-nome-produtor" type="text" className="inputForm"
                                        name="nome"
                                        value={this.state.postCadastro.nome}
                                        onChange={this.postSetState}
                                    />

                                    <label className="labelForm">E-mail:</label>
                                    <input id="POST-email-produtor" type="email"  className="inputForm"
                                        name="email"
                                        value={this.state.postCadastro.email}
                                        onChange={this.postSetState}
                                    />

                                    <label className="labelForm">Telefone:</label>
                                    <input id="POST-tel-prod" className="inputForm" 
                                        name="telefone1"
                                        value={this.state.postTelefone.telefone1}
                                        onChange={this.postSetStateTel}
                                    />

                                    <label className="labelForm">Celular:</label>
                                    <input id="POST-cel-prod" className="inputForm" 
                                        name="celular"
                                        value={this.state.postTelefone.celular}
                                        onChange={this.postSetStateTel}
                                    />
                                </div>

                                <div className="dadosPessoais1">
                                    <label className="labelForm">CPF/CNPJ:</label>
                                    <input id="POST-cpf-comprador" type="text" className="inputForm"
                                        name="cpfCnpj"
                                        value={this.state.postCadastro.cpfCnpj}
                                        onChange={this.postSetState}
                                    />

                                    <label className="labelForm">Senha:</label>
                                    <input id="POST-senha-prod" type="password"  className="inputForm"
                                        name="senha"
                                        value={this.state.postCadastro.senha}
                                        onChange={this.postSetState}
                                    />

                                    <label className="labelForm"> Confirme a senha:</label>
                                    <input id="POST-senha-prod2" type="password" className="inputForm"
                                        name="senhaConfirmacao"
                                        value={this.state.postCadastro.senhaConfirmacao}
                                        onChange={this.postSetState}
                                    />
                                </div>
                            </div>
                            <hr></hr>
                            <h2>Endereço</h2>

                            <div className="endereco">
                                <div className="endereco1">
                                    <label className="labelForm">CEP:</label>
                                    <input id="POST-cep-prod2" className="inputForm" 
                                        name="cep"
                                        value={this.state.postEndereco.cep}
                                        onChange={this.postSetStateEnd}
                                    />

                                    <label className="labelForm">Endereço:</label>
                                    <input id="POST-endereco-prod2" className="inputForm" 
                                        name="rua"
                                        value={this.state.postEndereco.rua}
                                        onChange={this.postSetStateEnd}
                                    />

                                    <label className="labelForm">Bairro:</label>
                                    <input id="POST-bairro-prod2" className="inputForm" 
                                        name="bairro"
                                        value={this.state.postCadastro.bairro}
                                        onChange={this.postSetStateEnd}
                                    />
                                </div>
                                <div className="endereco1">
                                    <label className="labelForm">Cidade:</label>
                                    <input id="POST-cidade-prod2" className="inputForm" 
                                        name="cidade"
                                        value={this.state.postEndereco.cidade}
                                        onChange={this.postSetStateEnd}
                                    />

                                    <label className="labelForm">Estado:</label>
                                    <input id="POST-estado-prod2" className="inputForm" 
                                        name="estado"
                                        value={this.state.postEndereco.estado}
                                        onChange={this.postSetStateEnd}
                                    />

                                    <label className="labelForm">Região:</label>
                                    <input id="POST-regiao-prod2" className="inputForm" 
                                        name="regiao"
                                        value={this.state.postEndereco.regiao}
                                        onChange={this.postSetStateEnd}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="erroMsg">

                            {submitDisabled ? (
                                <p>As senhas devem ser iguais</p>
                            ) : null}

                            {this.state.erroMsg}
                        </div>
                        <p><button className="submitBtn btnResposivo" disabled={submitDisabled}>Cadastrar</button></p>
                    </form>

                </div>
            </div>
        )
    }
}

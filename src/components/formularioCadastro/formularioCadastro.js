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
                idTipo: this.props.user_profile
            },
            // postEndereco: {
            //     idUsuario: "",
            //     endereco:"",
            //     cep:"",
            //     bairro:"",
            //     cidade: "",
            //     estado: "",
            //     regiao:"",
            // },

            erroMsg: "",
            successMsg: "",

            // hideModal: this.props.fechar_modal
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

    //#region SetSTate
    // postEnderecoSetState =(input) =>{
    //     this.setState({
    //         postEndereco : {
    //             ...this.state.postEndereco, [input.target.name] : input.target.value
    //         }
    //     })
    // }

    postSetState = (input) => {
        this.setState({
            postCadastro: {
                ...this.state.postCadastro, [input.target.name]: input.target.value
            }
        })
    }

    hideModal = () => {
        this.setState({ showModal: false })
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
                this.setState({ erroMsg: "Não foi possível Cadastrar!Tente Novamente" });
            })

        setTimeout(() => {
            // this.FormularioCadastro();
        }, 1500);

        this.props.fechar_modal();
    }

    render() {
        return (
            <div className="backdrop_form">
                <main className="main_cadastro_produtor">
                    <div className="h1_form">
                        {/* <a href="index.html"><img src="imagens/Ativo 1.png" alt="logo organix"></a> */}
                    <button onClick={this.props.fechar_modal} className="btnCloseModal_form">
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
                                    <input id="POST-senha-prod" placeholder="Mínimo 6 caracteres..." className="form_number media_input_cad"
                                        name="senha"
                                        value={this.state.postCadastro.senha}
                                        onChange={this.postSetState}
                                    />

                                    <label> Confirme sua senha:</label>
                                    <input id="POST-senha-prod2" placeholder="Confirme sua senha..." className="form_number media_input_cad"
                                        name="senha"
                                        value={this.state.postCadastro.senha}
                                        onChange={this.postSetState}
                                    />


                                    {/* <div className="form_dir">
                                <label>CEP:</label>
                                <input id="POST-cep-produtor" type="text" placeholder="Digite seu CEP..."  className="form_number media_input_cad"
                                    name="cep"
                                    value={this.state.postEndereco.cep}
                                    onChange={this.postEnderecoSetState}
                                />
                                
                                <label>Endereço:</label>
                                <input id="POST-endereco-produtor" type="text" placeholder="Digite seu Endereço..." className="form_txt media_input_cad" 
                                    name="endereco"
                                    value={this.state.postEndereco.endereco}
                                    onChange={this.postEnderecoSetState}
                                />

                                <label>Bairro:</label>
                                <input id="POST-bairro-produtor" type="text" placeholder="Digite seu Bairro..." className="form_txt media_input_cad" 
                                    name="bairro"
                                    value={this.state.postEndereco.bairro}
                                    onChange={this.postEnderecoSetState}
                                />

                                <label>Cidade:</label>
                                <input id="POST-cidade-produtor" type="text" placeholder="Digite sua Cidade..." className="form_txt_cidade media_input_cad"
                                    name="cidade"
                                    value={this.state.postEndereco.cidade}
                                    onChange={this.postEnderecoSetState}
                                />

                                <label>Estado:</label>
                                <select id="POST-regiao-produtor" className="form_lista media_input_cad"
                                     name="estado"
                                     value={this.state.postEndereco.estado}
                                     onChange={this.postEnderecoSetState}
                                >
                                    <option value="estado">Selecione o Estado</option>
                                    <option value="Sao Paulo">São Paulo</option>
                                </select>

                                <label>Região:</label>
                                <select  id="POST-estado-produtor" className="form_lista media_input_cad"
                                    name="regiao"
                                    value={this.state.postEndereco.endereco}
                                    onChange={this.postEnderecoSetState}
                                >
                                    <option value="zl">Zona Leste</option>
                                    <option value="zn">Zona Norte</option>
                                    <option value="zo">Zona Oeste</option>
                                    <option value="zs">Zona Sul</option>
                                </select>
                            </div> */}
                                    {this.state.erroMsg}
                        
                                    <button className="btn media_input_cad" type="submit">Cadastrar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

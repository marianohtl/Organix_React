import React, { Component } from 'react';
import { api, apiFormData } from "../../services/api"
import { parseJwt } from "../../services/auth"
import "../../assets/css/receita.css"
import "../../assets/css/estilo.css"
import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveComprador from "../../components/responsive/ResponsiveComprador"
import Footer from '../../components/Footer/Footer'

import icon from "../../assets/img/photoIcon.svg"

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import  "../../assets/css/receita.css";

export default class CadastrarReceitas extends Component {

    constructor() {
        super()
        this.state = {
            listaCategorias: [],
            postReceita: {
                idUsuario: "",
                nomeReceita: "",
                ingredientes: "",
                tempoPreparo: "",
                porcoes: "",
                modoPreparo: "",
                idCategoriaReceita: "",
                nomeCategoria: ""
            },

            getCategoria: {
                idCategoriaReceitaNavigation: "",

            },
            fileInput: React.createRef(),
            msgErro: ""
        }
    };


    refreshPage() {
        window.location.reload(true);
    }

    getCategorias = () => {
        api.get('/CategoriaReceita')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategorias: response.data })
                }
            })
    }

    postSetState = (input) => {
        this.setState({
            postReceita: {
                ...this.state.postReceita, [input.target.name]: input.target.value
            }
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.getCategorias();
        }, 1000);
    }


    postReceita = (r) => {
        r.preventDefault();

        let receita = new FormData();

        let id = parseJwt().IdUsuario
        console.log(id)

        receita.set("idUsuario", id);
        receita.set("nomeReceita", this.state.postReceita.nomeReceita);
        receita.set("ingredientes", this.state.postReceita.ingredientes);
        receita.set("modoPreparo", this.state.postReceita.modoPreparo);
        receita.set("porcoes", this.state.postReceita.porcoes);
        receita.set("tempoPreparo", this.state.postReceita.tempoPreparo);
        receita.set("idCategoriaReceita", this.state.postReceita.idCategoriaReceita);
        receita.set("imagem", this.state.fileInput.current.files[0]);

        apiFormData.post('/Receita', receita)
            .then(response => {
                console.log(response);
                console.log(this.postReceita)
                this.refreshPage();
            })
            .catch(erro => {
                console.log(erro);
                this.setState({ msgErro: "Não foi possível cadastrar a receita!" })
            })
    }

    handleImageChange = (r) => {
        this.setState({
            fileInput: r.target.files[0]
        })
    };


    render() {
        return (
            <>
                <ResponsiveComprador />
                <HeaderPerfil />
                <main className="itens-encontrados-cadastro">
                    <div className="esquerdo_perfil">
                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">


                            <h2>Cadastrar Receitas</h2>


                            <div className="container-cards1">
                                <form action="#" id="form-cadastrar-produto" method="POST" onSubmit={this.postReceita}>
                                    {/* <div className="fileira-um">
                                    <div className="cadastro-receitas-correcao-input"> */}
                                    <label className="lbl-form-cad-prod" htmlFor="POST-tempo-receita">Nome da Receita: </label>
                                    <input
                                        id="cad-preco"
                                        type="text"
                                        placeholder="Digite o nome da receita"
                                        className="nomereceita" name="nomeReceita" value={this.state.postReceita.nomeReceita} onChange={this.postSetState} />
                                    {/* </div> */}
                                    {/* <div className="cadastro-receitas-correcao-input"> */}
                                    <label className="lbl-form-cad-prod" htmlFor="POST-tempo-receita">Porções: </label>
                                    <input type="number"
                                        placeholder="Insira a quantidade de porções"
                                        id="cad-preco"
                                        name="porcoes" className="porcoesreceita" value={this.state.postReceita.porcoes} onChange={this.postSetState} />
                                    {/* </div> */}
                                    {/* <div className="cadastro-receitas-correcao-input" id="temprep"> */}
                                    <label className="lbl-form-cad-prod" htmlFor="POST-tempo-receita">Tempo de Preparo: </label>
                                    <input type="text"
                                        placeholder="Informe o tempo de preparo"
                                        id="cad-preco"
                                        className="tempopreparo" name="tempoPreparo" value={this.state.postReceita.tempoPreparo} onChange={this.postSetState} />
                                    {/* </div> */}
                                    {/* </div> */}

                                    {/* <div className="fileira-dois"> */}
                                    <label
                                        className="lbl-form-cad-prod"
                                        htmlFor="POST-tempo-receita">Ingredientes:</label>
                                    <input
                                        id="cad-preco"
                                        placeholder="Informe os ingredientes"
                                        type="text"
                                        name="ingredientes"
                                        value={this.state.postReceita.ingredientes}
                                        onChange={this.postSetState} />
                                    {/* </div> */}

                                    {/* <div className="fileira-dois"> */}
                                    <label className="lbl-form-cad-prod" htmlFor="POST-tempo-receita">Modo de Preparo:
                                    </label>
                                    <input id="cad-preco"
                                        placeholder="Descreva o modo de preparo"
                                        type="text" name="modoPreparo" value={this.state.postReceita.modoPreparo} onChange={this.postSetState} />
                                    {/* </div> */}
                                    <label className="lbl-form-cad-prod" htmlFor="nome-prod">Categoria:</label>

                                    <select
                                        id="cad-preco"
                                        name="idCategoriaReceita"
                                        value={this.state.getCategoria.idCategoriaReceita}
                                        onChange={this.postSetState}
                                    >
                                        <option value="">Escolha uma categoria: </option>
                                        {
                                            this.state.listaCategorias.map(function (c) {
                                                return (
                                                    <option
                                                        key={c.idCategoriaReceita}
                                                        value={c.idCategoriaReceita}
                                                    >
                                                        {c.nomeCategoria}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label className="lbl-form-cad-prod" htmlFor="dt-venc-prod">Imagem</label>
                                    <div className="btn-b">
                                        <input type="file" className="inputfile"
                                            id="file"
                                            ref={this.state.fileInput} /><label for="file" >
                                            <img src={icon} className="iconCadastrar" />
                                            Escolha um arquivo
                                    </label>
                                    </div>

                                    <div className="btn-b">
                                        <button
                                            className="btn-cadastrar"
                                            type="submit">Enviar
                                </button>
                                    </div>

                                </form>
                            </div>


                            <div className="lado-direito-resultado1"></div>
                        </div>

                        {/* <div className="fileira-dois">
                            <label for="POST-tempo-receita">Modo de Preparo:</label>
                            <input id="input-receita-preparo" type="text" name="modoPreparo" onChange={this.postSetState} />
                        </div> */}


                    </div>
                </main>
                <Footer />

            </>

        )
    }


}

import React, { Component } from "react"
import "../../assets/css/estilo.css"
import { api } from "../../services/api"
import { parseJwt } from "../../services/auth"


import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveProdutor from "../../components/responsive/ResponsiveProdutor"
import Footer from '../../components/Footer/Footer'


export default class CadastrarProdutos extends Component {

    constructor() {
        super()
        this.state = {

            listaProdutos: [],

            postProduto: {
                idProduto: 0,
                estadoProduto: "",
                preco: "",
                dataFabricacao: "",
                dataVencimento: "",
                idUsuario: "",
                // regiao: ""
            },
            errorMsg: "",
            successMsg: ""
        }

    }
    componentDidMount() {
        this.getProdutos()
    }

    componentDidUpdate(){
        console.log(this.state.postProduto.idProduto)
    }

    getProdutos = () => {
        api.get("/Produto")
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                    console.log(this.state.listaProdutos)
                }
            })
    }

    postSetState = (input) => {
        this.setState({
            postProduto: {
                ...this.state.postProduto, [input.target.name]: input.target.value

                // Isto \/ é a mesma coisa que isto /\

                // ...this.state.postProduto, idProduto : input.target.value
            }
        })
    }

    postProduto = (p) => {
        p.preventDefault();

        let produto = {
            idProduto: this.state.postProduto.idProduto,
            estadoProduto: this.state.postProduto.estadoProduto,
            preco: this.state.postProduto.preco,
            dataFabricacao: this.state.postProduto.dataFabricacao,
            dataVencimento: this.state.postProduto.dataVencimento,
            // regiao: this.state.postProduto.regiao,
            idUsuario: parseJwt().IdUsuario
        }

        api.post("/Oferta", produto)
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push("/ProdutosCadastrados")
                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({ errorMsg: "Não foi possivel cadastrar o Produto." })
            })

        setTimeout(() => {
            this.getProdutos();
            console.log(produto);
        }, 1500)
    }

    render() {
        return (
            <>
                <ResponsiveProdutor />
                <HeaderPerfil />
                <main className="itens-encontrados">
                    <div className="esquerdo_perfil">

                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">

                            <h2>Cadastrar Produtos</h2>

                            <div className="container-cards1">
                                <form onSubmit={this.postProduto} id="form-cadastrar-produto" method="POST">
                                    {/* {
                                        this.state.listaProdutos.map(
                                            function(p){
                                                return(
                                                    <p>teste</p>
                                                )
                                            }
                                        )
                                    } */}
                                    <label className="lbl-form-cad-prod" htmlFor="nome-prod">Produto:</label>
                                    <select
                                        name="idProduto"
                                        id="cad-preco"
                                        value={this.state.postProduto.idProduto}
                                        onChange={this.postSetState}
                                    >
                                        <option value="0">Selecione um produto</option>
                                        {
                                            this.state.listaProdutos.map(function (p) {
                                                return (
                                                    <option
                                                        key={p.idProduto}
                                                        value={p.idProduto}
                                                    >
                                                        {p.nomeProduto}
                                                    </option>


                                                )
                                            })
                                        }
                                        {/* // <option value="arroz">Arroz</option>
                                // <option value="feijao">Feijão</option>
                                // <option value="carne">Carne</option>
                                // <option value="ovo">Ovo</option> */}
                                    </select>
                                    <label className="lbl-form-cad-prod" htmlFor="estado-prod">Estado do Produto</label>
                                    <select
                                        name="estadoProduto"
                                        id="cad-preco"
                                        value={this.state.postProduto.estadoProduto}
                                        onChange={this.postSetState}
                                    >
                                        <option value="0">Selecione o estado do produto</option>
                                        <option value="Pronto para consumo">Pronto para consumo</option>
                                        <option value="Maduro">Maduro</option>
                                        <option value="Perto do Vencimento">Perto do Vencimento</option>
                                        {/* <option value="Ruim">Ruim</option> */}
                                    </select>
                                    {/* <label className="lbl-form-cad-prod" htmlFor="regiao">Região</label>
                                    <select
                                        name="regiao"
                                        id="cad-preco"
                                        value={this.state.postProduto.regiao}
                                        onChange={this.postSetState}
                                    >
                                        <option value="Norte">Norte</option>
                                        <option value="Sul">Sul</option>
                                        <option value="Leste">Leste</option>
                                        <option value="Oeste">Oeste</option>
                                    </select> */}
                                    <label className="lbl-form-cad-prod" htmlFor="cad-preco">Preço</label>
                                    <input
                                        id="cad-preco"
                                        type="currency"
                                        placeholder="Digite um valor..."
                                        name="preco"
                                        value={this.state.postProduto.preco}
                                        onChange={this.postSetState}
                                    />

                                    <label className="lbl-form-cad-prod" htmlFor="dt-fab-prod">Data de Fabricação</label>
                                    <input
                                        className="inp-date"
                                        id="dt-fab-prod"
                                        type="date"
                                        name="dataFabricacao"
                                        value={this.state.postProduto.dataFabricacao}
                                        onChange={this.postSetState}
                                    />

                                    <label className="lbl-form-cad-prod" htmlFor="dt-venc-prod">Data de Vencimento</label>
                                    <input
                                        className="inp-date"
                                        id="dt-venc-prod"
                                        type="date"
                                        name="dataVencimento"
                                        value={this.state.postProduto.dataVencimento}
                                        onChange={this.postSetState}
                                    />
                                    <div className="btn-b">
                                        <button className="btn-cadastrar" type="submit">Cadastrar</button>
                                    </div>
                                    {/* } */}
                                </form>

                            </div>
                            <div className="lado-direito-resultado1"></div>
                        </div>

                    </div>
                </main>
                <Footer/>

            </>
        )
    }
}

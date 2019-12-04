import React, { Component } from "react"
import "../../assets/css/estilo.css"
import { api } from "../../services/api"
import { parseJwt } from "../../services/auth"

export default class CadastrarProdutos extends Component {

    constructor() {
        super()
        this.state = {

            listaProdutos: [],

            postProduto: {
                idProduto: "",
                estadoProduto: "",
                preco: "",
                dataFabricacao: "",
                dataVencimento: "",
                idUsuario: "",
            },
            errorMsg: "",
            successMsg: ""
        }

    }
    componentDidMount() {
        this.getProdutos()
        console.log(this.state.listaProdutos)
    }

    getProdutos = () => {
        api.get("/Produto")
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }

    postSetState = (input) => {
        this.setState({
            postProduto: {
                ...this.state.postProduto, [input.target.name]: input.target.value
            }
        })
    }

    postProduto = (p) => {
        p.preventDefault();




        let produto = {
            idProduto: this.state.idProduto,
            estadoProduto: this.state.estadoProduto,
            preco: this.state.preco,
            dataFabricacao: this.state.dataFabricacao,
            dataVencimento: this.state.dataVencimento,
            idUsuario: parseJwt().IdUsuario
        }

        api.post("/Oferta", produto)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({ errorMsg: "Não foi possivel cadastrar o Produto." })
            })

        setTimeout(() => {
            this.getProdutos();
        }, 1500)
    }

    render() {
        return (
            <>
                <main class="itens-encontrados">
                    <div class="esquerdo_perfil">
                        <a href="ïndex.html"><img src="imagens/Perfil/Agrupar 91.png" alt="avatar do produtor" /></a>
                        <div class="menu_perfil">
                            <h2>José Carlos</h2>
                            <p><a href="perfil_produtor.html">Perfil</a></p>
                            <p><a href="produtos_cadastrados.html">Produtos Cadastrados</a></p>
                            <p><a href="cadastro_produto.html">Cadastrar Produtos</a></p>
                            <p><a href="index.html#dicas">Dicas</a></p>
                        </div>
                    </div>
                    <div class="lado-direito-resultado">
                        <div class="container-perfil">

                            <h2>Cadastrar Produtos</h2>

                            <div class="container-cards1">
                                <form onSubmit={this.postProduto} id="form-cadastrar-produto" method="POST">
                                    {/* {
                            this.state.listaProdutos.map(
                                function(p){
                                    return(

                                    )
                                }
                            ) */}
                                    <label class="lbl-form-cad-prod" for="nome-prod">Produto:</label>
                                    <select
                                        name="nome-prod"
                                        id="cad-preco"
                                        value={this.state.postProduto.idProduto}
                                        onChange={this.postSetState}
                                    >
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
                                    <label class="lbl-form-cad-prod" for="estado-prod">Estado do Produto:</label>
                                    <select
                                        name="estadoProduto"
                                        id="cad-preco"
                                        value={this.state.postProduto.estadoProduto}
                                        onChange={this.postSetState}
                                    >
                                        <option value="Ótimo">Ótimo</option>
                                        <option value="Bom">Bom</option>
                                        <option value="Razoável">Razoável</option>
                                        <option value="Ruim">Ruim</option>
                                    </select>
                                    <label class="lbl-form-cad-prod" for="cad-preco">Preço:</label>
                                    <input
                                        id="cad-preco"
                                        type="currency"
                                        placeholder="Digite um valor..."
                                        name="preco"
                                        value={this.state.postProduto.preco}
                                        onChange={this.postSetState}
                                    />

                                    <label class="lbl-form-cad-prod" for="dt-fab-prod">Data de Fabricação: </label>
                                    <input
                                        class="inp-date"
                                        id="dt-fab-prod"
                                        type="date"
                                        name="dataFabricacao"
                                        value={this.state.postProduto.dataFabricacao}
                                        onChange={this.postSetState}
                                    />

                                    <label class="lbl-form-cad-prod" for="dt-venc-prod">Data de Vencimento:</label>
                                    <input
                                        class="inp-date"
                                        id="dt-venc-prod"
                                        type="date"
                                        name="dataVencimento"
                                        value={this.state.postProduto.dataVencimento}
                                        onChange={this.postSetState}
                                    />
                                    <div class="btn-b">
                                        <button class="btn-cadastrar" type="submit">Cadastrar</button>
                                    </div>
                                    {/* } */}
                                </form>

                            </div>
                            <div class="lado-direito-resultado1"></div>
                        </div>

                    </div>
                </main>
            </>
        )
    }
}

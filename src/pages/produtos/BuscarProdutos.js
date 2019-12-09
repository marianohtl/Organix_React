import React, { Component } from "react";
import { useState } from "react";
import api from '../../services/api';
import '../../assets/css/estilo.css';
import { Link } from 'react-router-dom';




export default class BuscarProdutos extends Component {


    constructor() {
        super()
        this.state = {
            listaProdutos: [],
            listaFiltro: [],

            getProdutos: {
                nomeProduto: "",
            },

            getFiltro: {
                Produto: "",
                Região: "",
                menorPreco: "",
                maiorPreco: "",
            }
        }

    }



    getProdutos = () => {
        api.get('/Produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }

    getFiltro = () => {
        api.get('/Filtro')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaFiltro: response.data })
                }
            })
    }


    componentDidMount() {
        this.getProdutos();
        this.getFiltro();
    }

    postSetState = (input) => {
        this.setState({
            postEvento: {
                ...this.state.postEvento, [input.target.name]: input.target.value
            }
        })
    }

    render() {

        return (



            <main className="itens-encontrados">

                <div className="esquerdo_perfil">
                    <img src="imagens/Perfil/Agrupar 86.png" alt="avatar do produtor" />
                    <div className="menu_perfil">
                        <h2>Renata Amaral</h2>
                        <p><Link href="perfil.html">Perfil</Link></p>
                        <p><Link href="pesquisar_produtos.html">Buscar Produtos</Link></p>
                        <p><Link href="receitas.html">Receitas</Link></p>
                        <p><Link href="cadastro_receitas.html">Cadastro de Receitas</Link></p>
                        <p><Link href="index.html">Dicas</Link></p>
                    </div>
                </div>
                <div className="lado-direito-resultado">
                    <div className="container-perfil">

                        <h2>Pesquisar Produtos</h2>

                        <div className="container-pesq-prod">
                            <form action="#" id="pesquisar-produto" method="POST" onSubmit={this.getFiltro}>
                                <label for="POST-nome-prod">Produto:
                            <select className="prodt" name="POST-produto" value={this.state.listaFiltro.Produto} onChange={this.postSetState}>
                                        {this.state.listaProdutos.map(function (a) {
                                            return (
                                                <option>{a.nomeProduto}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </label>
                                <label for="POST-regiao">Região:
                            <select className="reg" name="POST-regiao" value={this.state.listaFiltro.Região} onChange={this.postSetState}>
                                        <option value="zona-norte" value="Norte" >Norte-SP</option>
                                        <option value="zona-sul" value="Sul">Sul-SP</option>
                                        <option value="zona-leste" value="Leste">Leste-SP</option>
                                        <option value="zona-oeste" value="Oeste">Oeste-SP</option>
                                    </select>
                                </label>
                                <label for="POST-preco-min-prod">Preço Mínimo:
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="preco"
                                        placeholder="R$0,00" value={this.state.listaFiltro.menorPreco} onChange={this.postSetState} />
                                </label>
                                <label for="POST-preco-max-prod">Preço Máximo:
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="preco"
                                        placeholder="R$0,00" value={this.state.listaFiltro.maiorPreco} onChange={this.postSetState} />
                                </label>
                            </form>
                            <Link to="itens_encontrados.html" className="btn_cadastro2">Buscar</Link>
                        </div>
                        <div className="lado-direito-resultado1"></div>
                    </div>
                </div>
            </main>

        )

    }







}
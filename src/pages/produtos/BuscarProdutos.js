import React, { Component } from "react";
// import { useState } from "react";
import { api } from '../../services/api';
import '../../assets/css/estilo.css';
// import { Link } from 'react-router-dom';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveComprador from "../../components/responsive/ResponsiveComprador"
import Footer from '../../components/Footer/Footer'




export default class BuscarProdutos extends Component {




    constructor() {
        super();
        this.state = {
            listaProdutos: [],
            listaFiltro: [],

            getProdutos: {
                nomeProduto: "",
            },
            getFiltro: {
                Produto: "",
                Regiao: "",
                menorPreco: "",
                maiorPreco: "",
            },

        }

    }

    //    produtos = (produtos) =>{this.props.history.push({
    //         pathname: '/PerfilProdutor',
    //         data: this.listaFiltro,
    //         data: this.getFiltro.Produto,
    //         data: this.getFiltro.Região,
    //         data: this.getFiltro.menorPreco,
    //         data: this.getFiltro.maiorPreco, // your data array of objects
    //       })} 

    produtos = (produtos) => {
        this.setState({ produtos: this.state.listaFiltro })
    }



    getProdutos = () => {
        api.get('/Produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }


    getFiltro = (e) => {
        let filtro = this.state.getFiltro;
        api.post('/Filtro', JSON.stringify(filtro))
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ listaFiltro: response.data });
                    this.props.history.push({
                        pathname: '/ProdutosEncontrados',
                        listaFiltrada: this.state.listaFiltro,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

    }





    componentDidMount() {
        this.getProdutos();
        // this.getFiltro();
    }

    componentDidUpdate() {
        console.log(this.state.listaProdutos.idProduto);
    }


    postSetState = (input) => {
        this.setState({
            getFiltro: {
                ...this.state.getFiltro, [input.target.name]: input.target.value
            }
        })
    }

    carregaForm = (e) => {
        e.preventDefault();
        console.log(this.state.getFiltro);
        this.getFiltro();
    }


    render() {

        return (

            <>
                <ResponsiveComprador />
                <HeaderPerfil />
                <main className="itens-encontrados">
                    <div className="esquerdo_perfil">

                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">

                            <h2>Buscar Produtos</h2>

                            <div className="container-pesq-prod">
                                <form id="pesquisar-produto" onSubmit={this.carregaForm} to='/ProdutosEncontrados'>
                                    <label for="POST-nome-prod">Produto: </label>
                                    <select className="prodt" name="Produto" onChange={this.postSetState}>
                                        <option>Escolha</option>
                                        {this.state.listaProdutos.map(function (a) {
                                            return (
                                                <option value={a.idProduto}>{a.nomeProduto}</option>
                                            )
                                        })
                                        }
                                    </select>

                                    <label for="POST-regiao">Região:</label>
                                    <select className="reg" name="Regiao" value={this.state.listaFiltro.Regiao} onChange={this.postSetState}>
                                        <option>Escolha</option>
                                        <option value="Norte" >Norte</option>
                                        <option value="Sul">Sul</option>
                                        <option value="Leste">Leste</option>
                                        <option value="Oeste">Oeste</option>
                                    </select>

                                    <label for="POST-preco-min-prod">Preço Mínimo por KG:</label>
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="menorPreco"
                                        placeholder="R$0,00" defaultValue={this.state.listaFiltro.menorPreco} onChange={this.postSetState} />

                                    <label for="POST-preco-max-prod">Preço Máximo por KG:</label>
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="maiorPreco"
                                        placeholder="R$0,00" defaultValue={this.state.listaFiltro.maiorPreco} onChange={this.postSetState} />


                                    <button type="submit" className="btn_cadastro2" onClick={() => this.getFiltro(this.state.listaFiltro)}>Buscar</button>
                                </form>
                            </div>
                            <div className="lado-direito-resultado1"></div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }
}
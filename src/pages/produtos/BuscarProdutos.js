import React, { Component } from "react";
// import { useState } from "react";
import {api} from '../../services/api';
import '../../assets/css/estilo.css';
// import { Link } from 'react-router-dom';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveProdutor from "../../components/responsive/ResponsiveProdutor"
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
        console.log(this.state.listaFiltro);
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

                        <h2>Pesquisar Produtos</h2>

                        <div className="container-pesq-prod">
                            <form id="pesquisar-produto" onSubmit={this.carregaForm} to='/ProdutosEncontrados'>
                                <label for="POST-nome-prod">Produto:
                            <select className="prodt" name="Produto" onChange={this.postSetState}>
                                        {this.state.listaProdutos.map(function (a) {
                                            return (
                                                <option value={a.idProduto}>{a.nomeProduto}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </label>
                                <label for="POST-regiao">Região:
                            <select className="reg" name="Regiao" value={this.state.listaFiltro.Regiao} onChange={this.postSetState}>
                                        <option value="zona-norte" value="Norte" >Norte-SP</option>
                                        <option value="zona-sul" value="Sul">Sul-SP</option>
                                        <option value="zona-leste" value="Leste">Leste-SP</option>
                                        <option value="zona-oeste" value="Oeste">Oeste-SP</option>
                                    </select>
                                </label>
                                <label for="POST-preco-min-prod">Preço Mínimo:
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="menorPreco"
                                        placeholder="R$0,00" defaultValue={this.state.listaFiltro.menorPreco} onChange={this.postSetState} />
                                </label>
                                <label for="POST-preco-max-prod">Preço Máximo:
                                    <input className="input_produto_list" id="POST-preco-prod" type="text" name="maiorPreco"
                                        placeholder="R$0,00" defaultValue={this.state.listaFiltro.maiorPreco} onChange={this.postSetState} />
                                </label>
                              
                                <button type="submit" className="btn_cadastro2" onClick={() => this.getFiltro(this.state.listaFiltro)}>Buscar</button>
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
import React, { Component } from "react";

import api from '../../services/api';
import '../../assets/css/estilo.css';
import { Link } from 'react-router-dom';







export default class ProdutosEncontrados extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaOfertas: [],
            filtro: "",
            listaFiltro: [],
            filtroPropriedades: [this.props.location.filtroPropriedades],
            umaOferta: {
                idProdutoNavigation: {
                },
                idUsuarioNavigation: {
                    endereco: [
                        {

                        }
                    ]
                },
            },
        }
    }
    componentDidMount() {
        console.log("lista vinda da outra pagina", this.props.location.listaFiltrada);
        this.setState({ listaFiltro: this.props.location.listaFiltrada });
    }

    


    render() {
        return (
            <main className="itens-encontrados">

                <div className="esquerdo_perfil">
                    <img src="" alt="avatar do produtor" />
                    <div className="menu_perfil">
                        <div className="menu_perfil">
                            <h2>Renata Amaral</h2>
                            <p><a href="perfil.html">Perfil</a></p>
                            <p><a href="pesquisar_produtos.html">Buscar Produtos</a></p>
                            <p><a href="receitas.html">Receitas</a></p>
                            <p><a href="cadastro_receitas.html">Cadastro de Receitas</a></p>
                            <p><a href="index.html">Dicas</a></p>
                        </div>
                    </div>
                </div>
                <div className="lado-direito-resultado">
                    <div className="container-perfil">
                        <h2>Produtos Encontrados</h2>
                        <div className="container-cards">
                            {
                                this.state.listaFiltro.map(
                                    function (a) {
                                        return (
                                            <div className="card-produto">
                                                <div className="imagem-redonda-card-produto"> <img src="" alt="" /></div>
                                                <p className='nome-produto'>{a.nome_produto}</p>
                                                <ul>
                                                    <li>Preço: {a.preco}</li>
                                                    <li>Região: {a.regiao}</li>
                                                    <li>Produtor: Rogério do Sertão</li>
                                                </ul>
                                                <button type="button" className="btn_padrao">Negociar</button>
                                            </div>
                                        )
                                    }
                                )
                            }

                        </div>


                        <div className="lado-direito-resultado1"></div>
                    </div>
                </div>
            </main>
        )
    }
}




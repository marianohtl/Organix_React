
import { parseJwt, usuarioAutenticado } from "../../services/auth"

import React, { Component } from "react"
import { api } from "../../services/api"

import Qiyana from "../../assets/img/Perfil/comprador.png"
import Fizz from "../../assets/img/Perfil/Agrupar 91.png"
import Orianna from "../../assets/img/token_3.png"


export default class HeaderPerfilFull extends Component {

    constructor() {
        super()
        this.state = {
            usuario: {},
        }
    }
    componentDidMount() {
        this.getNome()
    }

    getNome = () => {
        let id = parseJwt().IdUsuario
        api.get("/usuario/" + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ usuario: response.data })
                    console.log("user: ", this.state.usuario.nome)
                }
            })
    }


    render() {
        return (
            <>


                <div className="admPainel">
                    {
                        usuarioAutenticado() && parseJwt().Role === "1" ?
                            (
                                <>
                                    <img src={Qiyana} alt="avatar do comprador" />
                                    <h2>{this.state.usuario.nome}</h2>
                                    <p><a href="#/PerfilComprador">Perfil</a></p>
                                    <p><a href="#/BuscarProdutos">Buscar Produtos</a></p>
                                    <p><a href="#/todasreceitas">Encontrar Receitas</a></p>
                                    <p><a href="#/minhasreceitas">Minhas Receitas</a></p>
                                    <p><a href="#/CadastrarReceitas">Cadastrar Receitas</a></p>
                                </>
                            ) : (
                                usuarioAutenticado() && parseJwt().Role === "2" ?
                                    (
                                        <>
                                            <img src={Fizz} alt="avatar do produtor" />
                                            <h2>{this.state.usuario.nome}</h2>
                                            <p><a href="#/PerfilProdutor">Perfil</a></p>
                                            <p><a href="#/ProdutosCadastrados">Produtos Cadastrados</a></p>
                                            <p><a href="#/CadastrarProdutos">Cadastrar Produtos</a></p>
                                            <p><a href="#/MinhasOfertas">Minhas Ofertas</a></p>
                                        </>
                                    ) : (
                                        usuarioAutenticado() && parseJwt().Role === "3" ?
                                            (
                                                <>
                                                    <img src={Orianna} alt="avatar do Admin" />
                                                    <h2>{this.state.usuario.nome}</h2>
                                                    <p><a href="#/PerfilAdm">Perfil</a></p>
                                                    <p><a href="#/EditUsers">Editar Usuario</a></p>
                                                    <p><a href="#/CadastrarCategoria">Cadastrar Produtos</a></p>
                                                    <p><a href="#/AlterarCategoria">Alterar Produtos Cadastrados</a></p>
                                                    <p><a href="#/NewCategoria">Cadastrar Categoria de Receita</a></p>
                                                    {/* <p><a href="produtos_cadastrados.html">Produtos Cadastrados</a></p>
                                                <p><a href="cadastro_produto.html">Cadastrar Produtos</a></p>
                                                <p><a href="index.html#dicas">Dicas</a></p> */}
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                    ))}
                </div>
            </>
        )
    }
}


import { parseJwt, usuarioAutenticado } from "../../services/auth"

import React, { Component } from "react"
import { api } from "../../services/api"


export default class HeaderPerfilFull extends Component {
    
    constructor(){
        super()
        this.state = {
            usuario:{},
        }
    }
    componentDidMount(){
        this.getNome()
    }

    getNome = () =>{
        let id = parseJwt().IdUsuario
        api.get("/usuario/"+id)
        .then(response => {
            if(response.status === 200){
                this.setState({usuario: response.data})
                console.log("user: ",this.state.usuario.nome)
            }
        })
    }
    
    
    render() {
        return (
            <>
         
            <h2>{this.state.usuario.nome}</h2>
            <div>
            {
                    usuarioAutenticado() && parseJwt().Role === "1" ?
                        (
                            <>
                                
                                <p><a href="#/PerfilComprador">Perfil</a></p>
                                <p><a href="#/BuscarProdutos">Buscar Produtos</a></p>
                                <p><a href="#/todasreceitas">Receitas</a></p>
                                <p><a href="#/minhasreceitas">Minhas Receitas</a></p>
                                <p><a href="#/CadastroReceitas">Cadastrar Receitas</a></p>
                            </>
                        ) : (
                            usuarioAutenticado() && parseJwt().Role === "2" ?
                                (
                                    <>
                                        <p><a href="#/PerfilProdutor">Perfil</a></p>
                                        <p><a href="#/ProdutosCadastrados">Produtos Cadastrados</a></p>
                                        <p><a href="#/CadastrarProdutos">Cadastrar Produtos</a></p>
                                    </>
                                ) : (
                                    usuarioAutenticado() && parseJwt().Role === "3" ?
                                        (
                                            <>
                                                <p><a href="#/PerfilProdutor">Perfil</a></p>
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

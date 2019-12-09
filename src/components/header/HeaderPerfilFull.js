
import { parseJwt, usuarioAutenticado } from "../../services/auth"

import React, { Component } from "react"


export default class HeaderPerfilFull extends Component {
    render() {
        return (
            <div>


                {
                    usuarioAutenticado() && parseJwt().Role === "1" ?
                        (
                            <>
                                <p><a href="perfil.html">Perfil</a></p>
                                <p><a href="pesquisar_produtos.html">Buscar Produtos</a></p>
                                <p><a href="receitas.html">Receitas</a></p>
                                <p><a href="receitas.html">Minhas Receitas</a></p>
                                <p><a href="cadastro_receitas.html">Cadastro de Receitas</a></p>
                                <p><a href="index.html">Dicas</a></p>
                            </>
                        ) : (
                            usuarioAutenticado() && parseJwt().Role === "2" ?
                                (
                                    <>
                                        <p><a href="perfil_produtor">Perfil</a></p>
                                        <p><a href="produtos_cadastrados.html">Produtos Cadastrados</a></p>
                                        <p><a href="cadastro_produto.html">Cadastrar Produtos</a></p>
                                        <p><a href="index.html#dicas">Dicas</a></p>

                                    </>
                                ) : (
                                    usuarioAutenticado() && parseJwt().Role === "3" ?
                                        (
                                            <>
                                                <p><a href="perfil_produtor.html">Perfil</a></p>
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
        )
    }
}

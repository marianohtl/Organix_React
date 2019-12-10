import React, {Component} from 'react';
import {api,apiFormData} from "../../services/api"
import { parseJwt } from "../../services/auth"


export default class Receitas extends Component{
    constructor(){
        super()
        this.state = {
            listaCategorias : [],
            postCategoria : {
                idCategoria: "",
                nomeCategoria: "",
                imagem:""},
            getCategoria : {
                idCategoriaReceitaNavigation: "",
                
            },
            fileInput: React.createRef(),
            msgErro: ""
        }
    };
  
    refreshPage() {
        window.location.reload(true);
      }

    postSetState = (input) =>{
        this.setState({
            postReceita : {
                ...this.state.postReceita, [input.target.name] : input.target.value
            }
        })
    }

 
    postReceita = (r) => {
        r.preventDefault();

        let receita = new FormData();
        
        let id = parseJwt().IdUsuario
        console.log(id)

        receita.set("idUsuario", id );
        receita.set("nomeReceita", this.state.postReceita.nomeReceita);
        receita.set("ingredientes", this.state.postReceita.ingredientes);
        receita.set("modoPreparo", this.state.postReceita.modoPreparo);
        receita.set("porcoes", this.state.postReceita.porcoes);
        receita.set("tempoPreparo", this.state.postReceita.tempoPreparo);
        receita.set("idCategoriaReceita", this.state.postReceita.idCategoriaReceita);
        receita.set("imagem" , this.state.fileInput.current.files[0]);


        apiFormData.post('/Receita', receita)
        .then(response => {
            console.log(response);
            console.log(this.postReceita)
            this.refreshPage();
        })
        .catch(erro => {
            console.log(erro);
            this.setState({msgErro : "Não foi possível cadastrar a receita!"})
        })
        }

        handleImageChange = (r) => {
            this.setState({
                fileInput: r.target.files[0]
            })
        };
    

        render(){
            return(
                    <main className="itens-encontrados-cadastro">
                        <div className="lado-direito-resultado">
                            <div className="container-perfil">

                            <h2>Cadastro Receitas</h2>


        <div className="direita_cadastro_receita">
            <form action="#" id="cadastrar-receita" method="POST" onSubmit={}>
                    <div className="cadastro-receitas-correcao-input">
                        <label className="label_porcoes" for="POST-tempo-receita">Porções: </label>
                        <input type="number" name="porcoes" className="porcoesreceita" value={} onChange={} />
                    </div>
                    <div className="cadastro-receitas-correcao-input" id="temprep">
                        <label className="label_porcoes" for="POST-tempo-receita">Tempo de Preparo: </label>
                        <input type="text" className="tempopreparo" name="tempoPreparo" value={} onChange={}/>
                    </div>
                <div className="fileira-dois">
                    <label for="POST-tempo-receita">Ingredientes:</label>
                    <input id="input-receita-ingrediente" type="text" name="ingredientes" value={} onChange={} />
                </div>
                <div className="fileira-dois">
                    <label for="POST-tempo-receita">Modo de Preparo:</label>
                    <input id="input-receita-preparo" type="text" name="modoPreparo" value={} onChange={}  />
                </div>
                <select id="option__tiporeceita"
                            name="idCategoriaReceita"
                            className="categoria-receitas"
                            value={}
                            onChange={}>
                            <option value="">Escolha uma categoria: </option>
                            {/*{
                                this.state.listaCategorias.map(function(c){
                                    return(

                                    )
                                })
                            }*/}
                        </select>
                <input type="file" className="imagens-receita-enviar" ref={} /><label>
                </label>
                <button type="submit" className="receitas-enviar" >Enviar</button>  
            </form>
        </div>
            <div className="lado-direito-resultado1"></div>
        </div>
    </div>
</main>
            )
        }


    }
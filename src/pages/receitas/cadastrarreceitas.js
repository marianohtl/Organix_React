import React, {Component} from 'react';
import {api,apiFormData} from "../../services/api"
import { parseJwt } from "../../services/auth"





export default class CadastrarReceitas extends Component{

    constructor(){
        super()

        this.state = {
            listaCategorias : [],
            postReceita : {
                idUsuario: "",
                nomeReceita: "",
                ingredientes: "",
                tempoPreparo: "",
                porcoes: "",
                modoPreparo: "",
                idCategoriaReceita: "",
                nomeCategoria: ""
            },

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

    getCategorias = () => {
        api.get('/CategoriaReceita')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaCategorias : response.data })
            }
        })
    }

    postSetState = (input) =>{
        this.setState({
            postReceita : {
                ...this.state.postReceita, [input.target.name] : input.target.value
            }
        })
    }

    componentDidMount() {
        this.getCategorias();
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


        <div>
            <form action="#" class="cat-produto" id="cadastrar-receita" method="POST" onSubmit={this.postReceita}>
                <div className="fileira-um">
                    <div className="cadastro-receitas-correcao-input">
                        <label className="label_porcoes" for="POST-tempo-receita">Nome da Receita: </label>
                        <input type="text" className="nomereceita" name="nomeReceita" value={this.state.postReceita.nomeReceita} onChange={this.postSetState}/>
                    </div>
                    <div className="cadastro-receitas-correcao-input">
                        <label className="label_porcoes" for="POST-tempo-receita">Porções: </label>
                        <input type="number" name="porcoes" className="porcoesreceita" value={this.state.postReceita.porcoes} onChange={this.postSetState} />
                    </div>
                    <div className="cadastro-receitas-correcao-input" id="temprep">
                        <label className="label_porcoes" for="POST-tempo-receita">Tempo de Preparo: </label>
                        <input type="text" className="tempopreparo" name="tempoPreparo" value={this.state.postReceita.tempoPreparo} onChange={this.postSetState}/>
                    </div>
                </div>

                <div className="fileira-dois">
                    <label for="POST-tempo-receita">Ingredientes:</label>
                    <input id="input-receita-ingrediente" type="text" name="ingredientes" value={this.state.postReceita.ingredientes} onChange={this.postSetState} />
                </div>

                <div className="fileira-dois">
                    <label for="POST-tempo-receita">Modo de Preparo:</label>
                    <input id="input-receita-preparo" type="text" name="modoPreparo" value={this.state.postReceita.modoPreparo} onChange={this.postSetState}  />
                </div>

                <select id="option__tiporeceita"
                            name="idCategoriaReceita"
                            className="categoria-receitas"
                            value={this.state.getCategoria.idCategoriaReceita}
                            onChange={this.postSetState}
                        >
                            <option value="">Escolha uma categoria: </option>
                            {
                                this.state.listaCategorias.map(function(c){
                                    return(
                                        <option 
                                            key={c.idCategoriaReceita}
                                            value={c.idCategoriaReceita}
                                        >
                                            {c.nomeCategoria}
                                        </option>
                                    )
                                })
                            }
                        </select>
                <input type="file" className="imagens-receita-enviar" ref={this.state.fileInput} /><label>
    
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
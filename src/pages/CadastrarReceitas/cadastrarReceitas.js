import React, {Component} from 'react';
import {apiFormData} from '../../services/api';
import {api} from '../../services/api';

export default class Receitas extends Component{

    constructor(){
        super()

        this.state = {
            listaCategorias : [],
            
            postReceita : {
                idUsuario: "1",
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

        
        receita.set("idUsuario", this.state.postReceita.idUsuario);
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
                
            <>
            
                <h2>Cadastro Receitas</h2>

                <div className="direita_cadastro_receita" />
                    <form action="#" id="cadastrar-receita" method="POST" onSubmit={this.postReceita}>
                        <div className="postReceita"></div>
                            <div className="cadastro-receitas-correcao-input"/>
                                <label className="label_porcoes" for="POST-tempo-receita" >Nome da Receita: </label>
                                <input type="text" name="nomeReceita" value={this.state.postReceita.nomeReceita} onChange={this.postSetState} />
            
                            <div className="cadastro-receitas-correcao-input">
                                <label className="label_porcoes" for="POST-tempo-receita" >Porções: </label>
                                <input type="number" name="porcoes" value={this.state.postReceita.porcoes} onChange={this.postSetState} />
                                </div>
                            
                            <div className="cadastro-receitas-correcao-input" id="temprn nep">
                                <label className="label_porcoes" >Tempo de Preparo: </label>
                                <input type="text" name="tempoPreparo" value={this.state.postReceita.tempoPreparo} onChange={this.postSetState} />
                                </div>
                            
                        

                        <div className="fileira-dois">
                            <label name="ingredientes" placeholder="Digite os Ingredientes para a preparação da Receita."  >Ingredientes:</label>
                            <input id="input-receita-ingrediente" name="ingredientes" type="text" value={this.state.postReceita.ingredientes} onChange={this.postSetState} />
                            </div>

                        <div className="fileira-dois">
                            <label >Modo de Preparo:</label>
                            <input id="input-receita-preparo" type="text" name="modoPreparo" value={this.state.postReceita.modoPreparo} onChange={this.postSetState} />
                        </div>

                        <select id="option__tiporeceita"
                            name="idCategoriaReceita"
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
                      

                        <br/>

                        <button type="submit" className="receitas-enviar">Enviar</button>
                        <labe>ENVIAR IMAGEM</labe>
                        <input type="file" className="receita-foto-enviar" ref={this.state.fileInput} />Escolher Imagem
                   
                    </form>

                <div className="lado-direito-resultado1"></div>
                </>
            )
        }


    }


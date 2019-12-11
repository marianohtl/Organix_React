import React, {Component} from 'react';
import {api,apiFormData} from "../../services/api"
import { parseJwt } from "../../services/auth"

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Fab from '@material-ui/core/Fab';
 import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
 import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';


export default class CadastrarCategoria extends Component{
    constructor(){
        super()
        this.state = {
            postProduto : {
                idProduto: "",
                nomeProduto: "",
                imagem:""},
            fileInput: React.createRef(),
            msgErro: ""
        }
    };
  
    refreshPage() {
        window.location.reload(true);
      }

    
    postSetState = (input) =>{
        this.setState({
            postProduto : {
                ...this.state.postReceita, [input.target.name] : input.target.value
            }
        })
    }

 
    // postReceita = (r) => {
    //     r.preventDefault();

    //     let receita = new FormData();
        
    //     let id = parseJwt().IdUsuario
    //     console.log(id)

    //     receita.set("idUsuario", id );
    //     receita.set("nomeReceita", this.state.postReceita.nomeReceita);
    //     receita.set("ingredientes", this.state.postReceita.ingredientes);
    //     receita.set("modoPreparo", this.state.postReceita.modoPreparo);
    //     receita.set("porcoes", this.state.postReceita.porcoes);
    //     receita.set("tempoPreparo", this.state.postReceita.tempoPreparo);
    //     receita.set("idCategoriaReceita", this.state.postReceita.idCategoriaReceita);
    //     receita.set("imagem" , this.state.fileInput.current.files[0]);


    //     apiFormData.post('/Receita', receita)
    //     .then(response => {
    //         console.log(response);
    //         console.log(this.postReceita)
    //         this.refreshPage();
    //     })
    //     .catch(erro => {
    //         console.log(erro);
    //         this.setState({msgErro : "Não foi possível cadastrar a receita!"})
    //     })
    //     }

        handleImageChange = (r) => {
            this.setState({
                fileInput: r.target.files[0]
            })
        };
        componentDidMount(){
            this.getCategorias();
        }

        getCategorias = () => {
            api.get('/produto')
            .then(response => {
              if(response.status === 200){
               this.setState({listaCategorias : response.data})
               console.log(this.state.listaCategorias)
             }
            })
        }
 
           // 02 - Adicionamos um setState específico
            putSetStateFile = (input) =>{
                this.setState({
                    putReceita : {
                        ...this.state.putReceita, [input.target.name] : input.target.files[0]
                    }   
                })
            }
        render(){
            return(
                    <main className="itens-encontrados-cadastro">
                        <div className="lado-direito-resultado">
                            <div className="container-perfil">

                            <h2>Cadastro Padrão de Produtos</h2>


        <div className="direita_cadastro_receita prod-cad">
        <form action="#" id="cadastrar-receita" method="POST" class="cad-cat-produto">
                    <div className="cadastro-receitas-correcao-input">
                        <label className="label_porcoes" for="POST-tempo-receita">Nome do Produto: </label>
                        <input type="text" name="porcoes" className="porcoesreceita" />
                    </div>
                    <IconButton color="primary"  aria-label="upload picture" component="span">
                    {
                      // 06 - Aqui damos nosso "onChange" especial e também passamos nosso "ref"
                  
                      }
                      {/* */}
                      <input accept="image/*" className="input_load" id="icon-button-file" type="file" name="imagem" onChange={this.putSetStateFile} ref={this.state.putReceita.imagem}  />        <PhotoCamera />
                      </IconButton>

                      </form>
                      <div className="prop-cad-div">
                      {
                          this.state.listaCategorias.map(
                              function(cat){
                                  return(   
                                      <div className="divisao-produto">
                                      <p>
                                      {cat.nomeProduto}
                                      <Fab  color="secondary" aria-label="edit" size="small">
                                      <EditIcon/>
                                      </Fab>
                                      </p>
                                      </div>
                                      );
                                    }.bind(this)
                                    )
                                }       
                                </div>
                                </div>
                                <div className="lado-direito-resultado1"></div>
                        </div>
                    </div>
                </main>
            )
        }


    }
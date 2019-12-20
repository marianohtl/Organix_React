import React, {Component} from 'react';
import {api,apiFormData} from "../../services/api"
import { parseJwt } from "../../services/auth"
// import Fab from '@material-ui/core/Fab';
// import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import  "../../assets/css/receita.css";
import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveAdm from "../../components/responsive/ResponsiveAdm"
import Footer from '../../components/Footer/Footer'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default class CadastrarCategoria extends Component {
    constructor() {
        super()
        this.state = {
            postCategoria : {
                nomeProduto: "",
                imagem : React.createRef()
            },
                listaCategorias:[],
                msgErro: "",
                open:false
        }
    };
  
    
    refreshPage() {
        window.location.reload(true);
    }

    //#region
        openDialog(produto) {
            this.setState({ open: true });
            this.setState({putCategoria : produto})

        }

        closeDialog() {
            this.setState({ 
                open:false});
        }
    //#endregion

    postSetState = (input) =>{
        this.setState({
            postCategoria : {
                ...this.state.postCategoria, [input.target.name] : input.target.value
            }
        })
    }

    handleImageChange = (input) =>{
        this.setState({
            postCategoria : {
                ...this.state.postCategoria, [input.target.name] : input.target.files[0]
            }   
        })
        console.log(this.state.postCategoria)
    }


    PostCategoria = (r) => {

        r.preventDefault();
        console.log(this.state.postCategoria);

        let produto = new FormData();
        let id = parseJwt().IdUsuario;
        produto.set("nomeProduto", this.state.postCategoria.nomeProduto);
        produto.set("imagemArquivo" , this.state.postCategoria.imagem.current.files[0]);
        produto.set("imagem" , this.state.postCategoria.imagem.current.value);
        
        apiFormData.post('/produto/', produto)
        .then(response => {
             console.log(response)
             setTimeout(() => {
                this.getCategorias();
                this.setState({
                    postCategoria:{
                        ...this.state.postCategoria, nomeProduto : ""
                    }
                })
             }, 1000);

        })
        .catch(erro => {
             console.log(erro);
             this.setState({msgErro : "Não foi possível cadastrar a receita!"})
        })
     }


        componentDidMount(){
            setTimeout(() => {
                this.getCategorias();
             }, 1000);
        
        }

    getCategorias = () => {
        api.get('/produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategorias: response.data })
                    console.log(this.state.listaCategorias)
                }
            })
        }
 




        render(){
            return(
                <>
                <ResponsiveAdm />
                <HeaderPerfil />
                <main className="itens-encontrados">
                    <div className="esquerdo_perfil">

                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                        <div className="lado-direito-resultado">
                        <div className="container-perfil">
                        <h2>Cadastro de Produtos</h2>
                        <div className="direita_cadastro_receita prod-cad">
 
                        <form id="cadastrar-receita" class="cad-cat-produto" onSubmit={(e) => this.PostCategoria(e)}>
                            <div className="cadastro-receitas-correcao-input">
                                <label className="label_porcoes" for="nomeProduto">Nome do Produto: </label>
                                <input type="text" name="nomeProduto" className="porcoesreceita"  onChange={this.postSetState} value={this.state.postCategoria.nomeProduto} />
                            </div>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary"  aria-label="upload picture" component="span">
                                <input className="input_load" id="icon-button-file" type="file" name="imagem" />   <PhotoCamera />
                                </IconButton>
                            </label>
                            
                            <Button type="submit" color="primary" >
                            Enviar
                            </Button>                  
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

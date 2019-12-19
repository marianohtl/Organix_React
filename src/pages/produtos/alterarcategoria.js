import React, {Component} from 'react';
import {api,apiFormData} from "../../services/api"
import { parseJwt } from "../../services/auth"
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import  "../../assets/css/receita.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveAdm from "../../components/responsive/ResponsiveAdm"
import Footer from '../../components/Footer/Footer'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default class AlterarCategoria extends Component{
    constructor(){
        super()
        this.state = {
//            postCategoria : {
//                nomeProduto: "",
//                imagem : React.createRef()
//            },
            putCategoria : {
                    idProduto:"",
                    nomeProduto:"",
                    imagem: React.createRef()
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

        componentDidMount(){
            setTimeout(() => {
                this.getCategorias();
             }, 1000);
        
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

    // PUT
    putSetState = (input) =>{
        this.setState({
            putCategoria : {
                ...this.state.putCategoria, [input.target.name] : input.target.value
            }
        })
        console.log(this.state.putCategoria)
    }

    putSetStateFile = (input) =>{
        this.setState({
            putCategoria : {
                ...this.state.putCategoria, [input.target.name] : input.target.files[0]
            }
        })
        console.log(this.state.putCategoria)
    }


    putCategoria = (event) =>{
        event.preventDefault();
        console.log(this.state.putCategoria)
        let categoria_id = this.state.putCategoria.idProduto;
        
        let formData = new FormData();
        
        if (this.state.putCategoria.imagem.current !== undefined) {
            // Seta a nova imagem.
            formData.set('imagem',  this.state.putCategoria.imagem.current.files[0], this.state.putCategoria.imagem.value);
        }

        // 03 - Criamos nosso formData
        formData.set('idProduto', this.state.putCategoria.idProduto);
        formData.set('nomeProduto', this.state.putCategoria.nomeProduto);
        // formData.set('imagem',  this.state.putCategoria.imagem.current.files[0], this.state.putCategoria.imagem.value);
        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        // Veja no exemplo dado na documentação:
        // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/set
        // 05 - Não esqueçam de passar o formData
        apiFormData.put('/produto/'+categoria_id, formData)
        .then(() => {
            this.setState({successMsg : "Evento alterado com sucesso!"});
            this.closeDialog()
            setTimeout(() => {
                this.getCategorias();
             }, 1000);

        })
        .catch(error => {
            console.log(error);
            this.setState({erroMsg : "Falha ao alterar o Receita"});
        })
    }


//#region DELETE
deleteCategoria = (id) => {
    console.log(id)
    api.delete('/produto/' + id)
    .then(response => {
        if(response.status === 200){
            this.setState({ successMsg : "Excluído com sucesso" })
            this.closeDialog()
            setTimeout(() => {
                this.getCategorias();
            }, 1200);
        }
    })
    .catch(error => {
        console.log(error);
        this.setState({ erroMsg : "Falha ao excluir" })
    })
    
}
//#endregion

        render(){
            return(
                <>
                <ResponsiveAdm />
            <HeaderPerfil />
            <main className="itens-encontrados-cadastro">
            <div className="esquerdo_perfil">
                        <div className="menu_perfil">
                            <HeaderPerfilFull/>
                        </div>
                    </div>
                        <div className="lado-direito-resultado">
                        <div className="container-perfil">
                        <h2>Alteração de Produtos Cadastrados</h2>
                        <div className="direita_cadastro_receita prod-cad">
                         

                      <div className="prop-cad-div">
                      {
                          this.state.listaCategorias.map(
                              function(cat){
                                  return(   
                                      <div className="divisao-produto">
                                      <p>
                                      {cat.nomeProduto}
                                      <Fab  onClick={e => this.openDialog(cat)} color="secondary" aria-label="edit" size="small">
                                      <EditIcon/>
                                      </Fab>
                                      </p>
                                      </div>);
                                    }.bind(this)
                                )
                            }       
                                </div>
                                </div>
                                <div className="lado-direito-resultado1"></div>
                        </div>
                    </div>

        {/*MODAL EDIÇÃO*/} 
        
        <Dialog
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}>
            <DialogTitle id="alert-dialog-slide-title">
            </DialogTitle>
                <DialogContent>
                    <DialogContentText className="inputs_block" id="alert-dialog-slide-description">
                        {/*---------------------------------------------- */}
                        
                    <form onSubmit={this.putCategoria} noValidate autoComplete="off">
                            <Grid item>
                            <p>
                            Nome do Produto:
                            </p>
                            <TextField id="standard-secondary"  color="primary" name="nomeProduto" onChange={this.putSetState} value={this.state.putCategoria.nomeProduto} />
                            </Grid>    
                            <label htmlFor="icon-button-file">
                            <IconButton color="primary"  aria-label="upload picture" component="span">
                            {
                            // 06 - Aqui damos nosso "onChange" especial e também passamos nosso "ref"
                            }
                            <input accept="image/*" className="input_load" id="icon-button-file" type="file" name="imagem" onChange={this.putSetStateFile} ref={this.state.putCategoria.imagem}/> <PhotoCamera />
                            </IconButton>
                            </label>
                            <DialogActions>
                                <Button type="button" color="primary" onClick={() => this.deleteCategoria(this.state.putCategoria.idProduto)} >
                                    Excluir
                                </Button>
                                <Button type="button" color="primary" onClick={(e) => this.putCategoria(e)}  >
                                    Salvar
                                </Button>
                                <Button type="submit" color="primary"  onClick={() => this.closeDialog()} >
                                    Sair
                                </Button>
                            </DialogActions>
                        </form> 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </main>
            <Footer/>
</>
            )
        }
    }
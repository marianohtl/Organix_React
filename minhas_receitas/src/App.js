import React,{Component, Fragment }  from 'react'
//import CardReceita from '../src/components/cardReceita/CardReceita'
import {api,apiFormData} from '../src/services/api'
import TextField from '@material-ui/core/TextField';
//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { string } from 'prop-types';
import Slide from '@material-ui/core/Slide';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';


import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import  '../src/assets/css/receita.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const useStyles = makeStyles(theme => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//     input: {
//       display: 'none',
//     },
//   }));

export default class App extends Component {

    constructor(){
        super();
        this.state = {
          listaReceitas: [],
          umaReceita:[],
          idEscolhido:"",
          open:false,
          openEdit: false,
          putReceita : {
            idReceita:"",
            nomeReceita: "",
            ingredientes: "",
            tempoPreparo: "",
            porcoes: "",
            modoPreparo:"",
            idUsuario:"",
            idCategoriaReceita:"",
            // 01 - Colocamos o createRef
            imagem: React.createRef()
        },
        successMsg : "",
        erroMsg:""

        }
    }


    openDialog() {
        this.setState({ open: true });
    }

    openDialogEdit = (receita) => {
        this.setState({ 
            openEdit: true,
            umaReceita: receita,
            putReceita: receita
        });
    }

    closeDialog() {
        this.setState({ 
            open:false,
            openEdit: false });
    }

      componentDidMount(){
        this.getReceitas();
        
    }
    
    //#region GETs
     getReceitas = () => {
        api.get('/receita')
        .then(response => {
          if(response.status === 200){
            this.setState({listaReceitas : response.data})
          }
        })
      }
    
    //esta função está recebendo o id da receita que foi mapeada <<< 
    visualizarReceita = (idReceita) => {
        
        api.get('/receita/'+ idReceita)
        .then(response => {
            if(response.status === 200){
                this.setState({umaReceita : response.data})
                console.log(this.state.umaReceita)
                this.openDialog()
        }
        })
    }
    //#endregion
    
    
    //#region atualiza inputs do modal
    putSetState = (input) =>{

        this.setState({
            putReceita : {
                ...this.state.putReceita, [input.target.name] : input.target.value
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

    
    putReceita = (event) =>{
        event.preventDefault();

        let receita_id = this.state.putReceita.idReceita;
        let receita_alterada = this.state.putReceita;

        console.log(receita_id)
        console.log(receita_alterada)

        // 03 - Criamos nosso formData
        let formData = new FormData();
        formData.set('idReceita', this.state.putReceita.idReceita);
        formData.set('nomeReceita', this.state.putReceita.nomeReceita);
        formData.set('ingredientes', this.state.putReceita.ingredientes);
        formData.set('tempoPreparo', this.state.putReceita.tempoPreparo);
        formData.set('porcoes', this.state.putReceita.porcoes);
        formData.set('modoPreparo', this.state.putReceita.modoPreparo);
        formData.set('idUsuario', this.state.putReceita.idUsuario);
        formData.set('idCategoriaReceita', this.state.putReceita.idCategoriaReceita);
        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        // Veja no exemplo dado na documentação:
        // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/set
        formData.set('imagem', this.state.putReceita.imagem.current.files[0] , this.state.putReceita.imagem);

        console.log(formData);

        // 05 - Não esqueçam de passar o formData
        apiFormData.put('/receita/'+receita_id, formData)
        .then(() => {
            this.setState({successMsg : "Evento alterado com sucesso!"});
        })
        .catch(error => {
            console.log(error);
            this.setState({erroMsg : "Falha ao alterar o Receita"});
        })
        setTimeout(() => {
            this.getReceitas();
        }, 1500); 

        this.closeDialog();
        
    }

    //#endregion

    render() {
      return(
          <Fragment>
        
                <Dialog
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}>
                           <DialogTitle id="alert-dialog-slide-title">
                    {this.state.umaReceita.nomeReceita}        
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    <table> 
                    <tr>
                        <td>TEMPO DE PREPARO</td>
                        <td>PORÇÕES</td>
                    </tr>
                    <tr>
                        <td>{this.state.umaReceita.tempoPreparo}</td>
                        <td>{this.state.umaReceita.porcoes}</td>
                    </tr>
                    
                    <tr>                   
                        <td>INGREDIENTES:</td>
                    </tr>
                    <tr>
                        <td>{this.state.umaReceita.ingredientes}</td>
                    </tr>
                    <tr>                   
                        <td>MODO DE PREPARO:</td>
                    </tr>
                    <tr>                   
                        <td>{this.state.umaReceita.modoPreparo}</td>                    
                    </tr>
                    </table>  
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                <Button onClick={this.closeDialog.bind(this)}  color="primary" >
                   Excluir
                </Button>
                </DialogActions>
                </Dialog>
             
        {/*MODAL EDIÇÃO*/} 
        
        <Dialog
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        open={this.state.openEdit}
        onClose={this.handleClose}
        TransitionComponent={Transition}>
        
        <DialogTitle id="alert-dialog-slide-title">
        
        </DialogTitle>
        <DialogContent>
        <DialogContentText className="inputs_block" id="alert-dialog-slide-description">
        {/*---------------------------------------------- */}
        <form  onSubmit={this.putReceita} noValidate autoComplete="off">
        
     
        <Grid container spacing={1} direction="column" alignItems="center">        
            <Grid item>
                <TextField id="standard-secondary"  color="primary" name="nomeReceita" onChange={this.putSetState} value={this.state.putReceita.nomeReceita}/>
            </Grid>
            {/*({ target: { name, value } }) => {
                    console.log('textfield changed', name, value) } */}
            <Grid item>
                <TextField id="standard-secondary"  color="primary" name="ingredientes" onChange={this.putSetState} value={this.state.putReceita.ingredientes}/>
            </Grid>
            <Grid item>
                <TextField id="standard-secondary"  color="primary" name="tempoPreparo" onChange={this.putSetState} value={this.state.putReceita.tempoPreparo}/>
            </Grid>
            <Grid item>
                <TextField id="standard-secondary"  color="primary" name="porcoes" onChange={this.putSetState} value={this.state.putReceita.porcoes}/>
            </Grid>
            <Grid item>
                <TextField id="standard-secondary"  color="primary" name="idCategoriaReceita" onChange={this.putSetState} value={this.state.putReceita.idCategoriaReceita}/>
            </Grid>
         
            
            <label htmlFor="icon-button-file">
            <IconButton color="primary"  aria-label="upload picture" component="span">
                {
                    // 06 - Aqui damos nosso "onChange" especial e também passamos nosso "ref"
                
                }
                <input accept="image/*" className="input_load" id="icon-button-file" type="file" name="imagem" onChange={this.putSetStateFile} ref={this.state.putReceita.imagem}  />
                <PhotoCamera />
            </IconButton>
      </label>
        </Grid>
            <DialogActions>
            <Button onClick={this.closeDialog.bind(this)}  type="submit" color="primary">
                Salvar
            </Button>
            </DialogActions>
            </form> 
        </DialogContentText>
        </DialogContent>

       
        </Dialog>



      
        <main className="itens-encontrados-cadastro"> 
        
        <div className="esquerdo_perfil">
        <img src="#" alt="avatar do produtor"/>
        <div className="menu_perfil">
        <h2>Renata Amaral</h2>
        <p><a href="perfil.html">Perfil</a></p>
        <p><a href="pesquisar_produtos.html">Buscar Produtos</a></p>
        <p><a href="receitas.html">Receitas</a></p>
                <p><a href="cadastro_receitas.html">Cadastro de Receitas</a></p>
                <p><a href="index.html">Dicas</a></p>
                </div>
                </div>                
                <div className="lado-direito-resultado">
                <div className="container-perfil">
                <h2>Receitas</h2>
                <div className="container-cards">
                { 
                    this.state.listaReceitas.map(
                    function(receita){
                        return(
                            <Fragment>

                        <div className="card-produto">
                        <div className="imagem-redonda-card-receita"> </div>
                        
                        <p className='nome-produto' key={receita.idReceita}>{receita.nomeReceita}</p>
                        <ul>
                        <li>Tempo de Preparo:{receita.tempoPreparo}</li>
                        <li>Rendimento:{receita.porcoes}</li>
                        </ul>
                        <div className="uniao_bnt">
                        <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarReceita(receita.idReceita)}  >
                            Ver Receita
                        </Button>
                        <Fab color="secondary" aria-label="edit"  onClick={e => this.openDialogEdit(receita)}>
                            <EditIcon />
                        </Fab>
                        </div>
                        </div>
                        </Fragment>
                        );
                    }.bind(this)
                    )
                }   
               </div>
            <div className="lado-direito-resultado1"></div>

            </div>
           </div>
           
      </main>
        
      </Fragment>

        
          )
 
 
        }
}

import React,{Component, Fragment }  from 'react'
//import CardReceita from '../src/components/cardReceita/CardReceita'
import {api,apiFormData} from "../../services/api"

//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { string } from 'prop-types';
// import Slide from '@material-ui/core/Slide';





export default class todasReceitas extends Component {


    constructor(){
        super();
        this.state = {
          listaReceitas: [],
          umaReceita:[],
          idEscolhido:"",
          open:false, 
        }
    }

    openDialog() {
        this.setState({ open: true });
    }
    closeDialog() {
        this.setState({ open:false });
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
    

    render() {
      return(
        <Fragment>

                <Dialog
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                open={this.state.open}
                onClose={this.handleClose}>
        
                <DialogTitle id="alert-dialog-slide-title">
                    {this.state.umaReceita.nomeReceita  }        
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
                <Button onClick={this.closeDialog.bind(this)} color="primary"  >
                    FECHAR
                </Button>
                </DialogActions>
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
                        <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarReceita(receita.idReceita)}  >
                            Ver Receita
                        </Button>
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

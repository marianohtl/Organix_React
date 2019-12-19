import React,{Component, Fragment }  from 'react'
import {api} from "../../services/api"
//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { string } from 'prop-types';
// import Slide from '@material-ui/core/Slide';
import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveProdutor from "../../components/responsive/ResponsiveProdutor"
import Footer from '../../components/Footer/Footer'









export default class ProdutosCadastrados extends Component {


    constructor(){
        super();
        this.state = {
          listaOfertas: [],
          umaOferta:{
            idProdutoNavigation: {
            },
            idUsuarioNavigation: {
                endereco: [
                    {
                        
                    }
                ]
            },
          },
         
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
        this.getOferta();
    }
    
    //#region GETs
      
     getOferta = () => {
        api.get('/oferta')
        .then(response => {
          if(response.status === 200){
            this.setState({listaOfertas : response.data})
            
          }
        })
      }
    
      //esta função está recebendo o id da receita que foi mapeada <<< 
      visualizarOferta = (idOferta) => {
          
          api.get('/oferta/'+ idOferta)
          .then(response => {
              if(response.status === 200){
                  this.setState({umaOferta : response.data})
                  console.log(this.state.umaOferta)
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
                aria-describedby="alert-dialog-slide-deion"
                open={this.state.open}
                onClose={this.handleClose}>
        
                <DialogTitle id="alert-dialog-slide-title">
                    {this.state.umaOferta.idProdutoNavigation.nomeProduto}        
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-deion">
                    <table> 
                    <tr>
                        <td>Produto: {this.state.umaOferta.idProdutoNavigation.nomeProduto}</td>
                        <td>Preço: {this.state.umaOferta.preco}</td>
                    </tr>
                    <tr>
                        <td>Data de produção: {this.state.umaOferta.dataFabricacao}</td>
                        <td>Data de Validade: {this.state.umaOferta.dataVencimento}</td>
                    </tr>
                    
                    <tr>                   
                        <td>Vendedor: {this.state.umaOferta.idUsuarioNavigation.nome}</td>
                        <td>CNPJ: {this.state.umaOferta.idUsuarioNavigation.cpfCnpj}</td>
                    </tr>
                    <tr>
                    <td>Email: {this.state.umaOferta.idUsuarioNavigation.email}</td>
                    <td>Endereço: {this.state.umaOferta.idUsuarioNavigation.endereco[0].rua}, {this.state.umaOferta.idUsuarioNavigation.endereco[0].bairro} - {this.state.umaOferta.idUsuarioNavigation.endereco[0].cidade}, {this.state.umaOferta.idUsuarioNavigation.endereco[0].estado} - {this.state.umaOferta.idUsuarioNavigation.endereco[0].cep} </td>
                    </tr>
                    
                    </table>  
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                <Button onClick={this.closeDialog.bind(this)} color="primary">
                    FECHAR
                </Button>
                </DialogActions>
                </Dialog>
             
  
        <ResponsiveProdutor/>
        <HeaderPerfil/>
        <main className="itens-encontrados">
                    <div className="esquerdo_perfil">
                        <div className="menu_perfil">
                            <HeaderPerfilFull/>
                        </div>
                    </div>
                <div className="lado-direito-resultado">
                <div className="container-perfil">
                <h2>Produtos</h2>
                <div className="container-cards">
                { 
                    this.state.listaOfertas.map(
                    function(oferta){
                        return(
                            <Fragment>

                        <div className="card-produto">
                        <div className="imagem-redonda-card-receita" alt="Card de receita">
                        <img src={"http://localhost:5000/"+ oferta.idProdutoNavigation.imagem} alt="Imagem da receita"/>
                        </div>
                        
                        <p className='nome-produto' key={oferta.idProdutoNavigation.idProduto}>{oferta.idProdutoNavigation.nomeProduto}</p>
                        <ul>
                        <li>Região: {oferta.idUsuarioNavigation.endereco[0].regiao}</li>
                        <li>Estado do Produto: {oferta.estadoProduto}</li>
                        </ul>
                        <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarOferta(oferta.idOferta)}  >
                            Ver Oferta
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
      <Footer/>

      
      </Fragment>

        
          )
 
 
        }
}
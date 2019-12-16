import React, { Component, Fragment } from 'react'
//import CardReceita from '../src/components/cardReceita/CardReceita'
import { api, apiFormData } from "../../services/api"
// import TextField from '@material-ui/core/TextField';
//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveProdutor from "../../components/responsive/ResponsiveProdutor"
import Footer from '../../components/Footer/Footer'

// import Fab from '@material-ui/core/Fab';
// import EditIcon from '@material-ui/icons/Edit';
// import Grid from '@material-ui/core/Grid';



// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { parseJwt } from "../../services/auth"
import "../../assets/css/receita.css";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class MinhasOfertas extends Component {

    constructor() {
        super();
        this.state = {
            umUsuario: {
                oferta: [],
            },
            listaOfertas: [],
            listaProdutos: [],
            umaOferta: {
                idProdutoNavigation: {

                },
                idUsuarioNavigation: {

                },

            },
            idEscolhido: "",
            open: false,
            openEdit: false,
            successMsg: "",
            erroMsg: "",

        }
    }

    refreshPage() {
        window.location.reload(true);
    }

    //#region DELETE
    deleteOferta = (id) => {

        this.setState({ successMsg: "" })

        api.delete('/oferta/'+id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: "Excluído com sucesso" })

                    setTimeout(() => {
                        this.refreshPage();
                    }, 500);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir" })
            })

    }
    //#endregion
    openDialog() {
        this.setState({ open: true });
    }


    closeDialog() {
        this.setState({
            open: false,
            openEdit: false
        });
    }

    componentDidMount() {
        this.getOfertasUsuario();
        this.getOfertas();
    }

    getOfertas = () => {
        console.log("Entrando no método de getOfertas: ");
        console.log("Id do Usuario: ", parseJwt().IdUsuario);

        api.get('/oferta/idusuario/' + parseJwt().IdUsuario)
            .then(response => {
                // if (response.status === 200) {
                this.setState({ listaOfertas: response.data }, () => console.log("Lista de ofertas: ", this.state.listaOfertas));
                // }
            })
            .catch(err => console.log("Erro: ", err))
    }

    //#region GETs
    getOfertasUsuario = () => {
        let id = parseJwt().IdUsuario
        console.log(this.state.umUsuario)
        api.get('/usuario/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umUsuario: response.data })
                    console.log(this.state.umUsuario)
                }
            })
    }

    //esta função está recebendo o id da receita que foi mapeada <<< 
    visualizarOferta = (idOferta) => {
        api.get('/oferta/' + idOferta)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umaOferta: response.data })
                    console.log(this.state.umaOferta)
                    this.openDialog()
                }
            })
    }

    //#endregion PUT

    //#endregion

    render() {
        return (
            <Fragment>

                {/*MODAL INFORMAÇÕES*/}

                <Dialog
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}>
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.umaOferta.idProdutoNavigation.nomeProduto}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
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

                                </tr>
                            </table>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.closeDialog.bind(this)} color="primary" >
                            Sair
                         </Button>
                         <Button type="submit" color="primary" onClick={e => this.deleteOferta(this.state.umaOferta.idOferta)}>
                                        Excluir
                         </Button>
                    </DialogActions>
                </Dialog>

        

                {/*-----------------------PRINCIPAL----------------------*/}
                <ResponsiveProdutor />
                <HeaderPerfil />
                <main className="itens-encontrados">
                    <div className="esquerdo_perfil">

                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">
                            <h2>Produtos</h2>

                            <div className="container-cards">
                                {
                                    this.state.listaOfertas.map(
                                        function (user) {
                                            return (
                                                <Fragment>

                                                    <div className="card-produto">
                                                        <div className="imagem-redonda-card-receita">
                                                            <img src={"http://localhost:5000/" + user.idProdutoNavigation.imagem} />
                                                        </div>
                                                        <p className='nome-produto' key={user.idProdutoNavigation.idProduto}>{user.idProdutoNavigation.nomeProduto}</p>
                                                        <div className="uniao_bnt">
                                                            <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarOferta(user.idOferta)}  >
                                                                Ver Produto
                                                     </Button>

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
                <Footer/>

            </Fragment>


        )


    }
}

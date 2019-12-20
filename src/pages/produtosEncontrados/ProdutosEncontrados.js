import React, { Component } from "react";

import { api } from '../../services/api';
import '../../assets/css/estilo.css';
import { Link } from 'react-router-dom';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default class ProdutosEncontrados extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaOfertas: [],
            filtro: "",
            listaFiltro: [

            ],
            umProduto: {



                idUsuarioNavigation: {
                    nome: "",


                    telefone: [{
                        telefone1: "''",
                        celular: "''",
                    }],


                    endereco: [{
                        rua: "''",
                        bairro: "''",
                        regiao: "''",
                        cidade: "",
                    }],

                },


                //modal
                open: false,
            }
        }
    }

    componentDidMount() {
        console.log("lista vinda da outra pagina", this.props.location.listaFiltrada);
        this.setState({ listaFiltro: this.props.location.listaFiltrada });
    }



    handleClickOpen = (a) => {
        let id = a;
        api.get('/oferta/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umProduto: response.data })
                }
            })
        this.setState({ open: true });
        setTimeout(() => {
            console.log(this.state.umProduto)
        }, 1000);


    };

    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        return (
            <>
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
                        <h2>Produtos Encontrados</h2>
                        <div className="container-cards">
                            {
                                this.state.listaFiltro.map(
                                    function (a) {
                                        return (
                                            <div className="card-produto">
                                                <div className="imagem-redonda-card-produto"> <img src="" alt="" /></div>
                                                <p className='nome-produto'>{a.nome_produto}</p>
                                                <ul>
                                                <div className="imagem-redonda-card-receita"> <img src={"http://localhost:5000/" + a.imagem}
                      alt="torta de morango" /></div>
                                                    <li>Preço por KG: R${a.preco}</li>
                                                    <li>Região: {a.regiao}</li>
                                                    <li>Data de Fabricação: {a.data_fabricacao.split("T")[0]}</li>
                                                    <li>Data de Vencimento: {a.data_vencimento.split("T")[0]}</li>
                                                    {/* <li>Quantidade: 1KG</li> */}
                                                    <button onClick={e => this.handleClickOpen(a.id_oferta)}>Negociar</button>
                                                </ul>
                                            </div>
                                        )
                                    }.bind(this)
                                )
                            }
                        </div>


                        <div className="lado-direito-resultado1"></div>
                    </div>
                </div>
                <>
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        className="dialogForm"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"PRODUTOR"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">



                                <div className="card-produto">
                                    <div className="imagem-redonda-card-produto"> <img src="" alt="" /></div>
                                    <p className='nome-produto'>{this.state.umProduto.nome_produto}</p>
                                    <ul>
                                        <li>Nome: {this.state.umProduto.idUsuarioNavigation.nome}</li>
                                        <li>Telefone: {this.state.umProduto.idUsuarioNavigation.telefone[0] ? this.state.umProduto.idUsuarioNavigation.telefone[0].telefone1: ""}</li>
                                        <li>Celular: {this.state.umProduto.idUsuarioNavigation.telefone[0] ? this.state.umProduto.idUsuarioNavigation.telefone[0].celular: ""}</li>
                                        <li>Endereço: {this.state.umProduto.idUsuarioNavigation.endereco[0] ? this.state.umProduto.idUsuarioNavigation.endereco[0].rua: ""}</li>
                                        <li>Cidade: {this.state.umProduto.idUsuarioNavigation.endereco[0] ? this.state.umProduto.idUsuarioNavigation.endereco[0].cidade: ""}</li>
                                        <li>Região: {this.state.umProduto.idUsuarioNavigation.endereco[0] ? this.state.umProduto.idUsuarioNavigation.endereco[0].regiao: ""}</li>
                                    </ul>
                                </div>



                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </>
            </main>
            <Footer/>
            </>
        )
    }
}




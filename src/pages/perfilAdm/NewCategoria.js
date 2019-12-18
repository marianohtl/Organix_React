import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import '../../assets/css/perfilAdm.css';

import {api} from '../../services/api';

import Footer from '../../components/Footer/Footer'
import PerfilAdmModal from '../../components/perfilAdministrador/CategoriaReceita'

//MODAL
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import HeaderPerfil from "../../components/header/HeaderPerfil"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import ResponsiveAdm from "../../components/responsive/ResponsiveAdm"



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default class CategoriaReceita extends Component {

    constructor() {
        super();
        this.state = {
            listaCategoriaReceita: [],

            putCategoria: {
                idCategoriaReceita: "",
                nomeCategoria: ""
            },

            erroMsg: "",
            successMsg: "",

            //modal
            open: false,
            openCadastro: false
        }
    }
    //MODAL CADASTRO
    handleClickOpenCadastrar = () => {
        this.setState({ openCadastro: true });
    }

    handleCloseCadastro = (fechar_modal) => {
        this.setState({ openCadastro: false });
        this.setState({ fechar_modal: fechar_modal });
    };


    //MODAL PUT
    handleClickOpen = (u) => {
        this.setState({ open: true });
        this.setState({ putCategoria: u })

        console.log("PUT", this.state.putCategoria)

    };

    handleClose = () => {
        this.setState({ open: false });
    };


    componentDidMount() {
        this.getCategoriaReceita();
    }

    //GET
    getCategoriaReceita = () => {
        api.get('/CategoriaReceita')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaCategoriaReceita: response.data })
                }
            }
            )
    }

    //DELETE
    deleteCategoria(id) {

        this.setState({ successMsg: "" })

        api.delete('/CategoriaReceita/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: "Excluído com sucesso" })

                    setTimeout(() => {
                        this.getCategoriaReceita();
                    }, 1500);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir" })
            }
            )
    }

    //PUT
    putSetState = (input) => {
        this.setState({
            putCategoria: {
                ...this.state.putCategoria, [input.target.name]: input.target.value
            }
        })
    }

    putCategoria = (event) => {

        event.preventDefault();

        let idCat = this.state.putCategoria.idCategoriaReceita;
        let categoriaAlterada = this.state.putCategoria;


        api.put('/CategoriaReceita/' + idCat, categoriaAlterada)
            .then(() => {
                this.setState({ successMsg: "Evento alterado com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Evento" });
            })
    }

    //POST
    render() {
        return (
            <>
                <ResponsiveAdm />
                <HeaderPerfil />
                
                <main className="itens-encontrados">
                    <div className="esquerdo_perfil">

                        <div className="menu_perfil">
                            <HeaderPerfilFull />
                        </div>
                    </div>
                <div className="lado-direito-perfil-produtor">

                    <div className="container-perfil">
                        <div className="container-perfil2">

                            <div className="dados-produtor">
                                <h4>Categoria de receitas cadastradas</h4>
                                {
                                    this.state.listaCategoriaReceita.map(
                                        function (u) {
                                            return (
                                                <div className="table">
                                                    <div className="users">

                                                        <p><span className="bold-info-type">{u.nomeCategoria}</span></p>
                                                    </div>
                                                    <div className="btnDelete">

                                                        <button onClick={() => this.deleteCategoria(u.idCategoriaReceita)}>DELETE</button>
                                                        <button onClick={() => this.handleClickOpen(u)}>ALTERAR</button>
                                                    </div>
                                                </div>
                                            )
                                        }.bind(this)
                                    )
                                }
                            </div>
                        </div>
                        <button type="button" className="editar-perfil" onClick={() => this.handleClickOpenCadastrar()}>Cadastrar Categoria</button>
                        {this.state.openCadastro && <PerfilAdmModal open_modal={this.state.openCadastro} fechar_modal={this.handleCloseCadastro} />}
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
                        <DialogTitle id="alert-dialog-slide-title">{"Editar categoria"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <form onSubmit={this.putCategoria}>
                                    <input
                                        name="nomeCategoria"
                                        value={this.state.putCategoria.nomeCategoria}
                                        onChange={this.putSetState}
                                    />
                                    <Button onClick={this.handleClose} color="primary" type="submit">
                                        Salvar
                                        </Button>

                                    <Button onClick={this.handleClose} color="primary">
                                        Fechar
                                        </Button>
                                </form>
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



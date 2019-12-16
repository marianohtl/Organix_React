import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import {api} from '../../services/api';

// import Footer from '../../components/Footer/Footer'

//MODAL
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default class PerfilAdmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

            postCategoria: {
                nomeCategoria: ""
            },

            erroMsg: "",
            successMsg: "",
            openCadastro: this.props.open_modal
        }
    }

    postSetState = (input) => {
        this.setState({
            postCategoria: {
                ...this.state.postCategoria, [input.target.name]: input.target.value
            }
        })
    }
    postCategoria = (c) => {
        // console.log(this.ListaUsuario);

        c.preventDefault();

        api.post('/CategoriaReceita', this.state.postCategoria)
            .then(response => {
                this.setState({ response })
                console.log("Response do usuário cadastrado: ", response.data);
            }
            )
        setTimeout(() => {
            this.props.fechar_modal();
            { this.setState({ erroMsg: "" }) }
        }, 2000);
    }

    render() {
        return (
            <>
                <Dialog
                    open={this.state.openCadastro}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.fechar_modal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className="dialogForm"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Cadastrar Nova Categoria"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <>
                                <form onSubmit={this.postCategoria}>
                                    <input
                                        name="nomeCategoria"
                                        value={this.state.postCategoria.nomeCategoria}
                                        onChange={this.postSetState}
                                    />
                                    <p>
                                        <Button color="primary" type="submit">
                                            Salvar
                                        </Button>
                                        <Button onClick={this.props.fechar_modal} color="primary">
                                            Fechar
                                        </Button>
                                    </p>
                                </form>
                            </>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}



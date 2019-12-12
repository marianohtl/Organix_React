import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import api from '../../services/api';

import Footer from '../../components/Footer/Footer'

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
            listaUsuario: [],

            erroMsg: "",
            successMsg: "",
            open: this.props.open_modal
        }
    }

    componentDidMount() {
        this.getUsuarios();
    }


    getUsuarios = () => {
        // console.log('id de usuario logado', idUser)
        api.get('/Usuario/')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                }
            })
    }

    

    render() {
        return (
            <>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.fechar_modal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className="dialogForm"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Editar Perfil"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <>
                                {
                                    this.state.listaUsuario.map(
                                        function (u) {
                                            return (
                                                <>
                                                    <p><span className="bold-info-type">Nome:</span>{u.nome}</p>
                                                    <p><span className="bold-info-type">E-mail:</span>{u.email}</p>
                                                </>
                                            )
                                        }.bind(this)
                                    )
                                }
                                
                            </>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
                {/* <Footer /> */}
            </>
        )
    }
}



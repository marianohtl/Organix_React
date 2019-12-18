import React, { Component, Fragment } from 'react'
//import CardReceita from '../src/components/cardReceita/CardReceita'
import { api, apiFormData } from "../../services/api"
import TextField from '@material-ui/core/TextField';
//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';


import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { parseJwt } from "../../services/auth"
import "../../assets/css/receita.css";
import HeaderPerfil from "../../components/header/HeaderPerfil"
import ResponsiveComprador from "../../components/responsive/ResponsiveComprador"
import HeaderPerfilFull from "../../components/header/HeaderPerfilFull"
import Footer from '../../components/Footer/Footer'




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class MinhasReceitas extends Component {

    constructor() {
        super();
        this.state = {
            umUsuario: {
                receita: []
            },
            listaReceitas: [],
            umaReceita: {},
            idEscolhido: "",
            open: false,
            openEdit: false,
            successMsg: "",
            erroMsg: "",
            putReceita: {
                idReceita: "",
                nomeReceita: "",
                ingredientes: "",
                tempoPreparo: "",
                porcoes: "",
                modoPreparo: "",
                idUsuario: "",
                idCategoriaReceita: "",
                // 01 - Colocamos o createRef
                imagem: React.createRef()
            }
        }
    }

    refreshPage() {
        window.location.reload(true);
    }

    //#region DELETE
    deleteReceita = (id) => {
        console.log(id)
        this.setState({ successMsg: "" })
        api.delete('/receita/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: "Excluído com sucesso" })

                    setTimeout(() => {
                        this.refreshPage();
                    }, 1200);
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

    openDialogEdit = (receita) => {
        this.setState({
            openEdit: true,
            umaReceita: receita,
            putReceita: receita
        });
    }

    closeDialog() {
        this.setState({
            open: false,
            openEdit: false
        });
    }

    componentDidMount() {
        this.getReceitasUsuario();
        this.visualizarReceita();
        // console.log(this.state.umUsuario)     
    }

    getReceitas = () => {
        api.get('/receita')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaReceitas: response.data })
                    console.log(this.state.listaReceitas)
                }
            })
    }


    //#region GETs
    getReceitasUsuario = () => {
        let id = parseJwt().IdUsuario
        console.log(id)
        api.get('/usuario/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umUsuario: response.data })
                    console.log(this.state.umUsuario)
                }
            })
    }

    //esta função está recebendo o id da receita que foi mapeada <<< 
    visualizarReceita = (idReceita) => {
        api.get('/receita/' + idReceita)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umaReceita: response.data })
                    console.log(this.state.umaReceita)
                    this.openDialog()
                }
            })
    }

    //#endregion PUT


    // 02 - Adicionamos um setState específico
    putSetStateFile = (input) => {
        this.setState({
            putReceita: {
                ...this.state.putReceita, [input.target.name]: input.target.files[0]
            }
        })
    }

    putSetState = (input) => {
        this.setState({
            putReceita: {
                ...this.state.putReceita, [input.target.name]: input.target.value
            }
        })
    }


    putReceita = (event) => {
        //event.preventDefault();
        let receita_id = this.state.putReceita.idReceita;
        let receita_alterada = this.state.putReceita;

        console.log(receita_id)
        console.log(receita_alterada)

        // 03 - Criamos nosso formData
        let formData = new FormData();

        if (this.state.putReceita.imagem.current !== undefined) {
            // Seta a nova imagem.
                formData.set('imagem', this.state.putReceita.imagem.current.files[0], this.state.putReceita.imagem.value);
            }
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
        // formData.set('imagem', this.state.putReceita.imagem.current.files[0], this.state.putReceita.imagem.value);


        // 05 - Não esqueçam de passar o formData
        apiFormData.put('/receita/' + receita_id, formData)
            .then(() => {
                this.setState({ successMsg: "Evento alterado com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Receita" });
            })
        this.refreshPage()
    }


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
                        <Button onClick={this.closeDialog.bind(this)} color="primary" >
                            Sair
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
                            <form onSubmit={this.putReceita} noValidate autoComplete="off">
                                <Grid container spacing={1} direction="column" alignItems="center">
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="nomeReceita" onChange={this.putSetState} value={this.state.putReceita.nomeReceita} />
                                    </Grid>
                                    {/*({ target: { name, value } }) => {
              console.log('textfield changed', name, value) } */}
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="ingredientes" onChange={this.putSetState} value={this.state.putReceita.ingredientes} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="tempoPreparo" onChange={this.putSetState} value={this.state.putReceita.tempoPreparo} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="porcoes" onChange={this.putSetState} value={this.state.putReceita.porcoes} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="idCategoriaReceita" onChange={this.putSetState} value={this.state.putReceita.idCategoriaReceita} />
                                    </Grid>


                                    <label htmlFor="icon-button-file">


                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            {
                                                // 06 - Aqui damos nosso "onChange" especial e também passamos nosso "ref"

                                            }
                                            <input accept="image/*" className="input_load" id="icon-button-file" type="file" name="imagem" onChange={this.putSetStateFile} ref={this.state.putReceita.imagem} />        <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>
                                <DialogActions>
                                    <Button type="button" color="primary" onClick={() => this.deleteReceita(this.state.putReceita.idReceita)}>
                                        Excluir
      </Button>
                                    <Button onClick={e => this.putReceita(this.state.putReceita.idReceita)} type="button" color="primary">
                                        Salvar
      </Button>

                                    <Button onClick={this.closeDialog.bind(this)} type="submit" color="primary">
                                        Sair
     </Button>
                                </DialogActions>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>



                {/*-----------------------PRINCIPAL----------------------*/}
                <HeaderPerfil />
                <ResponsiveComprador />
                <main className="itens-encontrados-cadastro">

                    <div className="esquerdo_perfil">
                        <div className="menu_perfil">
                            <HeaderPerfilFull/>
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">
                            <h2>Minhas Receitas</h2>

                            <div className="container-cards">
                                {
                                    this.state.umUsuario.receita.map(
                                        function (user) {
                                            return (
                                                <Fragment key={user.idReceita}>

                                                    <div className="card-produto">
                                                        <div className="imagem-redonda-card-receita" alt="Imagem da receita">
                                                            <img src={"http://localhost:5000/" + user.imagem} alt="Imagem da receita" />
                                                        </div>
                                                        <p className='nome-produto'>{user.nomeReceita}</p>
                                                        <div className="uniao_bnt">
                                                            <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarReceita(user.idReceita)}  >
                                                                Ver Receita
                        </Button>
                                                            <Fab color="secondary" aria-label="edit" onClick={e => this.openDialogEdit(user)}>
                                                                <EditIcon />
                                                            </Fab>
                                                        </div>
                                                    </div>

                                                </Fragment>
                                            );
                                        }.bind(this)
                                    )
                                }

                                {
                                    /*
                                      <p>
                                        {this.state.umUsuario.nome}
                                      </p>
                                    
                                    */
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

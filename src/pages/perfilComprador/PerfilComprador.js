import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import { parseJwt } from "../../services/auth"

import PainelAdm from '../../components/painelAdm/PainelAdm';

import Footer from '../../components/Footer/Footer'

import api from '../../services/api';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);


export default class PerfilComprador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],
            listaTelefone: [],
            umUsuario:{
                endereco:[],
                telefone:[]
            },
            listaEndereco: [],

            erroMsg:"",
            successMsg:"",

            putPerfil: {
                nome:"",
                cpfCnpj:"",
                telefone1:"",
                email:"",
                cep:"",
                rua:"",
                bairro:"",
                cidade:"",
                estado:"",
                regiao:"",

                

                // //modal
                open:false,
            }
        }
    }

    componentDidMount() {
        this.getUsuarioId();
        this.getTelefone();
        this.getEndereco();
        this.geUmtUsuarioId();
    }
    
    
    //GETS PERFIL
    getUsuarioId = () => {
        
        let idUser = parseJwt().IdUsuario
        // console.log('id de usuario logado', idUser)
        api.get('/Usuario/' + idUser)
        .then(response => {
            if (response.status === 200)
            this.setState({ listaUsuario: [response.data] })           
            
        })
    }

    geUmtUsuarioId = () => {
        
        let idUser = parseJwt().IdUsuario
        // console.log('id de usuario logado', idUser)
        api.get('/Usuario/' + idUser)
        .then(response => {
            if (response.status === 200)
            this.setState({ umUsuario: response.data })
            console.log(this.state.umUsuario)
            console.log(this.state.umUsuario.endereco[0].rua)
            console.log(this.state.umUsuario.telefone[0].telefone1)
            
        })
    }


    getTelefone = () => {
        api.get('/Telefone')
            .then(response => {
                // console.log('peguei os tel')
                if (response.status === 200)
                    this.setState({ listaTelefone: response.data })
                // console.log('lista de telefone', this.state.listaTelefone)
            }
            )
    }

    getEndereco = () => {
        api.get('/Endereco')
            .then(response => {
                // console.log('peguei os end')
                if (response.status === 200)
                    this.setState({ listaEndereco: response.data })
                // console.log('lista de Endereco', this.state.listaEndereco)
            }
            )
    }

    handleClickOpen = (usuario) => {
        this.setState({open: true});

        this.setState({putPerfil : usuario});
        this.geUmtUsuarioId();
       
      };
      
      handleClose = () => {
        this.setState({open: false});
      };

    render() {
        return (

            <div>
                <main className="itens-encontrados">
                    <PainelAdm />
                    <div className="lado-direito-perfil-produtor">
                        <div className="container-perfil">
                            <h2>Meus Dados</h2>
                            <div className="container-perfil2">
                                {
                                    this.state.listaUsuario.map(
                                        function (u) {
                                            return (
                                                <div className="dados-produtor">
                                                    <h4>Dados Pessoais</h4>
                                                    <>
                                                        <p><span className="bold-info-type">Nome: </span> {u.nome}</p>
                                                        <p><span className="bold-info-type">CPF: </span>{u.cpfCnpj}</p>
                                                        <p><span className="bold-info-type">CPF: </span>{u.telefone[0].telefone1}</p>
                                                        {
                                                            this.state.listaTelefone.map(
                                                                function (t) {
                                                                    if (t.idUsuario === u.idUsuario) {
                                                                        return (
                                                                            <>
                                                                            <p><span className="bold-info-type">Telefone: </span> {t.telefone1}</p>
                                                                            <p><span className="bold-info-type">Celular: </span> {t.celular}</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                }.bind(this)
                                                            )
                                                        }
                                                        <p><span className="bold-info-type">E-mail: </span>{u.email}</p>
                                                    </>
                                                </div>
                                            )
                                        }.bind(this)
                                    )
                                }
                                <div className="dados-localizacao-produtor">
                                    <h4>Endereço</h4>
                                    {
                                        this.state.listaUsuario.map(
                                            function (u) {
                                                return (
                                                    <>
                                                        {
                                                            this.state.listaEndereco.map(
                                                                function (e) {
                                                                    if (e.idUsuario === u.idUsuario) {
                                                                        return (
                                                                            <>
                                                                                <p><span className="bold-info-type">CEP: </span>{e.cep}</p>
                                                                                <p><span className="bold-info-type">Endereco: </span>{e.rua}</p>
                                                                                <p><span className="bold-info-type">Bairro: </span>{e.bairro}</p>
                                                                                <p><span className="bold-info-type">Cidade: </span>{e.cidade}</p>
                                                                                <p><span className="bold-info-type">Estado: </span>{e.estado}</p>
                                                                                <p><span className="bold-info-type">Zona: </span>{e.regiao}</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                }.bind(this)
                                                            )
                                                        }
                                                    </>
                                                )
                                            }.bind(this)
                                        )
                                    }
                                </div>
                            </div>
                            <button className="editar-perfil" onClick={() => {this.handleClickOpen(this.state.listaUsuario)}}>Editar Perfil</button>
                            <div className="lado-direito-resultado1"></div>
                        </div>
                    </div>
                </main>
                <Footer />

                {/* modal */}
                <>
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            <form onSubmit={this.putPerfil} >
                        <div>
                            <label>Nome:</label>
                            <input id="POST-nome-produtor" type="text"className="form_txt media_input_cad"
                               name="nome"
                               value= {this.state.umUsuario.nome}
                               onChange= {this.putSetState}
                            />

                            <label>CPF/CNPJ:</label>
                            <input id="POST-cpf-comprador" type="text" className="form_number  media_input_cad"
                                 name="cpfCnpj"
                                 value= {this.state.umUsuario.cpfCnpj}
                                 onChange= {this.putSetState}
                            />

                            <label>E-mail:</label>
                            <input id="POST-email-produtor" type="email" className="form_txt media_input_cad"
                               name="email"
                               value= {this.state.umUsuario.email}
                               onChange= {this.putSetState} 
                            />
                        </div>
                        
                        <div className="form_dir">
                            <label>Telefone:</label>
                            <input id="POST-senha-prod" className="form_number media_input_cad"
                                 name="telefone1"
                                 value= {this.telefone1}
                                 onChange= {this.putSetState}
                            />

                            <label>CEP:</label>
                            <input id="POST-senha-prod2"  className="form_number media_input_cad"
                              name="cep"
                              value= {this.state.putPerfil.cep}
                              onChange= {this.putSetState}
                            />
                            <label>Endereço:</label>
                            <input id="POST-senha-prod2" className="form_number media_input_cad"
                              name="rua"
                              value= {this.state.putPerfil.rua}
                              onChange= {this.putSetState}
                            />
                            <label>Bairro:</label>
                            <input id="POST-senha-prod2" className="form_number media_input_cad"
                              name="bairro"
                              value= {this.state.putPerfil.bairro}
                              onChange= {this.putSetState}
                            />

                            <label>Cidade:</label>
                            <input id="POST-senha-prod2" className="form_number media_input_cad"
                              name="cidade"
                            //   value= {this.state.endereco.cidade}
                              onChange= {this.putSetState}
                            />
                            <label>Estado:</label>
                            <input id="POST-senha-prod2" className="form_number media_input_cad"
                              name="estado"
                              value= {this.state.putPerfil.estado}
                              onChange= {this.putSetState}
                            />
                            <label>Zona:</label>
                            <input id="POST-senha-prod2" className="form_number media_input_cad"
                              name="regiao"
                              value= {this.state.putPerfil.regiao}
                              onChange= {this.putSetState}
                            />
                        </div>
                    </form> 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </>

                    {/* */}
            </div>
        )

    }

}
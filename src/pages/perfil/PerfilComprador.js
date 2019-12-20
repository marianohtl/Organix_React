import React, { Component } from 'react';

//IMGS
import Checked from '../../assets/img/Perfil/checked.png'

//css
import '../../assets/css/estilo.css';
import '../../assets/css/perfilCompradorPut.css'

//components
// import PainelAdm from '../../components/painelAdm/PainelAdm';
import Footer from '../../components/Footer/Footer'

//services
import {api} from '../../services/api';
import { parseJwt } from "../../services/auth"

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
import ResponsiveComprador from "../../components/responsive/ResponsiveComprador"



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class PerfilComprador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],

            umUsuario: {
                nome: "",
                cpfCnpj: "",
                email:"",
                senha:"",
                endereco: [
                    {
                        cep: "''",
                        rua: "''",
                        bairro: '',
                        cidade: '',
                        estado: '',
                        regiao: ''
                    }
                ],
                telefone: [
                    {
                        telefone1:" ''",
                        celular: ''
                    }
                ]
            },

            putPerfil: {
                nome: "",
                cpfCnpj: "",
                email:"",
                senha:"",
            },

            putPerfilTel: {
                idTelefone:"",
                telefone1: "",
                celular: ""
                
            },

            putPerfilEnd:{
                idEndereco:"",
                cep: "",
                rua: "",
                bairro: "",
                cidade: "",
                estado: "",
                regiao: ""
                 
            },

            erroMsg: "",
            successMsg: "",

           
            //modal
            open: false,

            //buttonSenha
            disable: true
        }
    }

    componentDidMount() {
        this.getUsuarioId();
        this.getUmUsuarioId();
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

    getUmUsuarioId = () => {

        let idUser = parseJwt().IdUsuario
        // console.log('id de usuario logado', idUser)
        api.get('/Usuario/' + idUser)
            .then(response => {
                if (response.status === 200)
                    this.setState({ umUsuario: response.data })
            }
        )
    }

    //MODAL

    handleClickOpen = (user) => {
        this.setState({ open: true });

        this.setState({ putPerfil : user });
        this.setState({ putPerfilTel : user.telefone[0] });
        this.setState({ putPerfilEnd : user.endereco[0] });
        this.getUmUsuarioId();
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    //SETSTATE USER
    putSetState = (input) =>{
        
        this.setState({
            putPerfil : {
                ...this.state.putPerfil, [input.target.name] : input.target.value
            }   
        })
        console.log(this.state.putPerfil)
    }

     //SETSTATE END
     putSetStateEnd = (input) =>{
        
        this.setState({
            putPerfilEnd : {
                ...this.state.putPerfilEnd, [input.target.name] : input.target.value
            }   
        })
    }
    //SETSTATE TEL
    putSetStateTel = (input) =>{
        
        this.setState({
            putPerfilTel : {
                ...this.state.putPerfilTel, [input.target.name] : input.target.value
            }   
        })
    }

    putPerfilUser =(event) =>{

        event.preventDefault();
        
        // user
        let perfilAlterado = this.state.putPerfil;
        let idUser = parseJwt().IdUsuario;

        //telefone
        let perfilAlterado1 = this.state.putPerfilTel;
        let IdTel = this.state.putPerfilTel.idTelefone;

        //endereco
        let perfilAlterado2 = this.state.putPerfilEnd;
        let IdEnd = this.state.putPerfilEnd.idEndereco;

        //api 
        api.put('/Usuario/' + idUser, perfilAlterado)
        
        api.put('/Telefone/' + IdTel, perfilAlterado1)
        
        api.put('/Endereco/' + IdEnd, perfilAlterado2)

        .then(() =>{
            this.setState({successMsg :"Perfil alterado com sucesso!"})
        }).catch(error =>{
            console.log(error);
            this.setState({erroMsg:"Erro ao alterar dados!Tente novamente"})
        })
         
        setTimeout(() => {
            this.getUsuarioId();
        }, 1500);

        setTimeout(() => {
            this.setState({successMsg : ""});
            this.setState({erroMsg : ""});
        }, 1500);
        
    }

    removeDisable = () =>{
        this.setState({disable:false})
    }
    
    render() {

        return (

            <div>
                <ResponsiveComprador/>
        <HeaderPerfil/>
        <main className="itens-encontrados">
                    <div className="esquerdo_perfil">
                        <div className="menu_perfil">
                            <HeaderPerfilFull/>
                        </div>
                    </div>
                    <div className="lado-direito-perfil-produtor">

                        <div className="container-perfil">

                            <h2>Meus Dados</h2>
                                {
                                    this.state.listaUsuario.map(
                                        function (u) {
                                            return (
                                                <>
                                            <div className="container-perfil2">
                                                    <div className="dados-produtor">
                                                        <h4>Dados Pessoais</h4>
                                                        <p><span className="bold-info-type">Nome:</span> {u.nome}</p>
                                                        <p><span className="bold-info-type">CPF: </span>{u.cpfCnpj}</p>
                                                        <p><span className="bold-info-type">Telefone: </span> {u.telefone[0] ? u.telefone[0].telefone1 : ""}</p>
                                                        <p><span className="bold-info-type">Celular: </span> {u.telefone[0] ? u.telefone[0].celular : ""}</p>
                                                        <p><span className="bold-info-type">E-mail: </span>{u.email}</p>
                                                        {/* <p><span className="bold-info-type" type="password">Senha: </span>{u.senha}</p> */}
                                                    </div>
                                                    <div className="dados-localizacao-produtor">
                                                        <h4>Endereço</h4>
                                                        <p><span className="bold-info-type">CEP: </span>{u.endereco[0] ? u.endereco[0].cep : ""}</p>
                                                        <p><span className="bold-info-type">Endereço: </span> {u.endereco[0] ? u.endereco[0].rua : ""}</p>
                                                        <p><span className="bold-info-type">Bairro: </span> {u.endereco[0] ? u.endereco[0].bairro : ""}</p>
                                                        <p><span className="bold-info-type">Cidade: </span>{u.endereco[0] ? u.endereco[0].cidade : ""}</p>
                                                        <p><span className="bold-info-type">Estado: </span>{u.endereco[0] ? u.endereco[0].estado : ""}</p>
                                                        <p><span className="bold-info-type">Zona: </span>{u.endereco[0] ? u.endereco[0].regiao : ""}</p>
                                                    </div>
                                                    </div>
                                                    <button type="button" className="editar-perfil" onClick={()=>this.handleClickOpen(u)}>Editar Perfil</button>
                                                </>
                                            )
                                        }.bind(this)
                                    )
                                }
                                {
                                    this.state.successMsg && 
                                    <p className="SucessMsg">
                                        {this.state.successMsg}
                                        <img src={Checked} alt="icone de sucesso" className="imgSucessMsg"/>
                                    </p>
                                }
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
                        className="dialogForm"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Editar Perfil"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">

                            {
                                this.state.erroMsg && 
                                <p color="danger" >
                                    {this.state.erroMsg}
                                </p>
                            }
                                <form onSubmit={this.putPerfilUser} className="form">
                                    <div className="formPut">
                                    <div className="sideLeft">
                                        <p><label className="labelPerfil">Nome:</label></p>
                                        <input id="POST-nome-produtor" type="text" className="inputPerfil"
                                            name="nome"
                                            value={this.state.putPerfil.nome}
                                            onChange={this.putSetState}
                                        />

                                        <p><label className="labelPerfil">CPF/CNPJ:</label></p>
                                        <input id="POST-cpf-comprador" type="text" className="inputPerfil"
                                            name="cpfCnpj"
                                            value={this.state.putPerfil.cpfCnpj}
                                            onChange={this.putSetState}
                                        />

                                        <p><label className="labelPerfil">E-mail:</label></p>
                                        <input id="POST-email-produtor" type="email" className="inputPerfil"
                                            name="email"
                                            value={this.state.putPerfil.email}
                                            onChange={this.putSetState}
                                        />


                                        <p><label className="labelPerfil">Telefone:</label></p>
                                        <input id="POST-tel-prod" className="inputPerfil"
                                            name= "telefone1"
                                            value={this.state.putPerfilTel.telefone1}
                                            // value={this.state.putPerfilTel.telefone1 ? this.state.putPerfilTel.telefone1 : "..."}
                                            onChange={this.putSetStateTel}
                                        />

                                        <p><label className="labelPerfil">Celular:</label></p>
                                        <input id="POST-cel-prod" className="inputPerfil"
                                            name="celular"
                                            value={this.state.putPerfilTel.celular}
                                            onChange={this.putSetStateTel}
                                        />
                                        <input type="hidden" name="idTelefone" value={this.state.putPerfilTel.idTelefone} /> 

                                    </div>
                                    <div className="sideRight">
                                        <p><label className="labelPerfil">CEP:</label></p>
                                        <input id="POST-cep-prod2" className="inputPerfil"
                                            name="cep"
                                            value={this.state.putPerfilEnd.cep}
                                            onChange={this.putSetStateEnd}
                                        />

                                        <p><label className="labelPerfil">Endereço:</label></p>
                                        <input id="POST-endereco-prod2" className="inputPerfil"
                                            name="rua"
                                            value={this.state.putPerfilEnd.rua}
                                            onChange={this.putSetStateEnd}
                                        />

                                        <p><label className="labelPerfil">Bairro:</label></p>
                                        <input id="POST-bairro-prod2" className="inputPerfil"
                                            name="bairro"
                                            value={this.state.putPerfilEnd.bairro}
                                            onChange={this.putSetStateEnd}
                                        />

                                        <p><label className="labelPerfil">Cidade:</label></p>
                                        <input id="POST-cidade-prod2" className="inputPerfil"
                                            name="cidade"
                                            value={this.state.putPerfilEnd.cidade}
                                            onChange={this.putSetStateEnd}
                                        />

                                        <p><label className="labelPerfil">Estado:</label></p>
                                        <input id="POST-estado-prod2" className="inputPerfil"
                                            name="estado"
                                            value={this.state.putPerfilEnd.estado}
                                            onChange={this.putSetStateEnd}
                                        />

                                        <p><label className="labelPerfil">Zona:</label></p>
                                        <input id="POST-regiao-prod2" className="inputPerfil"
                                            name="regiao"
                                            value={this.state.putPerfilEnd.regiao}
                                            onChange={this.putSetStateEnd}
                                        />
                                        <input type="hidden" name="idEndereco" value={this.state.putPerfilEnd.idEndereco} />
                                    </div> 
                                    </div>
                                        <p className="passwordFormPut">
                                            <label className="labelPerfil">Senha:</label>
                                            <input id="POST-senha-produtor" type="password" className="inputPerfil"
                                                name="senha"
                                                value={this.state.putPerfil.senha}
                                                onChange={this.putSetState}

                                                disabled = {this.state.disable}
                                            />
                                            <Button onClick={this.removeDisable} id="btnPassword" color="primary">
                                                Alterar senha
                                            </Button>
                                        </p>
                                    <div className="btnFormPut">
                                    <Button onClick={this.handleClose} color="primary" type="submit">
                                        Salvar
                                    </Button>

                                    <Button onClick={this.handleClose} color="primary">
                                        Fechar
                                    </Button>
                                    </div>
                                    {this.state.erroMsg}
                                </form>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </>

                

            </div>
        )

    }

}
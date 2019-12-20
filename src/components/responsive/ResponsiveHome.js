import React, { Component } from "react"
// import Logo from "../../assets/img/Ativo 6.png"
// import Menu from "../../assets/img/bars-solid.svg"
// import { Link } from "react-router-dom"
import { api } from "../../services/api";
import { parseJwt, usuarioAutenticado } from "../../services/auth"
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { string } from 'prop-types';
import Slide from '@material-ui/core/Slide';

// Alternativa para realizar redirecionamentos com this.props.history.push
import { withRouter } from 'react-router-dom';
import "../../assets/css/responsive.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ResponsiveHome extends Component {

  logout = () => {
    localStorage.removeItem("usuario-organix")

    this.props.history.push("/")
  }

  constructor() {
    super();
    this.state = {
      open: false,
      openEdit: false,
      email: "",
      senha: "",
      erroMensagem: "",
      isLoading: false
    }
  }

  atualizaEstado = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  realizarLogin = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: "" })

    this.setState({ isLoading: true })

    let usuario = {
      email: this.state.email,
      senha: this.state.senha
    }

    api.post("/login", usuario)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("usuario-organix", response.data.token)
          this.setState({ isLoading: false })

          console.log("Meu token: " + response.data.token)

          var base64 = localStorage.getItem("usuario-organix").split(".")[1]
          console.log(base64)

          console.log(window.atob(base64))

          console.log(JSON.parse(window.atob(base64)))

          console.log(parseJwt().Role)

          if (parseJwt().Role === "3") {
            this.props.history.push("/PerfilAdm");
          }
          else if (parseJwt().Role === "2") {
            this.props.history.push("/PerfilProdutor")
          } else if (parseJwt().Role === "1") {
            this.props.history.push("/PerfilComprador")
          }
        }
      })
      .catch(erro => {
        console.log("Erro: ", erro)
        this.setState({ erroMensagem: "E-mail ou senha inválidos, verifique se os parâmetros foram passados corretamente" })
        this.setState({ isLoading: false })
      })
  }



  openDialog() {
    this.setState({ open: true });
  }


  closeDialog() {
    this.setState({
      open: false,
      openEdit: false
    });
  }

  render() {
    return (
      <header className="ResponsiveMenu">
        <div className="header"></div>
        <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">
          <ul className="sidebarMenuInner">
            {/* <li><a href="/" target="_blank">Home</a></li>
            <li><a href="#/quemsomos" target="_blank">Quem Somos</a></li> */}
            {/* <li><a href="#/minhasreceitas" target="_blank">Fazer Login</a></li> */}
            {/* <li><a href="#/cadastro" target="_blank">Cadastre-se</a></li> */}
          </ul>
        </div>

        <div id="sidebarMenu">
          <ul className="sidebarMenuInner">

            {((usuarioAutenticado() && parseJwt().Role === "1") || (usuarioAutenticado() && parseJwt().Role === "2") || (usuarioAutenticado() && parseJwt().Role === "3")) ?
              (
                <React.Fragment>
                  <li><a href="/">Home</a></li>
                  <li><a href="#/QuemSomos">Quem Somos</a></li>
                  <li ><a href="#/" onClick={this.logout}>Sair</a></li>
                  <li ><a href='#/CadastrarProdutos'>Perfil</a></li>

                </React.Fragment>
              ) : (
                <>
                  <li><a href="/">Home</a></li>
                  <li><a href="#/QuemSomos" >Quem Somos</a></li>
                  <li ><a onClick={this.openDialog.bind(this)}>Entrar</a></li>
                  <li ><a href='#/Cadastro'>Cadastre-se</a></li>
                </>
              )
            }
          </ul>
        </div>

        <Dialog
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <DialogTitle id="alert-dialog-slide-title">

          </DialogTitle>
          <form onSubmit={this.realizarLogin}>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <h2>E-mail</h2>
                <input
                  placeholder="E-Mail"
                  type="adress"
                  name="email"
                  value={this.state.email}
                  onChange={this.atualizaEstado}

                >
                </input>
              </DialogContentText>
            </DialogContent>

            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <h2>Senha</h2>
                <input
                  placeholder="Senha"
                  type="password"
                  name="senha"
                  value={this.state.senha}
                  onChange={this.atualizaEstado}
                >
                </input>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={this.closeDialog.bind(this)} color="primary" >
                FECHAR
                </Button>
              <Button color="primary"
                type="submit" >
                LOGAR
                </Button>
            </DialogActions>
          </form>
        </Dialog>


      </header>
    )
  }
}

export default withRouter(ResponsiveHome);
import React, {Component} from "react"
import Logo from "../../assets/img/Ativo 6.png"
import Menu from "../../assets/img/bars-solid.svg"
import {Link} from "react-router-dom"
import api from "../../services/api";
import {parseJwt} from "../../services/auth"

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading: false
        }
    }
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    realizarLogin(event){
        event.preventDefault();

        this.setState({erroMensagem: ""})

        this.setState({isLoading: true})

        let usuario = {
            email: this.state.email,
            senha: this.state.senha
        }

        api.post("/login", usuario)
        .then(response =>{
            if(response.status === 200){
                localStorage.setItem("usuario-organix", response.data.token)
                this.setState({isLoading : false})

                console.log("Meu token: " + response.data.token)

                var base64 = localStorage.getItem("usuario-organix").split(".")[1]
                console.log(base64)

                console.log(window.atob(base64))

                console.log(JSON.parse(window.atob(base64)))

                console.log(parseJwt().Role)

                if(parseJwt().Role === "3"){
                    this.props.history.push("/Produtos");
                }
                else if(parseJwt().Role === "2"){
                    this.props.history.push("/PerfilProdutor")
                }else if(parseJwt().Role === "1"){
                    this.props.history.push("/PerfilComprador")
                }
            }
        })
        .catch(erro => {
            console.log("Erro: ", erro)
            this.setState({erroMensagem: "E-mail ou senha inválidos, verifique se os parâmetros foram passados corretamente"})
            this.setState({isLoading:false})
        })
    }
    
    
}


class Header extends Component{
    render(){
        return(
            <header>
        <div class="container-home-responsivo">
          <Link href=""><img src={Menu} class="menu-bar" alt="botão menu hamburger" /></Link>
          <p>HOME</p>
          <Link href=""><img src="imagens/Ativo 1.svg" class="logo-cenoura" alt="logo cenoura" /></Link>
        </div>
        <div class="container-home">
          <h1>
            <img src={Logo} alt="LOGO ORGANIX COM UMA CENOURA NO FINAL" />
          </h1>
          <nav class="nav-home">
            <ul class="ul-home">
              <li><a href="index.html">HOME</a></li>
              <li class="tracinho">|</li>
              <li><a href="quemsomos.html">QUEM SOMOS</a></li>
              <li class="tracinho">|</li>
              <li><a href='#dicas'>DICAS</a></li>
            </ul>
          </nav>
          <nav class="nav-home">
            <ul class="ul-home">
              <li class="nav-2-home"><a href="perfil.html">Entrar</a></li>
              <li class="nav-2-home"><a href='cadastro.html'>Cadastre-se</a></li>
            </ul>
          </nav>
        </div>
      </header>
        )
    }
}

export default Header;
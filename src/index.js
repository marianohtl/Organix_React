import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/estilo.css'
import "./assets/css/receita.css"
//import "./assets/css/imagens/Slider/aaa.jpg"
import App from './pages/home/App';
import * as serviceWorker from './serviceWorker';
import Login from "../src/components/header/Header"

//PAGES

import QuemSomos from "./pages/quemSomos/QuemSomos";
import Cadastro from "./pages/cadastro/Cadastro";

import PerfilComprador from "./pages/perfil/PerfilComprador"
import EditUsers from './pages/perfilAdm/EditUsers';
import NewCategoria from './pages/perfilAdm/NewCategoria';
import PerfilAdm from './pages/perfilAdm/PerfilAdm';
import BuscarProdutos from './pages/produtos/BuscarProdutos';



import MinhasOfertas from "./pages/produtos/MinhasOfertas"

import ProdutosEncontrados from "./pages/produtosEncontrados/ProdutosEncontrados"
import MinhasReceitas from "./pages/receitas/MinhasReceitas"
import TodasReceitas from "./pages/receitas/TodasReceitas"
import CadastrarReceitas from "./pages/receitas/CadastrarReceitas"
import CadastrarCategoria from "./pages/produtos/CadastrarCategoria"
import ProdutosCadastrados from "./pages/produtos/ProdutosCadastrados"
import CadastrarProdutos from "./pages/produtos/CadastrarProdutos"
import AlterarCategoria from "./pages/produtos/AlterarCategoria"



import {Route, HashRouter as Router, Switch, Redirect} from 'react-router-dom'
import { usuarioAutenticado, parseJwt } from './services/auth'
import PerfilProdutor from './pages/perfil/PerfilProdutor'

const PermissaoAdmin = ({component : Component}) => (
    <Route
        render={props =>
        usuarioAutenticado()  && parseJwt().Role === "3" ?(
            <Component {...props}/>
        ):(
            <Redirect to={{pathname : "/login"}}/> 
        )
    }
    />
)
const PermissaoProdutor = ({component : Component}) => (
    <Route
        render={props =>
        usuarioAutenticado()  && parseJwt().Role === "2" ?(
            <Component {...props}/>
        ):(
            <Redirect to={{pathname : "/login"}}/> 
        )
    }
    />
)
const PermissaoComprador = ({component : Component}) => (
    <Route
        render={props =>
        usuarioAutenticado()  && parseJwt().Role === "1" ?(
            <Component {...props}/>
        ):(
            <Redirect to={{pathname : "/login"}}/> 
        )
    }
    />
)

const Rotas = (
    <Router>
        <div>
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/QuemSomos" component={QuemSomos} />
            <PermissaoComprador exact path="/MinhasReceitas" component={MinhasReceitas} />
            <PermissaoComprador exact path="/TodasReceitas" component={TodasReceitas} />
            <PermissaoComprador exact path="/CadastrarReceitas" component={CadastrarReceitas} />
            <PermissaoProdutor exact path="/ProdutosCadastrados" component={ProdutosCadastrados} />
            <PermissaoAdmin exact path="/CadastrarCategoria" component={CadastrarCategoria} />
            <Route path="/alterarcategoria" component={AlterarCategoria} />
            <Route path="/Cadastro" component={Cadastro} />
            <PermissaoComprador path="/PerfilComprador" component={PerfilComprador} />
            <PermissaoProdutor path="/PerfilProdutor" component={PerfilProdutor} />
            
            
            <Route path="/editUsers" component={EditUsers} />
            <Route path="/NewCategoria" component={NewCategoria}/>
            <Route path="/BuscarProdutos" component={BuscarProdutos} />
            <Route path="/ProdutosEncontrados" component={ProdutosEncontrados} />
            <Route path="/MinhasOfertas" component={MinhasOfertas}/>
            
            
            <Route path="/PerfilAdm" component={PerfilAdm} />            
            <Route exact path="/login" component={Login}/>
            <PermissaoProdutor path="/CadastrarProdutos" component={CadastrarProdutos} />
            {/* <Route path="/CategoriaReceita" component={CategoriaReceita}/> */}
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

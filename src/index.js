import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/estilo.css'
//import "./assets/css/imagens/Slider/aaa.jpg"
import App from './pages/home/App';
import * as serviceWorker from './serviceWorker';
import Login from "../src/components/header/Header"

import QuemSomos from "./pages/quemSomos/QuemSomos"
// import Cadastro from "./pages/cadastro/Cadastro"
// import PerfilComprador from "./pages/perfilComprador/PerfilComprador"
// import BuscarProdutos from "./pages/buscarProdutos/BuscarProdutos"
// import ProdutosEncontrados from "./pages/produtosEncontrados/ProdutosEncontrados"
// import Receitas from "./pages/receitas/Receitas"
import minhasReceitas from "./pages/receitas/minhasReceitas"
import todasReceitas from "./pages/receitas/todasReceitas"
import CadastrarReceitas from "./pages/receitas/cadastrarreceitas"
import AlterarCategoria from "./pages/produtos/alterarcategoria"
import CadastrarCategoria from "./pages/produtos/cadastrarcategoria"

import todosProdutos from "./pages/produtos/todosprodutos"

// import PerfilProdutor from "./pages/perfilProdutor/PerfilProdutor"
// import ProdutosCadastrados from "./pages/produtosCadastrados/ProdutosCadastrados"
// import CadastrarProdutos from "./pages/cadastrarProdutos/CadastrarProdutos"

import {Route, HashRouter as Router, Switch, Redirect} from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from './services/auth';

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
            <PermissaoAdmin exact path="/quemsomos" component={QuemSomos} />
            <Route path="/minhasreceitas" component={minhasReceitas} />
            <Route path="/todasreceitas" component={todasReceitas} />
            <Route path="/cadastrarreceitas" component={CadastrarReceitas} />
            <Route path="/todosprodutos" component={todosProdutos} />
            <Route path="/cadastrarcategoria" component={CadastrarCategoria} />
            <Route path="/alterarcategoria" component={AlterarCategoria} />
            
            {/* <Route path="/Cadastro" component={Cadastro} />
            <PermissaoComprador path="/PerfilComprador" component={PerfilComprador} />
            <PermissaoProdutor path="/PerfilProdutor" component={PerfilProdutor} />
            <Route path="/BuscarProdutos" component={BuscarProdutos} />
            <Route path="/ProdutosEncontrados" component={ProdutosEncontrados} />
            <Route path="/Receitas" component={Receitas} />
            <Route path="/ProdutosCadastrados" component={ProdutosCadastrados} />
            <Route path="/CadastrarProdutos" component={CadastrarProdutos} /> */}
            <Route exact path="/login" component={Login}/>
            </Switch>
            
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

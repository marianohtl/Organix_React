import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/estilo.css'
import "./assets/css/receita.css"
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
import MinhasReceitas from "./pages/receitas/MinhasReceitas"
import TodasReceitas from "./pages/receitas/TodasReceitas"
import CadastrarReceitas from "./pages/receitas/CadastrarReceitas"
import CadastrarCategoria from "./pages/produtos/CadastrarCategoria"

import TodosProdutos from "./pages/produtos/TodosProdutos"
import CadastrarProdutos from "./pages/produtos/CadastrarProdutos"
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
            <Route path="/QuemSomos" component={QuemSomos} />
            <Route path="/MinhasReceitas" component={MinhasReceitas} />
            <Route path="/TodasReceitas" component={TodasReceitas} />
            <Route path="/CadastrarReceitas" component={CadastrarReceitas} />
            <Route path="/TodosProdutos" component={TodosProdutos} />
            <Route path="/CadastrarCategoria" component={CadastrarCategoria} />
            
            {/* <Route path="/Cadastro" component={Cadastro} />
            <PermissaoComprador path="/PerfilComprador" component={PerfilComprador} />
            <PermissaoProdutor path="/PerfilProdutor" component={PerfilProdutor} />
            <Route path="/BuscarProdutos" component={BuscarProdutos} />
            <Route path="/ProdutosEncontrados" component={ProdutosEncontrados} />
            <Route path="/Receitas" component={Receitas} />
            <Route path="/ProdutosCadastrados" component={ProdutosCadastrados} />
            <Route path="/CadastroReceitas" component={CadastroReceitas} />*/}
            
            <Route exact path="/login" component={Login}/>
            <Route path="/CadastrarProdutos" component={CadastrarProdutos} />
            </Switch>
            
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

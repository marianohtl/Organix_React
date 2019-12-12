import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/estilo.css'
//import "./assets/css/imagens/Slider/aaa.jpg"
import App from './pages/home/App';
import * as serviceWorker from './serviceWorker';

import QuemSomos from "./pages/quemSomos/QuemSomos"
import Cadastro from "./pages/cadastro/Cadastro"
import PerfilComprador from "./pages/perfilComprador/PerfilComprador"
import perfilAdm from "./pages/perfilAdm/NewCategoria"
// import BuscarProdutos from "./pages/buscarProdutos/BuscarProdutos"
// import ProdutosEncontrados from "./pages/produtosEncontrados/ProdutosEncontrados"
// import Receitas from "./pages/receitas/Receitas"
// import PerfilProdutor from "./pages/perfilProdutor/PerfilProdutor"
// import ProdutosCadastrados from "./pages/produtosCadastrados/ProdutosCadastrados"
// import CadastrarProdutos from "./pages/cadastrarProdutos/CadastrarProdutos"


import {Route, HashRouter as Router} from 'react-router-dom';

const Rotas = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/QuemSomos" component={QuemSomos} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/PerfilComprador" component={PerfilComprador} />
            {/* <Route path="/PerfilProdutor" component={PerfilProdutor} />
            <Route path="/BuscarProdutos" component={BuscarProdutos} />
            <Route path="/ProdutosEncontrados" component={ProdutosEncontrados} />
            <Route path="/Receitas" component={Receitas} />
            <Route path="/ProdutosCadastrados" component={ProdutosCadastrados} />
            <Route path="/CadastrarProdutos" component={CadastrarProdutos} />  */}
            <Route path="/newCategoria" component={perfilAdm} />
            
            
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import '../../assets/css/perfilAdm.css';

import api from '../../services/api';

import Footer from '../../components/Footer/Footer'

import PerfilAdmModal from '../../components/perfilAdministrador/PerfilAdmModal'


export default class CategoriaReceita extends Component {

    constructor() {
        super();
        this.state = {
            listaCategoriaReceita: [],

            erroMsg: "",
            successMsg: "",

            opem: false
        }
    }

    componentDidMount() {
        this.getCategoriaReceita();
    }
    
    
    getCategoriaReceita = () => {
        api.get('/CategoriaReceita')
        .then(response => {
            if (response.status === 200) {
                this.setState({ listaCategoriaReceita: response.data })
            }
        })
    }

    deleteCategoria(id){

        this.setState({ successMsg : "" })

        api.delete('/CategoriaReceita/'+id)
        .then(response => {
            if(response.status === 200){
                this.setState({ successMsg : "Excluído com sucesso" })

                setTimeout(() => {
                    this.getCategoriaReceita();
                }, 1500);
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Falha ao excluir" })
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = (fechar_modal) => {
        this.setState({ open: false });
    };



    render() {
        return (
            <>
            <div className="lado-direito-perfil-produtor">

            <div className="container-perfil">
                <div className="container-perfil2">

                    <div className="dados-produtor">
                        <h4>Categoria de receitas cadastradas</h4>
                        {
                            this.state.listaCategoriaReceita.map(
                                function (u) {
                                    return (
                                      <div className="table">  
                                            <div className="users">

                                                <p><span className="bold-info-type">{u.nomeCategoria}</span></p>
                                            </div>
                                            <div className="btnDelete">
                                            
                                                <button onClick={() => this.deleteCategoria(u.idCategoriaReceita)}>DELETE</button>
                                                <button onClick={() => this.handleClickOpen()}>ALTERAR</button>
                                            </div>
                                        </div>
                                    )
                                }.bind(this)
                            )
                        }
                    </div>
                    {this.state.open && <PerfilAdmModal open_modal={this.state.open} fechar_modal={this.handleClose}/>}

                </div>
                
                <div className="lado-direito-resultado1"></div>

                
            </div>
        </div>

            <Footer/>
            </>
        )
    }
}



import React, { Component } from 'react';

import '../../assets/css/estilo.css';

import '../../assets/css/perfilAdm.css';

import api from '../../services/api';

import Footer from '../../components/Footer/Footer'


export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],

            erroMsg: "",
            successMsg: "",
        }
    }

    componentDidMount() {
        this.getUsuarios();
    }


    getUsuarios = () => {
        api.get('/Usuario')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaUsuario: response.data })
                }
            })
    }

    deleteUser(id){

        this.setState({ successMsg : "" })

        api.delete('/Usuario/'+id)
        .then(response => {
            if(response.status === 200){
                this.setState({ successMsg : "Excluído com sucesso" })

                setTimeout(() => {
                    this.getUsuarios();
                }, 1500);
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Falha ao excluir" })
        })
        
    }



    render() {
        return (
            <>
            <div className="lado-direito-perfil-produtor">

            <div className="container-perfil">
                <div className="container-perfil2">

                    <div className="dados-produtor">
                        {/* <h4>Usuários Cadastrados</h4> */}
                        {
                            this.state.listaUsuario.map(
                                function (u) {
                                    return (
                                      <div className="table">  
                                            <div className="users">

                                                <p><span className="bold-info-type">Nome: </span>{u.nome}</p>
                                                <p><span className="bold-info-type">E-mail: </span>{u.email}</p>
                                            </div>
                                            <div className="btnDelete">
                                            
                                                <button onClick={() => this.deleteUser(u.idUsuario)}>DELETE</button>
                                            </div>
                                        </div>
                                    )
                                }.bind(this)
                            )
                        }
                    </div>

                </div>
             
                <div className="lado-direito-resultado1"></div>

                
            </div>
        </div>

            <Footer/>
            </>
        )
    }
}



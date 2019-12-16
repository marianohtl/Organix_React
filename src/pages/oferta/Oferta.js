import React, { Component, Fragment } from 'react'
//import CardReceita from '../src/components/cardReceita/CardReceita'
import { api, apiFormData } from "../../services/api"
import TextField from '@material-ui/core/TextField';
//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
 
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
 
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
 
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { parseJwt } from "../../services/auth"
import "../../assets/css/receita.css";
 
 
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
 
export default class MinhasOfertas extends Component {
 
    constructor() {
        super();
        this.state = {
            umUsuario: {
                oferta: [],
            },
            listaOfertas: [],
            listaProdutos: [],
            umaOferta: {
                idProdutoNavigation: {
 
                },
                idUsuarioNavigation: {
 
                },
 
            },
            putProduto: {
                idProdutoNavigation: {
                }
            },
            idEscolhido: "",
            open: false,
            openEdit: false,
            successMsg: "",
            erroMsg: "",
            putOferta: {
                idProdutoNavigation: {
                },
                idUsuario: "",
                // 01 - Colocamos o createRef
                imagem: React.createRef()
            }
 
        }
    }
 
    refreshPage() {
        window.location.reload(true);
    }
 
    //#region DELETE
    deleteOferta = (id) => {
 
        this.setState({ successMsg: "" })
 
        api.delete('/oferta/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: "Excluído com sucesso" })
 
                    setTimeout(() => {
                        this.refreshPage();
                    }, 500);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao excluir" })
            })
 
    }
    //#endregion
    openDialog() {
        this.setState({ open: true });
    }
 
    openDialogEdit = (oferta) => {
        this.setState({
            openEdit: true,
            umaOferta: oferta,
            putOferta: oferta
        });
    }
 
    closeDialog() {
        this.setState({
            open: false,
            openEdit: false
        });
    }
 
    componentDidMount() {
        this.getOfertasUsuario();
        this.getOfertas();
    }
 
    getOfertas = () => {
        console.log("Entrando no método de getOfertas: ");
        console.log("Id do Usuario: ", parseJwt().IdUsuario);
 
        api.get('/oferta/idusuario/' + parseJwt().IdUsuario)
            .then(response => {
                // if (response.status === 200) {
                this.setState({ listaOfertas: response.data }, () => console.log("Lista de ofertas: ", this.state.listaOfertas));
                // }
            })
            .catch(err => console.log("Erro: ", err))
    }
 
    getProdutos = () => {
        api.get('/produto/')
        .then(response => {
            if(response.status === 200){
                this.setState({listaProdutos : response.data})
            }
        })
    }
 
 
    //#region GETs
    getOfertasUsuario = () => {
        let id = parseJwt().IdUsuario
        console.log(this.state.umUsuario)
        api.get('/usuario/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umUsuario: response.data })
                    console.log(this.state.umUsuario)
                }
            })
    }
 
    //esta função está recebendo o id da receita que foi mapeada <<<
    visualizarOferta = (idOferta) => {
        api.get('/oferta/' + idOferta)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ umaOferta: response.data })
                    console.log(this.state.umaOferta)
                    this.openDialog()
                }
            })
    }
 
    //#endregion PUT
 
 
    // 02 - Adicionamos um setState específico
    putSetStateFile = (input) => {
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.files[0]
            },
            putProduto: {
                ...this.state.putProduto, [input.target.name]: input.target.files[0]
            }
        })
    }
 
    putSetState = (input) => {
 
        this.setState({
            putOferta: {
                ...this.state.putOferta, [input.target.name]: input.target.value
            }
        })
 
    }
 
 
    putSetStateProd = (input) => {
        this.setState({
            putProduto: {
                ...this.state.putProduto, [input.target.name]: input.target.value
            },
        })
    }
 
 
    putOferta = (event) => {
        event.preventDefault();
        let oferta_id = this.state.putOferta.idOferta;
        let oferta_alterada = this.state.putOferta;
 
        console.log(oferta_id)
        console.log(oferta_alterada)
 
        // 03 - Criamos nosso formData
        let formData = new FormData();
        formData.set('idOferta', this.state.putOferta.idOferta);
        formData.set('idProduto', this.state.putOferta.idProdutoNavigation.idProduto);
        formData.set('nomeProduto', this.state.putOferta.idProdutoNavigation.nomeProduto);
        formData.set('dataVencimento', this.state.putOferta.dataVencimento);
        formData.set('dataFabricacao', this.state.putOferta.dataFabricacao);
        formData.set('produtoEstado', this.state.putOferta.estadoProduto);
        formData.set('idUsuario', this.state.putOferta.idUsuarioNavigation.idUsuario);
 
        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        // Veja no exemplo dado na documentação:
        // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/set
        formData.set('imagem', this.state.putOferta.imagem.current.files[0], this.state.putOferta.imagem.value);
 
 
        // 05 - Não esqueçam de passar o formData
        apiFormData.put('/oferta/' + oferta_id, formData)
            .then(() => {
                this.setState({ successMsg: "Evento alterado com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Falha ao alterar o Oferta" });
            })
        //this.refreshPage()
    }
 
 
    //#endregion
 
    render() {
        return (
            <Fragment>
 
                {/*MODAL INFORMAÇÕES*/}
 
                <Dialog
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}>
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.umaOferta.idProdutoNavigation.nomeProduto}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <table>
 
                                <tr>
                                    <td>Produto: {this.state.umaOferta.idProdutoNavigation.nomeProduto}</td>
                                    <td>Preço: {this.state.umaOferta.preco}</td>
                                </tr>
                                <tr>
                                    <td>Data de produção: {this.state.umaOferta.dataFabricacao}</td>
                                    <td>Data de Validade: {this.state.umaOferta.dataVencimento}</td>
                                </tr>
 
                                <tr>
                                    <td>Vendedor: {this.state.umaOferta.idUsuarioNavigation.nome}</td>
                                    <td>CNPJ: {this.state.umaOferta.idUsuarioNavigation.cpfCnpj}</td>
                                </tr>
                                <tr>
                                    <td>Email: {this.state.umaOferta.idUsuarioNavigation.email}</td>
 
                                </tr>
                            </table>
                        </DialogContentText>
                    </DialogContent>
 
                    <DialogActions>
                        <Button onClick={this.closeDialog.bind(this)} color="primary" >
                            Sair
          </Button>
                    </DialogActions>
                </Dialog>
 
                {/*MODAL EDIÇÃO*/}
 
                <Dialog
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}>
 
                    <DialogTitle id="alert-dialog-slide-title">
 
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className="inputs_block" id="alert-dialog-slide-description">
                            {/*---------------------------------------------- */}
                            <form onSubmit={(e) => this.putOferta(e)} noValidate autoComplete="off">
 
 
                                <Grid container spacin  g={1} direction="column" alignItems="center">
                                   
 
                                    <select id="option__enderecoproduto"
                                        name="idProduto"
                                        value={this.state.listaProdutos.idProduto}
                                        onChange={this.postSetState}
                                    >
                                        <option value="">Escolha um Produto</option>
                                        {
                                            this.state.listaProdutos.map(function (l) {
                                                return (
                                                    <option
                                                        key={l.idProduto}
                                                        value={l.idProduto}
                                                    >
                                                        {l.nomeProduto}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {/*({ target: { name, value } }) => {
                                    console.log('textfield changed', name, value) } */}
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="dataFabricacao" type="date" onChange={this.putSetState} value={this.state.putOferta.dataFabricacao} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="dataVencimento" type="date" onChange={this.putSetState} value={this.state.putOferta.dataVencimento} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="preco" type="number" onChange={this.putSetState} value={this.state.putOferta.preco} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-secondary" color="primary" name="estadoProduto" type="text" onChange={this.putSetState} value={this.state.putOferta.estadoProduto} />
                                    </Grid>
 
 
 
                                    <label htmlFor="icon-button-file">
 
 
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            {
                                                // 06 - Aqui damos nosso "onChange" especial e também passamos nosso "ref"
 
                                            }
                                            <input accept="image/*" className="input_load" id="icon-button-file" type="file" name="imagem" onChange={this.putSetStateFile} ref={this.state.putOferta.imagem} />        <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>
                                <DialogActions>
 
                                    <Button type="submit" color="primary" onClick={e => this.deleteOferta(this.state.idOferta)}>
                                        Excluir
      </Button>
                                    <Button onClick={e => this.putOferta(this.state.idOferta)} type="submit" color="primary">
                                        Salvar
      </Button>
 
                                    <Button onClick={this.closeDialog.bind(this)} type="button" onclick="window.open('', '_self', ''); window.close();" color="primary">
                                        Sair
     </Button>
                                </DialogActions>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
 
 
 
                {/*-----------------------PRINCIPAL----------------------*/}
                <main className="itens-encontrados-cadastro">
 
                    <div className="esquerdo_perfil">
                        <img src="#" alt="avatar do produtor" />
                        <div className="menu_perfil">
                            <h2>Renata Amaral</h2>
                            <p><a href="perfil.html">Perfil</a></p>
                            <p><a href="pesquisar_produtos.html">Buscar Produtos</a></p>
                            <p><a href="receitas.html">Ofertas</a></p>
                            <p><a href="cadastro_receitas.html">Cadastro de Ofertas</a></p>
                            <p><a href="index.html">Dicas</a></p>
                        </div>
                    </div>
                    <div className="lado-direito-resultado">
                        <div className="container-perfil">
                            <h2>Produtos</h2>
 
                            <div className="container-cards">
                                {
                                    this.state.listaOfertas.map(
                                        function (user) {
                                            return (
                                                <Fragment>
 
                                                    <div className="card-produto">
                                                        <div className="imagem-redonda-card-receita">
                                                            <img src={"http://localhost:5000/" + user.idProdutoNavigation.imagem} />
                                                        </div>
                                                        <p className='nome-produto' key={user.idProdutoNavigation.idProduto}>{user.idProdutoNavigation.nomeProduto}</p>
                                                        <div className="uniao_bnt">
                                                            <Button size="small" variant="outlined" color="primary" onClick={e => this.visualizarOferta(user.idOferta)}  >
                                                                Ver Produto
                        </Button>
                                                            <Fab color="secondary" aria-label="edit" onClick={e => this.openDialogEdit(user)}>
                                                                <EditIcon />
                                                            </Fab>
                                                        </div>
                                                    </div>
 
                                                </Fragment>
                                            );
                                        }.bind(this)
                                    )
                                }
 
                                {
                                    /*
                                      <p>
                                        {this.state.umUsuario.nome}
                                      </p>
                                   
                                    */
                                }
 
                            </div>
                            <div className="lado-direito-resultado1"></div>
 
                        </div>
                    </div>
 
                </main>
 
            </Fragment>
 
 
        )
 
 
    }
}
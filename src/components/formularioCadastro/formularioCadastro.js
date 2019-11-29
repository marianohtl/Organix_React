import React, { Component } from 'react';

import '../../assets/css/estilo.css';

// import api from '../../services/api';


export default class FormularioCadastro extends Component {


    render() {
        return (
        <div>
           <main class="main_cadastro_produtor">
               <div class="h1_form">
                    {/* <a href="index.html"><img src="imagens/Ativo 1.png" alt="logo organix"></a> */}
                    <h1>Cadastro</h1>
                </div>
                <div class="container-cadastro-produtor">
                    <div>
                        <form action="#" id="cadastro_produtor" method="POST">
                            <div>
                                <label for="POST-nome-produtor">Nome Completo/Razão Social:</label>
                                <input id="POST-nome-produtor" type="text" placeholder="Digite seu Nome Completo/Razão Social..." name="nome-comprador" class="form_txt media_input_cad"/>

                                <label for="POST-email-produtor">E-mail:</label>
                                <input id="POST-email-produtor" type="email" placeholder="Digite seu Email..." name="email-comprador" class="form_txt media_input_cad"/>

                                <label for="POST-senha-prod">Senha (minímo 6 caracteres):</label>
                                <input id="POST-senha-prod" type="password" placeholder="Digite uma senha..." name="senha-prod" class="form_number media_input_cad"/>

                                <label for="POST-senha-prod2"> Confirme sua senha (minímo 6 caracteres):</label>
                                <input id="POST-senha-prod2" type="password" placeholder="Confirme sua senha..." name="senha-prod2" class="form_number media_input_cad"/>
                            </div>

                            <div class="form_dir">
                                <label for="POST-cep-produtor">CEP:</label>
                                <input id="POST-cep-produtor" type="text" placeholder="Digite seu CEP..."name="nome-produtor" class="form_number media_input_cad"/>
                                
                                <label for="POST-endereco-produtor">Endereço:</label>
                                <input id="POST-endereco-produtor" type="text" placeholder="Digite seu Endereço..." name="endereco-comprador" class="form_txt media_input_cad"/>

                                <label for="POST-cidade-produtor">Cidade:</label>
                                <input id="POST-cidade-produtor" type="text" placeholder="Digite sua Cidade..." name="cidade-produtor" class="form_txt_cidade media_input_cad"/>

                                <label for="POST-estado-produtor">Estado:</label>
                                <select name="POST-estado-produtor" id="POST-estado-produtor" class="form_lista media_input_cad">
                                    <option value="estado">Selecione o Estado</option>
                                    <option value="ac">Acre</option>
                                    <option value="al">Alagoas</option>
                                    <option value="am">Amazonas</option>
                                    <option value="ap">Amapá</option>
                                    <option value="ba">Bahia</option>
                                    <option value="ce">Ceará</option>
                                    <option value="df">Distrito Federal</option>
                                    <option value="es">Espírito Santo</option>
                                    <option value="go">Goiás</option>
                                    <option value="ma">Maranhão</option>
                                    <option value="mt">Mato Grosso</option>
                                    <option value="ms">Mato Grosso do Sul</option>
                                    <option value="mg">Minas Gerais</option>
                                    <option value="pa">Pará</option>
                                    <option value="pb">Paraíba</option>
                                    <option value="pr">Paraná</option>
                                    <option value="pe">Pernambuco</option>
                                    <option value="pi">Piauí</option>
                                    <option value="rj">Rio de Janeiro</option>
                                    <option value="rn">Rio Grande do Norte</option>
                                    <option value="ro">Rondônia</option>
                                    <option value="rs">Rio Grande do Sul</option>
                                    <option value="rr">Roraima</option>
                                    <option value="sc">Santa Catarina</option>
                                    <option value="se">Sergipe</option>
                                    <option value="sp">São Paulo</option>
                                    <option value="to">Tocantins</option>
                                </select>

                                <label for="POST-estado-produtor">Zona:</label>
                                <select name="POST-estado-produtor" id="POST-estado-produtor" class="form_lista media_input_cad">
                                    <option value="zl">Zona Leste</option>
                                    <option value="zn">Zona Norte</option>
                                    <option value="zo">Zona Oeste</option>
                                    <option value="zs">Zona Sul</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
           </main>
        </div>
    )} 
}

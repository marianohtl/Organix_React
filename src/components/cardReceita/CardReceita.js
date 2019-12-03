// import React,{Component} from 'react'
// import api from '../../services/api'


// export default class CardReceita extends Component {

//   constructor(){
//     super();
//     this.state = {
//       listaReceitas: []
//     }

//   }

//   toggle = () => {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }



//   componentDidMount(){
//     this.getReceitas();
//   }

// //#region GETs
  
//  getReceitas = () => {
//     api.get('/receita')
//     .then(response => {
//       if(response.status === 200){
//         this.setState({listaReceitas : response.data})
//       }
//     })
//   }

// //#endregion

//   render() {
//       return(
//         <>
//         <div className="card-produto">
//         <div className="imagem-redonda-card-receita"> </div>
//         { 
//           this.state.listaReceitas.map(
//               function(e){
//                 return(
//                   <>
                  
//                   <p className='nome-produto'>{e.nomeReceita}</p>
//                   <ul>
//                       <li>Tempo de Preparo:{e.tempoPreparo}</li>
//                       <li>Rendimento:{e.porcoes}</li>
//                   </ul>
//                   <button type="button">VER RECEITA</button>

//                     </>
//                     );
//                   })
//                 }
         
//         </div>
//       </>
        
    
//       )
//   }
// }

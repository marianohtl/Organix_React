import React from 'react' ;
import Facebook from '../../assets/img/Facebook.png';
import Twitter from '../../assets/img/Twitter.png';
import Instagram from '../../assets/img/Instagram.png';
// import '../../assets/css/estilo.css';
import mobFacebook from '../../assets/img/facebook-black-social-button-circle.png';
import mobTwitter from '../../assets/img/twitter-logo-button.svg';
import mobInstagram from '../../assets/img/instagram.svg';

function Footer(){
    return(
        <footer>
            <div className = "container-home-footer">
                <div className = "rodapé">
                    <div className = "icone-redesocial-footer">
                        <img src = {Facebook} alt = "Icone Do Facebook"/>
                        <img src = {Twitter} alt = "Icone Do Twitter"/>
                        <img src = {Instagram} alt = "Icone Do Instagram"/>
                    </div>
                    <div className = "centro-footer">
                        <p>©COPYRIGHT</p>
                    </div>
                </div>
                {/* <div className = "icone-redesocial-footer-mobile">
                    <img src = {mobFacebook} alt = "Icone do Facebook"/>
                    <img src = {mobTwitter} alt = "Icone do Twitter"/>
                    <img src = {mobInstagram} alt = "Icone do Instagram"/>      
                </div> */}
            </div>
        </footer>
    )
}
export default Footer;


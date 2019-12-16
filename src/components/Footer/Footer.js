import React from 'react' ;
import Facebook from '../../assets/img/Facebook.png';
import Twitter from '../../assets/img/Twitter.png';
import Instagram from '../../assets/img/Instagram.png';
import '../../assets/css/estilo.css';
// import mobFacebook from '../../assets/img/facebook-black-social-button-circle.png';
// import mobTwitter from '../../assets/img/twitter-logo-button.svg';
// import mobInstagram from '../../assets/img/instagram.svg';

function Footer(){
    return(
        <footer>
            <div className = "container-home-footer">
                <div className = "rodape">
                    <div className = "icone-redesocial-footer">
                       <a target = "_blank" rel="noopener noreferrer" href = "https://www.facebook.com/"><img src = {Facebook} alt = "Icone Do Facebook"/></a>
                       <a target = "_blank" rel="noopener noreferrer" href = "https://twitter.com/?lang=pt"><img src = {Twitter} alt = "Icone Do Twitter"/></a>
                       <a target = "_blank" rel="noopener noreferrer" href = "https://www.instagram.com/?hl=pt-br"><img src = {Instagram} alt = "Icone Do Instagram"/></a>
                    </div>
                    <div className = "centro-footer">
                        <p>©COPYRIGHT</p>
                    </div>
                </div>
               
            </div>
        </footer>
    )
}
export default Footer;


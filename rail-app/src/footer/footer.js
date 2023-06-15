import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer>
            <h2>Get Connected with us</h2>
            <div className="social-media">
                <div>
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </div>
                <div>
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </div>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </div>
                <div>
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

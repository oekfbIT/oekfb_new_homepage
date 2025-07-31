import PropTypes from "prop-types";
import "./style.css";

interface Props {
  className: any;
  vWhite: string;
  sponsorsContainerClassName: any;
}

export const Partners = ({
                           className,
                           vWhite = "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fv-white-1.svg?alt=media&token=68497c24-7f68-4b7c-887b-1c083c1574dd",
                           sponsorsContainerClassName,
                         }: Props): JSX.Element => {
  return (
      <div className={`sponsors ${className}`}>
        <div className={`sponsors-container ${sponsorsContainerClassName}`}>
          <p className="p">
            <span className="span">OFFIZIELLE </span>
            <span className="text-wrapper-2">PARTNER</span>
            <span className="span"> DES ÖKFB</span>
          </p>

          <div className="sponsors-container-2">
            <a href="https://www.sports-selection.at" target="_blank" rel="noopener noreferrer">
              <img
                  className="sportsselection"
                  alt="Sportsselection"
                  src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fsportsselection-2zlg-subl-g-t-1.png?alt=media&token=eb2816ab-9b72-43ca-8a95-8aef1282ddbf"
              />
            </a>

            <a href="https://www.westsidesoccer.at/" target="_blank" rel="noopener noreferrer">
              <img className="image-2" alt="Image" src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fimage-1-1.png?alt=media&token=aaa1f15a-378e-40aa-990c-497d950b9b5d" />
            </a>

            <a href="https://www.veo.co/de" target="_blank" rel="noopener noreferrer">
              <img className="image-3" alt="Image" src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2Fimage-2-1.png?alt=media&token=93cda297-1700-4e81-b782-99f746ec29a4" />
            </a>

            <a href="https://www.minifootball.com/" target="_blank" rel="noopener noreferrer">
              <img className="image-4" alt="Image" src="https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Fpartner%2FwmfLogo.png?alt=media&token=1508d0ab-bfc8-4126-aebc-10c43acf2b48" />
            </a>

            <a href="https://www.minifootball.eu/" target="_blank" rel="noopener noreferrer">
              <img className="v-white" alt="V white" src={vWhite} />
            </a>
          </div>
        </div>
      </div>
  );
};

Partners.propTypes = {
  vWhite: PropTypes.string,
};

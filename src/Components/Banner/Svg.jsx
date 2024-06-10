import Lottie from "lottie-react";
import bannerSvg from '../../assets/animations/banner.json'

const Svg = () => {
    return (
        <Lottie
         animationData={bannerSvg}
        ></Lottie>
    );
};

export default Svg;
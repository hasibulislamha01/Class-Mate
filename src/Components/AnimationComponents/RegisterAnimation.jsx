import Lottie from "lottie-react";
import registrationAnimation from '../../assets/animations/register.json'

const RegisterAnimation = () => {
    // const styles = {
    //     height: '350px',
    //     width: '500px'
    // }
    return (
        <>
            <Lottie
                animationData={registrationAnimation}
                // style={styles}
                className="w-full lg:w-[500px]"
            ></Lottie>
        </>
    );
};

export default RegisterAnimation;
import Lottie from 'lottie-react';
import classRoom from '../../assets/animations/class.json'

const ClassAnimation = () => {
    const styles = {
        height: '300px',
        width: '400px'
    }
    return (
        <div>
            <Lottie
                animationData={classRoom}
                style={styles}
            ></Lottie>
        </div>
    );
};

export default ClassAnimation;
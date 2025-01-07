import { Card } from 'antd';
import PropTypes from 'prop-types';

const FeatureCard = ({ title, description, icon }) => {
    return (
        <Card
            title={
                <div className='pt-5 pb-3 flex flex-col items-start gap-2'>
                    <h1 className='text-primary'>{icon}</h1>
                    <h1 className=' text-primary dark:text-primary'>{title}</h1>
                </div>
            }
            bordered={false}
            style={{
                // width: 250,
                height: 230,
            }}
            styles={{
                header:{
                    borderBottom: `0px solid #96CBEF`,
                }
            }}
            className='justify-center bg-accent dark:bg-dark-accent text-text dark:text-dark-text shadow-lg shadow-primary dark:shadow-dark-primary'
        >
            <p className='text-justify text-[0.8rem] lg:text-[0.85rem]'>
                {description}
            </p>
        </Card>
    );
};

FeatureCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.element
}
export default FeatureCard;
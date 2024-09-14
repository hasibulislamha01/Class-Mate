import PropTypes from 'prop-types'

const TutorCard = ({ tutor }) => {
    console.log(tutor);
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-[250px] h-[200px] rounded-[30px]">
            
            {/* tutor image */}
            <img src={tutor.userPhoto} alt="tutor image" className="w-32 h-32 rounded-full object-cover p-2 border-2 border-primary" 
            />
            <h1 className="font-bold">{tutor.userName}</h1>
        </div>
    );
};

TutorCard.propTypes = {
    tutor: PropTypes.object 
}

export default TutorCard;
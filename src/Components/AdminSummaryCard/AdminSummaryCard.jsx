import PropTypes from 'prop-types'
import useUserCount from '../../CustomHooks/useUserCount';


const AdminsSummaryCard = ({ role }) => {
    
    const userCount = useUserCount(role)
    console.log(userCount, role);

    return (
        <div className="rounded-[10px] bg-slate-100 p-2 w-full">
            <h1 className="text-2xl">{userCount}</h1>
            <p>{role}</p>
        </div>
    );
};

AdminsSummaryCard.propTypes = {
    role: PropTypes.string
}

export default AdminsSummaryCard;
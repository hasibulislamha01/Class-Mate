import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';

const UsersSummaryCard = ({ role }) => {
    // console.log(role);
    const axiosSecure = useAxiosSecure()
    const baseUrl = import.meta.env.VITE_LOCAL_URL
    const url = `${baseUrl}/users/numbers/${role}`

    const [total, setTotal] = useState(0)
    // console.log(total);

    useEffect(() => {
        axiosSecure.get(url)
            .then(res => {
                setTotal(res?.data.length);
            }).catch(error => {
                console.error(error?.message)
            })
    }, [url, axiosSecure])

    return (
        <div className="rounded-[10px] bg-slate-100 p-2 w-full">
            <h1 className="text-2xl">{total}</h1>
            <p>{role}</p>
        </div>
    );
};

UsersSummaryCard.propTypes = {
    role: PropTypes.string
}

export default UsersSummaryCard;
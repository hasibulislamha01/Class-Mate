import { Input } from "antd";
import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const TopBar = ({ userName, userPhoto, userRole }) => {
    return (
        <div className="bg-accent dark:bg-dark-accent py-3 flex items-center">

            {/* logo */}
            <Link to={'/'} className="w-11 md:w-[20%] lg:w-60 flex items-center justify-center gap-2">
            
                {/* icon */}
                <div className="w-6 h-6 border-blue-200">
                    <img src="/favicon.png" alt="logo" className="w-full h-full rounded-full" />
                </div>
                <h1 className="hidden md:inline-flex text-lg font-semibold">
                    <span className="text-primary">Class</span>
                    Mate</h1>

            </Link>

            <div className="w-full pr-5 lg:pr-8 flex justify-end md:justify-between ">
                {/* search */}
                <Input
                    placeholder="Search"
                    className="hidden lg:flex bg-background dark:bg-dark-background w-60 text-text dark:text-dark-text"
                    prefix={<SearchOutlined key={'search'} />}
                />

                <div className="flex items-center justify-end gap-4">
                    <BellOutlined key='bell' />
                    <img src={userPhoto} alt="" className="h-8 w-8 object-cover rounded-full" />
                    <div className="flex flex-col">
                        <h5 className="text-sm hidden md:block">{userName}</h5>
                        <h4 className="text-sm font-semibold">{userRole}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

TopBar.propTypes = {
    userName: PropTypes.string,
    userPhoto: PropTypes.string,
    userRole: PropTypes.string,
}
export default TopBar;
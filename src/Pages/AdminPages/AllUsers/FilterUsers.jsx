import { useState } from "react";

const FilterUsers = ({ filterUser }) => {

    const [role, setRole] = useState('')

    const toggleBtnStyle = () => {
        // changing styles on click
        const adminButton = document.getElementById('Administrator')
        const tutorButton = document.getElementById('Tutor')
        const studentButton = document.getElementById('Student')

        if (role === 'Administrator') {
            adminButton.classList.add('activeRoleButton')
            tutorButton.classList.remove('activeRoleButton')
            studentButton.classList.remove('activeRoleButton')
        }
        else if (role === 'Tutor') {
            tutorButton.classList.add('activeRoleButton')
            adminButton.classList.remove('activeRoleButton')
            studentButton.classList.remove('activeRoleButton')
        }
        else if(role === 'Student') {
            studentButton.classList.add('activeRoleButton')
            tutorButton.classList.remove('activeRoleButton')
            adminButton.classList.remove('activeRoleButton')
        }
    }

    return (
        <div className="text-[#9ca3af] font-semibold text-lg w-1/2 mx-auto rounded-lg py-2 flex items-center justify-center gap-12 bg-[#082f49]">
            <div id="Administrator" className="filterUser" onClick={() => {
                filterUser('Administrator'),
                setRole('Administrator'),
                toggleBtnStyle()
            }}>
                Admin
            </div>
            <div id="Tutor" className="filterUser" onClick={() => {
                filterUser('Tutor'),
                setRole('Tutor'),
                toggleBtnStyle()
            }}>
                Tutors
            </div>
            <div id="Student" className="filterUser" onClick={() => {
                filterUser('Student'),
                setRole('Student'),
                toggleBtnStyle()
            }}>
                Students
            </div>
        </div>
    );
};

export default FilterUsers;
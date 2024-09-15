import PropTypes from 'prop-types'

const TableView = ({ sessions, handleRedirect }) => {




    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>Session Title</th>
                    <th className="hidden lg:table-cell text-left">Tutor Name</th>
                    <th className="hidden md:table-cell text-left">Deadline</th>
                    <th>See Details</th>
                </tr>
            </thead>

            <tbody>
                {
                    sessions?.map(session =>
                        <tr key={session?._id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar hidden md:block">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={session.sessionImage}
                                                alt='session image'
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-left">{session.sessionTitle}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="hidden lg:table-cell">
                                {session.tutorName}
                            </td>
                            <td className="hidden md:table-cell">{session?.registrationEnds}</td>
                            <th>

                                <button className="btn btn-ghost btn-xs" onClick={() => handleRedirect(`/sessionDetails/${session._id}`)}>details</button>

                            </th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

TableView.propTypes = {
    sessions: PropTypes.array,
    handleRedirect: PropTypes.func
}
export default TableView;
import PropTypes from 'prop-types'
import ShowTable from '../../Components/UI/ShowTable/ShowTable';
import { Link } from 'react-router-dom';

const sessionColumns = [
    // {
    //     title: 'Session ',
    //     dataIndex: 'thumbnail',
    //     key: 'thumbnail',
    // },
    {
        title: 'Session Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, record) => (
            <div className='flex items-center gap-3'>
                <div className='h-8 w-8 '>
                    <img src={record?.thumbnail} alt="session image" className='h-full w-full rounded-full' />
                </div>
                <h3><Link to={`/sessions/${record.id}`}>{title}</Link></h3>
            </div>
        ),
    },
    {
        title: 'Duration (Hours)',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Tutor',
        dataIndex: 'tutor',
        key: 'tutor',
    },
    // {
    //     title: '',
    //     dataIndex: 'address',
    //     key: 'address',
    // },
]

const TableView = ({ sessions }) => {

    const tableItems = sessions?.map((session, index) => {
        // console.log(index, session)
        return (
            {
                key: index + 1,
                id: session._id,
                title: session.sessionTitle,
                thumbnail: session.sessionImage,
                duration: session.duration,
                tutor: session.tutorName
            }
        )
    })
    // console.log(sessions, tableItems);


    return (
        <ShowTable columns={sessionColumns} dataSource={tableItems} />
    );
};

TableView.propTypes = {
    sessions: PropTypes.array,
    handleRedirect: PropTypes.func
}
export default TableView;
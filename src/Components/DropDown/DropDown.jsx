import { Dropdown, message, Space } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};
const items = [
    {
        label: 'Request a new approval',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];
const App = () => (
    <Dropdown
        menu={{
            items,
            onClick,
        }}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space className='mr-3 mt-3 text-lg'>
                <BsThreeDotsVertical />
            </Space>
        </a>
    </Dropdown>
);
export default App;
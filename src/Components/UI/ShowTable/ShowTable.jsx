import { Table } from "antd";
import PropTypes from "prop-types";

const ShowTable = ({dataSource, columns}) => {
    return (
        <Table dataSource={dataSource} columns={columns} pagination={false} />
    );
};


ShowTable.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array
}
export default ShowTable;
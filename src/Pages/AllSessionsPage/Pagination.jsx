import { useState } from "react";

const Pagination = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return <Pagination current={current} onChange={onChange} total={50} />;
};

export default Pagination;
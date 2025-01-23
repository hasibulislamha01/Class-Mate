import { Card } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const TabCard = ({ cardTitle, tabList, defaultTabkey, image, contentList }) => {

    // antD card controlling logics
    const [activeTabKey, setActiveTabKey] = useState(defaultTabkey);

    const onTabChange = (key) => {
        setActiveTabKey(key);
    };




    return (
        <Card
            title={cardTitle}
            style={{
                width: '100%',
            }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            tabBarExtraContent={<a href="#">More</a>}
            onTabChange={onTabChange}
            tabProps={{
                size: 'middle',
            }}
            className="shadow-md shadow-primary/10"
        >
            <div className="flex items-center gap-3">
                <div className="h-28 w-40">
                    <img
                        src={image}
                        alt="Static Content"
                        className="h-full w-full object-cover rounded-md"
                    />
                </div>
                {contentList[activeTabKey]}
            </div>
        </Card>

    );
};

TabCard.propTypes = {
    tabList: PropTypes.array,
    defaultTabkey: PropTypes.any,
    image: PropTypes.string,
    contentList: PropTypes.object,
    cardTitle: PropTypes.node
}
export default TabCard;
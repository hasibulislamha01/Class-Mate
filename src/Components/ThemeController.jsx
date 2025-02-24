import { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';


const ThemeController = () => {

    const { toggleTheme } = useContext(AuthContext)

    return (
        <label className="grid cursor-pointer place-items-center">
            
            <Switch
                onChange={toggleTheme}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
            />
        </label>
    );
};

export default ThemeController;
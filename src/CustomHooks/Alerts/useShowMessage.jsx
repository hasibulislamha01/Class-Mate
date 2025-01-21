import { message } from "antd";

const useShowMessage = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        console.log('hitting message');
        messageApi.open({
            type: 'success',
            content: message,
        });
    };
    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };
    const warning = (message) => {
        messageApi.open({
            type: 'warning',
            content: message,
        });
    };

    const alerts = {
        success,
        error,
        warning
    }


    return (
        alerts
    )
};

export default useShowMessage;
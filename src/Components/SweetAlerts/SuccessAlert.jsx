import Swal from "sweetalert2";

const SuccessAlert = ({title, message}) => {
    return (
        Swal.fire({
            title: {title},
            text: {message},
            icon: "success"
        })
    );
};

export default SuccessAlert;
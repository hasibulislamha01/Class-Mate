import Swal from "sweetalert2";

const useConfirmAlert = (title, message, confirmButtonText, confirmedTitle, confirmedMessage ) => {
    return (
        Swal.fire({
            title: {title},
            text: {message},
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: {confirmButtonText}
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: {confirmedTitle},
                    text: {confirmedMessage},
                    icon: "success"
                });
            }
        })
    );
};

export default useConfirmAlert;
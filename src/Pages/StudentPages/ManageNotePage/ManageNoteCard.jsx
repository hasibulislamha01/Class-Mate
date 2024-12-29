import { Button, Card, Modal } from "antd";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAuth from "../../../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { AuthContext } from "../../../Components/Auth/AuthProvider";
import PropTypes from "prop-types";

const ManageNoteCard = ({ note }) => {

    const { user } = useAuth()
    const { theme } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [title, setTitle] = useState(note?.noteTitle)
    const [description, setDescription] = useState(note?.noteDescription)


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = () => {

        const data = {
            title, description
        }
        console.log(data)
        axiosSecure.patch(`/notes/${user?.email}`, data)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "You updated the note!",
                        icon: "success"
                    });
                }
            })
            .catch(err => {
                console.error(err.message)
            })

    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleDelete = () => {
        axiosSecure.delete(`/notes/${user?.email}`)
            .then(res => {
                console.log(res.data)
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "You deleted the note!",
                        icon: "success"
                    });
                }
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    // console.log(note);
    return (
        <Card
            className="text-text dark:text-dark-text shadow-lg dark:bg-dark-accent dark:border-dark-accent"
            title={
                <div className="text-lg font-bold text-text dark:text-dark-text">
                    {note?.noteTitle}
                </div>
            }
            bordered={false}
            style={{
                width: 300,
            }}
            styles={{
                header: {
                     borderBottom: `1px solid ${theme === 'dark' ? "#333333" : "#D1D5DB"}`,
                }
            }}



        >
            <div className="flex flex-col justify-between border-none">
                <p>
                    {note?.noteDescription}
                </p>
                <div className="flex items-center justify-end mt-12 gap-3">
                    <Button onClick={showModal}>
                        <FaPen />
                    </Button>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} afterClose={handleUpdate}
                    className="dark:bg-dark-accent"
                    >
                        <form className="space-y-3" onSubmit={handleUpdate}>
                            <label htmlFor="">Update title: </label>
                            <input
                                type="text"
                                name="updatedTitle"
                                placeholder="Update Title"
                                defaultValue={note?.noteTitle}
                                onChange={handleTitleChange}
                                className="input input-bordered w-full max-w-xs"
                            /> <br />

                            <label htmlFor="">Update description: </label>
                            <input
                                type="text"
                                placeholder="Update Description"
                                onChange={handleDescriptionChange}
                                defaultValue={note?.noteDescription}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <button className="btn bg-accent dark:bg-dark-accent text-text dark:text-dark-text" type="submit">Update</button>
                        </form>
                    </Modal>
                    <Button onClick={handleDelete} className="">
                        <MdDelete size={20} />
                    </Button>
                </div>
            </div>

        </Card>
    );
};

ManageNoteCard.propTypes = {
    note: PropTypes.object
}

export default ManageNoteCard;
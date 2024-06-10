import { Button, Card, Modal } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAuth from "../../../CustomHooks/useAuth";
import Swal from "sweetalert2";

const ManageNoteCard = ({ note }) => {

    const {user} = useAuth()
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

    const handleUpdate =() => {

        const data = {
            title, description
        }
        console.log(data)
        axiosSecure.patch(`/notes/${user?.email}`, data)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount){
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
            if(res.data.deletedCount){
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
            title={note?.noteTitle}
            bordered={true}
            style={{
                width: 300,
            }}
        >
            <div className="flex flex-col justify-between">
                <p>
                    {note?.noteDescription}
                </p>
                <div className="flex items-center mt-12 gap-3">
                    <Button onClick={showModal}>Update</Button>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} afterClose={handleUpdate}>
                        <form className="space-y-3"  onSubmit={handleUpdate}>
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
                            <button type="submit">Update</button>
                        </form>
                    </Modal>
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            </div>

        </Card>
    );
};

export default ManageNoteCard;
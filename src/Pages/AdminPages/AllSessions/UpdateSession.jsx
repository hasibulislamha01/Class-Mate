import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from 'react-select'



const UpdateSession = () => {

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const query = useParams()
    const sessionId = query?.id
    const [sessionArr, setSessionArr] = useState([])
    // console.log(sessionId)

    // const queryData = useGetLatestData('updatedSession', `/sessions/${sessionId}`)
    // console.log('query data: ',queryData)
    // const [session] = queryData[0]
    // const refetch = queryData[1]
    useEffect(() => {
        axiosSecure.get(`/sessions/${sessionId}`)
            .then(res => {
                console.log(res.data)
                setSessionArr(res.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [sessionId])

    const session = sessionArr[0]

    const sessionTitle = session?.sessionTitle
    const sessionImg = session?.sessionImage

    console.log(sessionTitle, sessionImg)

    const paymentOptions = [
        { value: 'paid', label: 'Paid' },
        { value: 'free', label: 'Free' }
    ]


    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        const amountContainer = document.getElementById('amountContainer')
        const amountField = document.getElementById('amountField')
        const submitButton = document.getElementById('submit-button')

        if (selectedOption?.value === 'paid') {
            amountContainer.classList.remove('hidden')
            amountField.setAttribute('required', true)
            amountField.setAttribute('name', 'amount')
            submitButton.classList.add('mt-6')
        }
        else {
            amountContainer.classList.add('hidden')
            amountField.removeAttribute('required', true)
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault()
        const form = event.target;
        // const paymentStatus = form.paymentStatus.value;
        const amount = form?.amount?.value;
        const defaultAmount = '0'
        const newStatus = 'approved'

        let info = {}
        if (selectedOption?.value === 'paid') {
            info = { newStatus, amount }
        }
        else {
            info = { newStatus, defaultAmount }
        }
        console.log(info)

        Swal.fire({
            title: "Are you sure?",
            customClass: 'swal-container',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Update Session`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/sessions/${sessionId}`, info)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            // refetch()
                            Swal.fire({
                                title: 'Success',
                                text: `You have Updated the session`,
                                icon: "success",
                            });

                        }
                        else {
                            Swal.fire({
                                title: "The session wasn't updated",
                                text: "You provided the same data the session had before",
                                icon: "question"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

            }
            else {
                navigate('/dashboard/admin/allSessions')
            }
        })

    }


    return (
        <div>
            <h1 className="text-center text-3xl">Update Session</h1>
            <div className="py-12 flex flex-col lg:flex-row justify-center items-center gap-12">
                <div className="space-y-6 text-center lg:w-2/5">
                    <h1 className="text-2xl">{sessionTitle}</h1>
                    <img src={sessionImg} alt="" />
                    <p className="text-lg">Expected Time: {session?.duration} hours</p>
                </div>
                <form onSubmit={handleUpdate} className="w-full lg:w-2/5 flex flex-col gap-6 p-4 ">

                    <div>
                        <p>Is the Session Paid ?</p>
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            id='select'
                            required
                            name='paymentStatus'
                            options={paymentOptions}
                            className="z-50"
                            placeholder='Select one'
                        />
                    </div>

                    <div id="amountContainer" className="input-container hidden">
                        <p>If paid, Enter amont</p>
                        <input
                            id="amountField"
                            type="number"
                        />
                    </div>
                    <button id="submit-button" type="submit" className="btn ">Update</button>
                </form>
            </div>

        </div>
    );
};

export default UpdateSession;
// frontend/src/components/CreateUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ authToken, onCreateUser, showModal, setShowModal }) => {

    //const [showModal, setShowModal] = useState(false);

    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        street: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('api/create', userDetails, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);

            // Trigger a callback to reload the customer list or perform other actions
            onCreateUser();

            // Clear the form fields after successful creation
            setUserDetails({
                first_name: '',
                last_name: '',
                street: '',
                address: '',
                city: '',
                state: '',
                email: '',
                phone: '',
            });
        } catch (error) {
            console.error('Create user error:', error);
            // Handle error
        }
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            Close 2
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className="mt-4 w-[80%]">
                                        <div className="mb-4 w-full flex justify-between gap-10">
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={userDetails.first_name}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={userDetails.last_name}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4 w-full flex justify-between gap-10">
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={userDetails.email}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={userDetails.phone}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4 w-full flex justify-between gap-10">
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={userDetails.street}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={userDetails.address}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4 w-full flex justify-between gap-10">
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={userDetails.city}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={userDetails.state}
                                                    onChange={handleInputChange}
                                                    className="border-2 rounded px-4 py-1 w-full"
                                                />
                                            </div>
                                        </div>

                                        <button type="button" onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-2 mt-4">
                                            Create User
                                        </button>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <div>
                        <h2 className="text-2xl font-bold mt-6">Create User</h2>
                        
                    </div>
                </>
            ) : null}
            
        </>
    );
};

export default CreateUser;

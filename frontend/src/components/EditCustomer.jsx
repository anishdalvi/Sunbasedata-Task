// frontend/src/components/EditCustomer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EditCustomer = ({ customer, authToken, onClose, onEdit, showModal, setShowModal }) => {
    const [editedCustomer, setEditedCustomer] = useState({ ...customer });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
    };

    const handleUpdateCustomer = async () => {
        try {
            const response = await axios.post(
                'api/update',
                { ...editedCustomer },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            //console.log(response.data);
            // Trigger the onEdit callback with the updated customer data
            onEdit(response.data);
            // Close the edit modal
            setShowModal(false);
        } catch (error) {
            console.error('Error updating customer:', error);
            // Handle error
        }
    };

    return (
        <>
            {showModal ? (
                <>
                    <form
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold ml-2">
                                        Edit Customer
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-black opacity-60 font-semibold text-xl flex items-center pr-2"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span> x </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-4 w-full flex justify-between gap-10">
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editedCustomer.first_name}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editedCustomer.last_name}
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
                                                value={editedCustomer.email}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editedCustomer.phone}
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
                                                value={editedCustomer.street}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={editedCustomer.address}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2 w-full flex justify-between gap-10">
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={editedCustomer.city}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={editedCustomer.state}
                                                onChange={handleInputChange}
                                                className="border-2 rounded px-4 py-1 w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* modal footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-red-500 hover:bg-red-600 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 rounded-lg"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdateCustomer}
                                        className="text-white bg-emerald-500 hover:bg-emerald-700 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150 rounded-lg"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* Overlay */}
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default EditCustomer;

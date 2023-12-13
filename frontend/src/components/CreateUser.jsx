// frontend/src/components/CreateUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ authToken, onCreateUser }) => {
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
        <div>
            <h2 className="text-2xl font-bold mt-6">Create User</h2>
            <form className="mt-4 w-[80%]">
                <div className="mb-4 w-full flex justify-between">
                    <div className='flex gap-10 items-center'>
                        <label className=" text-gray-700 text-base font-bold mb-2">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={userDetails.first_name}
                            onChange={handleInputChange}
                            className="border-2 rounded px-4 py-2 w-[200px]"
                        />
                   </div>

                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={userDetails.last_name}
                            onChange={handleInputChange}
                            className="border-2 rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                    <input
                        type="text"
                        name="street"
                        value={userDetails.street}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <input
                        type="text"
                        name="city"
                        value={userDetails.city}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <input
                        type="text"
                        name="state"
                        value={userDetails.state}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        className="border-2 rounded px-4 py-2 w-full"
                    />
                </div>

                <button type="button" onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-2 mt-4">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;

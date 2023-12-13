// frontend/src/components/CustomerManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomer from './EditCustomer';
import CreateUser from './CreateUser'; // Import the CreateUser component
import Modal from './Modal';


const CustomerManagement = ({ authToken }) => {
    const [customerList, setCustomerList] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [creatingUser, setCreatingUser] = useState(false); // Track whether to show the CreateUser form

    useEffect(() => {
        // Fetch customer list when the component mounts
        loadCustomerList();
    }, [authToken]);

    const loadCustomerList = async () => {
        try {
            const response = await axios.get('api/get_customer_list', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setCustomerList(response.data);
        } catch (error) {
            console.error('Error loading customer list:', error);
        }
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
    };

    const handleCloseEdit = () => {
        setEditingCustomer(null);
    };

    const handleUpdateCustomer = (updatedCustomer) => {
        // Find the index of the updated customer in the list
        const index = customerList.findIndex((c) => c.uuid === updatedCustomer.uuid);
        // Create a new array with the updated customer
        const updatedList = [...customerList];
        updatedList[index] = updatedCustomer;
        // Update the state with the new list
        setCustomerList(updatedList);
        loadCustomerList();
        setEditingCustomer(null); // Close the edit form
    };

    const handleDeleteCustomer = async (uuid) => {
        try {
            const response = await axios.post(
                'api/delete',
                { uuid },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log(response.data);
            // Reload customer list after successful deletion
            loadCustomerList();
        } catch (error) {
            console.error('Error deleting customer:', error);
            // Handle error
        }
    };

    const handleCreateUser = () => {
        setCreatingUser(true);
    };

    const handleCloseCreateUser = () => {
        setCreatingUser(false);
    };

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='mt-6 text-center text-3xl font-bold'>Customer Management</h1>
            <Modal />

            <div className='text-right'>
                <button onClick={handleCreateUser} className='px-3 py-1 mt-10 text-sm text-white font-semibold bg-blue-500 hover:bg-blue-800 rounded-lg'>Add Customer</button>
            </div>

            {creatingUser && (
                <CreateUser authToken={authToken} onCreateUser={() => { loadCustomerList(); setCreatingUser(false); }} />
            )}

            <table className='table-auto w-full mt-7 text-left'>
                {/* Display customer list in a table */}
                <thead>
                    <tr>
                        <th>First Name </th>
                        <th>Last Name</th>
                        <th>Street</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => (
                        <tr key={customer.uuid}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.street}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td className='flex gap-4'>
                                <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                                <button onClick={() => handleDeleteCustomer(customer.uuid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingCustomer && (
                <EditCustomer
                    customer={editingCustomer}
                    authToken={authToken}
                    onClose={handleCloseEdit}
                    onEdit={handleUpdateCustomer}
                />
            )}
        </div>
    );
};

export default CustomerManagement;

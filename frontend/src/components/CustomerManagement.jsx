// frontend/src/components/CustomerManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomer from './EditCustomer';
import CreateUser from './CreateUser'; 



const CustomerManagement = ({ authToken }) => {
    const [customerList, setCustomerList] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [creatingUser, setCreatingUser] = useState(false); // Track whether to show the CreateUser form
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
        setShowEditModal(true);
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
            //console.log(response.data);
            // Reload customer list after successful deletion
            loadCustomerList();
        } catch (error) {
            console.error('Error deleting customer:', error);
            // Handle error
        }
    };

    const handleCreateUser = () => {
        setCreatingUser(true);
        setShowCreateModal(true);
    };

    const handleCloseCreateUser = () => {
        setCreatingUser(false);
        setShowCreateModal(false);
    };

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='mt-6 text-center text-3xl font-bold'>Customer Management</h1>

            <div className='text-right'>
                <button onClick={handleCreateUser} className='px-3 py-2 mt-10 text-sm uppercase text-white font-semibold bg-blue-500 hover:bg-blue-800 rounded-lg'>Add Customer</button>
            </div>

            {creatingUser && (
                <CreateUser
                    authToken={authToken}
                    onCreateUser={() => {
                        loadCustomerList();
                        setCreatingUser(false);
                        setShowCreateModal(false);
                    }}
                    showModal={showCreateModal}
                    setShowModal={setShowCreateModal}
                />
            )}

            <table className='table-auto w-full mt-7 text-left border-2'>
                {/* Display customer list in a table */}
                <thead>
                    <tr className='bg-red-300  border-2'>
                        <th>First Name </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Street</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Added slice method as people were adding many letters first name */}
                    {customerList.map((customer) => (
                        <tr key={customer.uuid} className='border-b border-2'>
                            <td>{customer.first_name.slice(0,10)}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.street}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td className='flex flex-row gap-4'>
                                <button onClick={() => handleEditCustomer(customer)}> <span className='bg-slate-600 hover:bg-slate-900 px-2 py-1 rounded-md text-white'>Edit</span> </button>
                                <button onClick={() => handleDeleteCustomer(customer.uuid)}> <span className='bg-red-700 hover:bg-red-900 px-2 py-1 rounded-md text-white'>Delete</span> </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingCustomer && (
                <EditCustomer
                    customer={editingCustomer}
                    authToken={authToken}
                    onClose={() => {
                        handleCloseEdit();
                        setShowEditModal(false);
                    }}
                    onEdit={handleUpdateCustomer}
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                />
            )}
        </div>
    );
};

export default CustomerManagement;

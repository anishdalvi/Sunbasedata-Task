// frontend/src/components/CustomerManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerManagement = ({ authToken }) => {
    const [customerList, setCustomerList] = useState([]);

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
            // Handle error
        }
    };

    const handleEditCustomer = (uuid) => {
        // Implement the logic for editing a customer
        console.log(`Edit customer with UUID: ${uuid}`);
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

    return (
        <div className='w-full'>
            <h1 className='mt-6 text-center text-3xl font-bold'>Customer Management</h1>
            <table className='table-auto w-[90%] mx-auto mt-7 text-left'>
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
                                <button onClick={() => handleEditCustomer(customer.uuid)}>Edit</button>
                                <button onClick={() => handleDeleteCustomer(customer.uuid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerManagement;

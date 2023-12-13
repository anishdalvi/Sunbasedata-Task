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

    return (
        <div>
            <h1>Customer Management</h1>
            <table>
                {/* Display customer list in a table */}
                <thead>
                    <tr>
                        <th>First Name</th>
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
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerManagement;

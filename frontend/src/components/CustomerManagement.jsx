import React, { useState, useEffect } from 'react';

const CustomerManagement = ({ authToken }) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        // Fetch logged-in user details
        fetchUserDetails();

        // Fetch customer list
        fetchCustomerList();
    }, [authToken]); // Update when authToken changes

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                body: JSON.stringify({
                    "login_id": "test@sunbasedata.com",
                    "password": "Test@123",
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const userData = await response.json();
            setLoggedInUser(userData);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchCustomerList = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get_customer_list', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch customer list');
            }

            const customerListData = await response.json();
            setCustomerList(customerListData);
        } catch (error) {
            console.error('Error fetching customer list:', error);
        }
    };

    const deleteCustomer = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete?uuid=${uuid}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                },
            });

            if (response.ok) {
                alert('Customer deleted successfully');
                // Reload customer list after successful deletion
                fetchCustomerList();
            } else {
                throw new Error('Customer deletion failed');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const updateCustomer = async (uuid) => {
        // Implement logic to update customer
        console.log('Update customer with UUID:', uuid);
    };

    return (
        <div>
            <h1>Welcome, {loggedInUser.name}</h1>

            <h2>Customer List</h2>
            <table>
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
                    {customerList.map(customer => (
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
                                <button onClick={() => updateCustomer(customer.uuid)}>Update</button>
                                <button onClick={() => deleteCustomer(customer.uuid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerManagement;

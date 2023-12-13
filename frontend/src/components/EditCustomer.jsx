// frontend/src/components/EditCustomer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EditCustomer = ({ customer, authToken, onClose, onEdit }) => {
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
            console.log(response.data);
            // Trigger the onEdit callback with the updated customer data
            onEdit(response.data);
            // Close the edit modal
            onClose();
        } catch (error) {
            console.error('Error updating customer:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Edit Customer</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="first_name"
                    value={editedCustomer.first_name}
                    onChange={handleInputChange}
                />
            </label>
            {/* Add similar inputs for other fields */}
            <button onClick={handleUpdateCustomer}>Update</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default EditCustomer;

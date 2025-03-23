import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory } from '../Services/apiService';
import { toast } from 'react-toastify';
import { addCategoryResponseContext } from '../context/ContextApi';

function AddCategory() {
    const [category, setCategory] = useState({
        name: "", 
        image: ''
    });
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (category.image) {
            setPreview(URL.createObjectURL(category.image));
        } else {
            setPreview('');
        }
    }, [category.image]);

    const { setAddCategory } = useContext(addCategoryResponseContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle the form submission
    const handleAdd = async () => {
        const { name, image } = category;
        console.log(category)
        // Validate input fields
        if (!name || !image) {
            toast.warning('Please enter a category name and select an image');
            return;
        }

        // Create FormData for the request
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image); // Add the image file to FormData

        // Set headers for the API call
        const headers = {
            'Content-Type': 'multipart/form-data', // Set the appropriate content type for file uploads
            'Authorization': `Token ${localStorage.getItem('token')}`, // Ensure valid token if needed
        };

        try {
            const res = await addCategory(formData, headers);  // Pass formData to the API function
            console.log(`From handleAdd`, res);

            if (res.status === 201) { // Assuming 201 Created for success
                toast.success('Category added successfully');
                setAddCategory((prevCategories) => [...prevCategories, res.data]); // Update the category list
                setCategory({ name: '', image: null }); // Reset input fields
                handleClose(); // Close modal
            } else {
                toast.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error); // Log the error for debugging
            toast.error('Error adding category: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        }
    };

    return (
        <>
            <button className='btn btn-success my-2' onClick={handleShow}>Add</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingCat" label="Category">
                        <Form.Control
                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                            type="text"
                            placeholder="Electronics"
                        />
                    </FloatingLabel>

                    <label>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            name="image" // Ensure this matches the backend field name
                            onChange={(e) => setCategory({ ...category, image: e.target.files[0] })}
                        />
                        <img
                            className='img-fluid'
                            src={preview || "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"}
                            style={{ cursor: "pointer" }}
                            alt="Category Preview"
                        />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCategory;

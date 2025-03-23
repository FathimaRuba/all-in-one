import React, { useState, useEffect } from 'react';
import HeaderSp from '../Components/HeaderSp';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Row, Col } from 'react-bootstrap';
import base_url from '../Services/base_url';
import { profileUpdate, getCategory } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';

function ProfileSp() {
    const nav = useNavigate()
    const [cat, setCat] = useState([])
    const [profile, setProfile] = useState("");
    const [preview, setPreview] = useState("");
    const [isEditing, setIsEditing] = useState(false); // New state for toggling edit mode
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        category: '',
        location: '',
        phoneNumber: '',
        description: '',
        username: '',
        image: null,
    });

    useEffect(() => {
        if (formData.image) {
            setPreview(URL.createObjectURL(formData.image));
        } else {
            setPreview("");
        }
    }, [formData.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }

        const res = await getCategory(headers)
        console.log(res)
        if (res.status == 200) {
            setCat(res.data)
        }
    }

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setFormData((prev) => ({ ...prev, username }));
        }
        if (localStorage.getItem('lastname')) {
            setProfile({
                ...profile,
                lastname: localStorage.getItem('lastname'),
                firstname: localStorage.getItem('firstname'),
                category: localStorage.getItem('category'),
                location: localStorage.getItem('location'),
                phoneNumber: localStorage.getItem('phone'),
                description: localStorage.getItem('description'),
                username: localStorage.getItem('username'),
                image: localStorage.getItem('image'),
            });
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSave = async () => {
        const { firstname, lastname, category, location, phoneNumber, image, description, username } = formData;

        if (!firstname || !lastname || !category || !location || !phoneNumber || !image || !description || !username) {
            toast.warning('Please fill in all fields!');
            return;
        }

        const fd = new FormData();
        fd.append('firstname', firstname);
        fd.append('lastname', lastname);
        fd.append('category', category);
        fd.append('location', location);
        fd.append('phone', phoneNumber);
        fd.append('description', description);
        fd.append('username', username);
        fd.append('image', image);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };

        try {
            const res = await profileUpdate(fd, headers);
            if (res && res.status === 200) {
                toast.success('Profile saved successfully!');
                setProfile(formData); // Update profile with saved data
                nav('/authUser')
                setIsEditing(false); // Exit edit mode
            } else {
                toast.error(res.data?.message || 'Failed to save profile.');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('An error occurred while saving your profile.');
        }
    };

    return (
        <>
            <HeaderSp />
            <div className='d-flex justify-content-center align-items-center'>
                <div className='border shadow w-75 flex-column d-flex justify-content-center align-items-center p-4' style={{ borderRadius: '15px' }}>
                    <h3 className='mt-3'>My Profile</h3>

                    {profile && !isEditing ? (
                        <Row className='w-100 border rounded d-flex flex-md-row p-1'>
                            <Col xs={4} md={3} className="d-flex justify-content-center align-items-center">
                                <div className="my-3">
                                    <img
                                        src={preview ? preview : localStorage.getItem('image') &&
                                            `${base_url}/uploads/${localStorage.getItem('image')}`}
                                        alt="Profile"
                                        className="img-fluid shadow"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            maxHeight: '40vh',
                                            borderRadius: '10%',
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col xs={8} md={8} className="d-flex flex-column justify-content-center my-3">
                                <div className='text-white mb-4 d-flex flex-wrap'>
                                    <div className='mb-2'>
                                        <span className='me-2 bg-info p-1 px-2 rounded' style={{ width: '100px' }}>{profile.category}</span>
                                    </div>
                                </div>
                                <h3>{profile.firstname} {profile.lastname}</h3>
                                <h5>{profile.location}</h5>
                                <h5>{profile.phoneNumber}</h5>
                                <p>{profile.description}</p>
                            </Col>
                        </Row>
                    ) : (
                        <div className='w-50 d-flex justify-content-center align-items-center flex-column'>
                            <div className="my-3 w-50 d-flex justify-content-center align-items-center">
                                <label htmlFor="fileInput" className="d-flex justify-content-center align-items-center w-100">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <img
                                        src={
                                            preview
                                                ? preview
                                                : 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                                        }
                                        alt="Profile"
                                        className="img-fluid shadow"
                                        style={{
                                            cursor: 'pointer',
                                            objectFit: 'cover',
                                            width: '100%',
                                            maxHeight: '40vh',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </label>
                            </div>
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder='Username'
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder='First Name'
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder='Last Name'
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                            {
                                cat.length > 0 && (
                                    <Form.Select
                                        className="form-control mb-2"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Choose Category</option>
                                        {
                                            cat.map(item => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </Form.Select>
                                )
                            }
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder='Location'
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder='Phone Number'
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <textarea
                                className='form-control mb-2'
                                placeholder='Description'
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className='d-grid w-25'>
                        {profile && !isEditing ? (
                            <button className='btn btn-warning rounded-5 my-3' onClick={() => setIsEditing(true)}>
                                Update
                            </button>
                        ) : (
                            <button className='btn btn-warning rounded-5 my-3' onClick={handleSave}>
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileSp;

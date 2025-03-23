import React, { useState, useEffect } from 'react'
// import AdminDash from './AdminDash'
import Header from '../Components/Header'
import { getUsers,deleteUser } from '../Services/apiService'
import { toast } from 'react-toastify'

function ManageUser() {

    const [user, setUser] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await getUsers();
            console.log('geting',res.data);
            if(res.status==200){
                setUser(res.data)
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            res.status(400).json(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteUser(id);  // This calls commonApi internally
            
            if (res.status === 200) {
                // Successfully deleted, reload user data
                getData();
            } else {
                console.error('Failed to delete user:', res.message);
                toast.error(res.message);  // Example: show error message using a toast
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };
    
    return (
        <>
            {/* <AdminDash /> */}
            <Header />
            <div className='container-fluid'>
                <h2 className='m-3'>View and Manage Users</h2>
                {
                    user?.length > 0 ?
                        <table className='table table-bordered table-dark'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map((item,index) => (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item?.username}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.role}</td>
                                            <td><button className='btn' onClick={()=>handleDelete(item._id)}><i className="fa-solid fa-trash" style={{ color: "#a40414", }} /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3>No Users</h3>
                }
            </div>
        </>
    )
}

export default ManageUser
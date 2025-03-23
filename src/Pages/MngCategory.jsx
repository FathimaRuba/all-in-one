import React, { useContext, useEffect, useState } from 'react'
import Addcategory from '../Components/Addcategory'
import Header from '../Components/Header'
import { addCategoryResponseContext } from '../context/ContextApi'
import { getCategory, delCategory } from '../Services/apiService'
import { toast } from 'react-toastify'

function MngCategory() {

    const [category, setCategory] = useState([])

    const { addCategory } = useContext(addCategoryResponseContext)

    useEffect(() => {
        getData()
    }, [addCategory])

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
        const res = await getCategory(headers)
        console.log(res)
        if (res.status == 200) {
            setCategory(res.data)
        }
        else {
            console.log(res)
        }
    }

    const handleDelete = async (id) => {
        const res = await delCategory(id)
        console.log(res)
        if (res.status == 200) {
            getData()
        }
        else {
            console.error('Failed to delete user:', res.message);
            toast.error(res.message);
        }
    }
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <h2 className='m-3'>Add & Manage Categories</h2>
                <Addcategory />

                {
                    category?.length > 0 ?
                        <table className='table table-bordered table-dark'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.image}</td>
                                            <td>
                                                <button className='btn btn-outline-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                {/* <tr>
                                    <td colSpan={4}>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                        :
                        <h3 className='text-center m-3'>Add Category To Show</h3>
                }
            </div>
        </>
    )
}

export default MngCategory
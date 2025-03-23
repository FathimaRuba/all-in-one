import React, { useState, useEffect } from 'react'
import HeaderSp from '../Components/HeaderSp'
import { getCompletedWorks } from '../Services/apiService'

function WorkHistory() {

    const [works, setWorks] = useState([])

    useEffect(() => {
        getData()
    })

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
        const res = await getCompletedWorks(headers)
        // console.log(res)
        if (res.status == 200) {
            setWorks(res.data)
        }
    }

    return (
        <>
            <HeaderSp />
            <div className='container-fluid'>
                <h2 className='m-3'> work history</h2>
                {
                    works.length > 0 ?
                        <table className='table table-bordered table-dark'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    works.map((item, index) => (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.location}</td>
                                            <td>{item.dateFor}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3 className='text-center'>No Completed Works</h3>
                }
            </div>
        </>
    )
}

export default WorkHistory
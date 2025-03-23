import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { getAllRatFeeds } from '../Services/apiService'

function ViewRatFeed() {

    const [raf, setRaf] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };
        const res = await getAllRatFeeds(headers)
        setRaf(res.data)
        console.log(raf)
    }

    return (
        <>
            <Header />
            <div className='container-fluid'>
                <h2 className='m-3'>View Rating & Feedbacks</h2>
                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            {/* <th>Email</th> */}
                            <th>Rating</th>
                            <th>Feedbacks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            raf.length > 0 ?
                                raf.map((item,index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.username}</td>
                                        {/* <td>sharath1@gmail.com</td> */}
                                        <td>{item.rating}</td>
                                        <td>{item.feedback}</td>
                                        <td><button className='btn'><i className="fa-solid fa-trash" style={{ color: "#a40414", }} /></button></td>
                                    </tr>
                                ))
                                :
                                <h2 className='text-center'></h2>
                        }
                  0  </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewRatFeed
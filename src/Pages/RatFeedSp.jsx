import React,{useState,useEffect} from 'react'
import HeaderSp from '../Components/HeaderSp'
import { getAllRatFeed } from '../Services/apiService'

function RatFeedSp() {
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
        const res = await getAllRatFeed(headers)
        console.log(res)
        if (res.status == 200) {
            setData(res.data)
        }
    }

    return (
        <>
            <HeaderSp />
            <div className='container-fluid'>
                <h2 className='m-3'>View Rating & Feedbacks</h2>
              {
                data.length>0 ?
                <table className='table table-bordered table-dark'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        {/* <th>Phone</th>
                        <th>Location</th> */}
                        <th>Date</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    data.map((item,index)=>(
                        <tr>
                        <td>{index+1}</td>
                        <td>{item.username}</td>
                        <td>{item.date}</td>
                        <td>{item.rating}</td>
                        <td>{item.feedback}</td>
                    </tr>
                    ))
                   }
                </tbody>
            </table>
            :
            <h3>No Ratings & Feedbacks</h3>
              }
            </div>
        </>
    )
}

export default RatFeedSp
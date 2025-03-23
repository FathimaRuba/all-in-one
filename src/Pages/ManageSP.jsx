import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import { getServiceProviders } from '../Services/apiService';
import base_url from '../Services/base_url';

function ManageSP() {
    const [servicers, setServicers] = useState([]);

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        try {
            const headers = {
                'Content-Type':'application/json',
                'Authorization':`Token ${localStorage.getItem('token')}`
            }
            const res = await getServiceProviders(headers);
            console.log('sps',res.data); 
            setServicers(res.data); 
        } catch (err) {
            console.error('Error fetching service providers:', err);
        }
    }

    return (
        <>
        <Header />
            <div className='container-fluid'>
                <h2 className='m-3'>Manage Service Providers</h2>
                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Image</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        servicers.length>0 ?
                        servicers.map((item,index)=>(
                            <tr>
                            <td>{index+1}</td>
                            <td>{item.username}</td>
                            <td>{item.phone}</td>
                            <td>{item.category}</td>
                            <td>{item.location}</td>
                            <td className='text-center'>
                                <img src={`${base_url}/uploads/${item.image}`} className='img-fluid rounded-circle' style={{height:'50px',width:'50px'}} alt="" />
                            </td>
                            <td>
                                <button className='btn btn-outline-danger'>Delete</button>
                            </td>
                        </tr>
                        ))
                        :
                        <h3>No Verified Service Providers</h3>
                       }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManageSP
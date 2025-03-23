import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import base_url from '../Services/base_url';
import UserNavbar from '../Components/UserNavbar';
import { getServiceProviderByCat } from '../Services/apiService'; // Import your API function
// import { avgRatingResponseContext } from '../context/Avgrating';

function ListViewSp() {
    const { category } = useParams();
    const [serviceProviders, setServiceProviders] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [filteredProviders, setFilteredProviders] = useState([]);

    // const {avgRating} = useContext(avgRatingResponseContext)

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                };
                const res = await getServiceProviderByCat(headers, category);
                if (Array.isArray(res.data)) {
                    setServiceProviders(res.data);
                    setFilteredProviders(res.data);
                } else {
                    setServiceProviders([]);
                    setFilteredProviders([]);
                }
            } catch (err) {
                console.error("Error fetching service providers:", err);
            }
        };
    
        fetchServiceProviders();
    }, [category]); // Trigger on category change
    

    useEffect(() => {
        // Filter based on location
        const filtered = serviceProviders.filter(item =>
            item.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
        setFilteredProviders(filtered);
    }, [searchLocation, serviceProviders]);

    return (
        <>
            <UserNavbar />
            <div className="container-fluid mb-3 rounded-4">
                <Row>
                    <Col>
                        <div className="container-fluid my-2 d-flex justify-content-center align-items-center">
                            <div className="w-100 w-md-75 p-md-5 rounded-4 shadow mx-0">
                                <div className="mb-3">
                                    <div className="d-flex justify-content-center mb-3">
                                        <input
                                            type="text"
                                            placeholder="Search by Location"
                                            className="rounded-3 form-control w-50"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                        />
                                    </div>
                                    {
                                        filteredProviders.length > 0 ? // Use filteredProviders here
                                            filteredProviders.map(item => ( // Correct mapping target
                                                <Row key={item._id} className="w-100 my-2 border rounded d-flex flex-md-row p-1">
                                                    <Col xs={4} md={3} className="d-flex justify-content-center align-items-center">
                                                        <div className="my-3">
                                                            <div className="mx-auto" style={{ maxWidth: '100vw' }}>
                                                                <img
                                                                    src={`${base_url}/uploads/${item.image}`}
                                                                    alt="Profile"
                                                                    className="img-fluid shadow"
                                                                    style={{
                                                                        width: '350px',
                                                                        height: '350px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '10%'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={8} md={8} className="d-flex flex-column justify-content-center my-3">
                                                        <div>
                                                            <div className="text-white mb-4 d-flex flex-wrap">
                                                                <div className="mb-2">
                                                                    <span className="me-2 bg-info p-1 px-2 rounded">{item.category}</span>
                                                                </div>
                                                                {/* <div className="mb-1">
                                                                    <Link to={`/ratfeeduser/${item._id}?providerName=${encodeURIComponent(`${item.firstname} ${item.lastname}`)}`} className="bg-warning text-white px-2 text-center p-1 rounded text-decoration-none">
                                                                        <i className="fa-solid fa-star" /> {avgRating}
                                                                    </Link>
                                                                </div> */}
                                                            </div>
                                                            <h3>{item.firstname} {item.lastname}</h3>
                                                            <h5>{item.location}</h5>
                                                            <h5>{item.phone}</h5>
                                                            <p style={{ lineHeight: '1.4', fontSize: '1rem', textAlign: 'justify' }}>
                                                                {item.description}
                                                            </p>
                                                            <div className="d-flex justify-content-start flex-wrap">
                                                                <Link to={`/booksp/${item._id}`} className="btn btn-success mt-2 me-3">Book</Link>
                                                                <Link
                                                                    to={`/ratfeeduser/${item._id}?providerName=${encodeURIComponent(`${item.firstname} ${item.lastname}`)}`}
                                                                    className="btn btn-warning mt-2"
                                                                >
                                                                    Rating & Feedbacks
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ))
                                            :
                                            <h3 className="text-center my-5">No Service Providers Available In This Category</h3>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ListViewSp;

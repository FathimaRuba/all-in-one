import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ListRatFeed from '../Components/ListRatFeed';
import { useParams, useLocation } from 'react-router-dom';
import UserNavbar from '../Components/UserNavbar';

function RatFeedUser() {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const providerName = searchParams.get('providerName') || 'Service Provider';

    return (
        <>
            <UserNavbar />
            <div className="container-fluid my-3 rounded-4">
                <h3 className="text-center">{providerName}</h3>
                <Row>
                    <Col>
                        <div className="container-fluid w-100 w-md-75 d-flex justify-content-center align-items-center">
                            <ListRatFeed spid={id} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RatFeedUser;

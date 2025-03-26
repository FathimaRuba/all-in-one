import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import MainHeader from '../Components/MainHeader';

function Landing() {
  return (
    <>
      <MainHeader />
      <div className='container rounded-5'>
        <div
          className='bg-info-subtle p-sm-0 rounded-5 pt-5 my-5 d-flex justify-content-center align-items-center py-5 p-3'
          style={{
            height: '80vh',  // Default height
          }}
        >
          <div className='text-center text-primary pt-5'>
            <img
              src="https://www.lystloc.com/blog/wp-content/uploads/2022/12/Lystloc4.webp"
              className='rounded-5 mb-2 img-fluid'
              alt="Lystloc"
              style={{ maxHeight: '20rem', width: 'auto' }}
            />
            <h3 className=''>Welcome To All-In-One</h3>
            <p>All in One is a comprehensive service app designed to connect you with reliable professionals for every home need. From painters and cleaners to electricians and plumbers. Whether you need routine maintenance, urgent repairs, or home improvements, All in One makes it easy to find trustworthy experts right at your fingertips. Your home, your needs, all in one place.</p>
            <Link className='btn btn-primary rounded-pill' to={'/authUser'}>Get Started...</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
  @media (max-width: 576px) {
    .bg-info-subtle {
      height: 100vh; /* Adjust for smaller screens */
    }
  }
`}</style>


      <br />
      <div>
        <h2 className='text-center my-5'>Features</h2>
        <div className='row justify-content-center my-5'>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" height='200px' src="https://cdn-icons-gif.flaticon.com/9284/9284483.gif" />
              <Card.Body className='text-center'>
                <Card.Title>Instant Booking & Scheduling</Card.Title>
                <Card.Text>
                  Option for Users to book services instantly in a few quick easy steps.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" height='200px' src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif?cid=6c09b952nrvczz35t5nkk7yuw4qmo2jt9jixnazn3zvoad6o&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
              <Card.Body className='text-center'>
                <Card.Title>Verified Service Providers</Card.Title>
                <Card.Text>
                  All service providers are verified by user complaints & reviews.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" height='200px' src="https://cdn-icons-gif.flaticon.com/14676/14676170.gif" />
              <Card.Body className='text-center'>
                <Card.Title>User Reviews And Ratings</Card.Title>
                <Card.Text>
                  Customers can leave reviews & ratings to maintain transparency.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>


    </>
  );
}

export default Landing;

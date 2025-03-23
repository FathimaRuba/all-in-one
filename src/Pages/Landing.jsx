import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Header from '../Components/Header';

function Landing() {
  return (
    <>
    <Header />
      <div className='container rounded-5'>
        <div className='bg-info-subtle rounded-5 pt-5 my-5 d-flex justify-content-center align-items-centerpy-5 p-3' style={{height:'80vh'}}>
            <div className='text-center text-primary'>
                <img src="https://www.lystloc.com/blog/wp-content/uploads/2022/12/Lystloc4.webp" style={{height:'22rem'}} className='rounded-5 mb-2 img-fluid' alt="" />
                <h3 className='pt-5'>Welcome To All-In-One</h3>
                <p>All in One is a comprehensive service app designed to connect you with reliable professionals for every home need. From painters and cleaners to electricians and plumbers, we provide access to skilled service providers for any task, big or small. Whether you need routine maintenance, urgent repairs, or home improvements, All in One makes it easy to find trustworthy experts right at your fingertips. Your home, your needs, all in one place.</p>
                <Link className='btn btn-primary rounded-pill' to={'/authUser'}>Get Started...</Link>
            </div>
        </div>
    </div>
      <div>
        <h2 className='text-center my-3'>Features</h2>
        <div className='d-flex flex-row justify-content-around my-5'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height='200px' src="https://cdn-icons-gif.flaticon.com/9284/9284483.gif" />
            <Card.Body>
              <Card.Title className='text-center'>Instant Booking & Scheduling</Card.Title>
              <Card.Text>
                Option for Users to book services instantly in few quick easy steps.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height='200px' src="https://media3.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif?cid=6c09b952nrvczz35t5nkk7yuw4qmo2jt9jixnazn3zvoad6o&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
            <Card.Body>
              <Card.Title className='text-center'>Verified Service Providers</Card.Title>
              <Card.Text>
                All service providers are verified by user complaints & reviews.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height='200px' src="https://cdn-icons-gif.flaticon.com/14676/14676170.gif" />
            <Card.Body>
              <Card.Title className='text-center'>User Reviews & Ratings</Card.Title>
              <Card.Text>
                Customers can leave reviews & ratings to maintain transparency.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* <div className="p-5">
        <Row>
          <Col sm={12} md={6}>
          <h3>User Reviews & Ratings</h3>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui perferendis reiciendis at, nesciunt culpa vero obcaecati molestiae deserunt magnam sed nisi iure fugiat exercitationem est accusantium atque? Tenetur, culpa facilis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui exercitationem voluptates aut! Odit, porro libero reiciendis doloremque numquam mollitia ipsam, similique necessitatibus, modi aliquid corrupti facere non dolore consequatur.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, unde. Deleniti quia ad, assumenda autem numquam voluptas quaerat quae labore ipsa enim voluptates molestias ab, maiores ex ipsum nihil nostrum.
        </p>
          </Col>
          <Col sm={12} md={6}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/RVFAyFWO4go?si=_Mj8OWXqOyA2WCq6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Col>
        </Row>
      </div> */}
    </>
  )
}

export default Landing
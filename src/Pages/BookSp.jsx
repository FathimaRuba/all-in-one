import React, { useState, useEffect } from 'react';
import UserNavbar from '../Components/UserNavbar';
import { addBooking, getServiceProviderById } from '../Services/apiService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function BookSp() {
  const nav = useNavigate();
  const { id } = useParams(); // Retrieve service provider's ID from URL
  const [books, setBooks] = useState({
    email: '', location: '', phone: '', dateFor: '', username: '', spName: '', description:''
  });

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        };

        const res = await getServiceProviderById(id, headers);
        console.log('Service Provider:', res);

        if (res.status === 200) {
          // Ensure you correctly update the state with the service provider's name
          setBooks(prevState => ({
            ...prevState,
            spName: `${res.data.firstname} ${res.data.lastname}` // Set the full name
          }));
        } else {
          console.error('Failed to fetch service provider');
        }
      } catch (error) {
        console.error('Error fetching service provider:', error);
      }
    };

    fetchServiceProvider();
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setBooks(prevBooks => ({
        ...prevBooks,
        username: localStorage.getItem('username')
      }));
    }
  }, []);

  const handleBook = async () => {
    console.log('Booking Details:', books);
    const { username, email, location, phone, dateFor, spName,description } = books;

    if (!username || !email || !location || !phone || !dateFor || !spName || !description) {
      toast.warning("Please enter valid inputs!!");
    } else {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      };

      const data = {
        username,
        email,
        description,
        location,
        phone,
        dateFor,
        spName,
        bookingTo: id, 
        bookingBy: localStorage.getItem('token')
      };

      try {
        const res = await addBooking(data, headers);
        if (res.status === 200) {
          toast.success('Booking successful');
          setBooks({
            email: '', location: '', phone: '', dateFor: '', username: '', spName: '',description:''
          });
          nav('/allbook');
        } else {
          toast.error('Failed to make a booking');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error occurred while booking');
      }
    }
  };

  return (
    <>
      <UserNavbar />
      <div className='container-fluid d-flex justify-content-center align-items-center my-5' style={{ height: '80vh' }}>
        <div className='border shadow rounded-3 p-5'>
          <h3 className='mb-4 text-center'>Make An Appointment</h3>
          <div className='flex-column'>
            <input
              type="text"
              placeholder='Enter Your Username'
              value={books.username}
              readOnly
              className='form-control mb-3 rounded'
            />
            <input
              type="text"
              placeholder='Enter ServiceProvider Name'
              value={books.spName}  // Make sure the service provider's name is displayed here
              readOnly
              className='form-control mb-3 rounded'
            />
            <input
              type="email"
              placeholder='Enter Your Email'
              onChange={(e) => setBooks({ ...books, email: e.target.value })}
              className='form-control mb-3 rounded'
            />
            <input
              type="text"
              placeholder='Enter Description about work'
              onChange={(e) => setBooks({ ...books, description: e.target.value })}
              className='form-control mb-3 rounded'
            />
            <input
              type="text"
              placeholder='Enter Your Location'
              onChange={(e) => setBooks({ ...books, location: e.target.value })}
              className='form-control mb-3 rounded'
            />
            <input
              type="text"
              placeholder='Enter Phone Number'
              onChange={(e) => setBooks({ ...books, phone: e.target.value })}
              className='form-control mb-3 rounded'
            />
            <input
              type="date"
              placeholder='Enter Date'
              onChange={(e) => setBooks({ ...books, dateFor: e.target.value })}
              className='form-control mb-3 rounded'
            />
          </div>
          <div className='d-grid'>
            <button className='btn btn-success' onClick={handleBook}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookSp;

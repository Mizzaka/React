import React, { useEffect, useState } from 'react';
import './update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const initialUserState = {
        name: '',
        email: '',
        address: '',
    };

    const [user, setUser] = useState(initialUserState);
    const navigate = useNavigate();
    const { id } = useParams();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(`Fetching user with id: ${id}`);
                const response = await axios.get(`http://localhost:8000/api/user/${id}`);
                console.log('User data:', response.data);
                setUser(response.data);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [id]);

    const SubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting user data:', user);
            const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
            toast.success(response.data.message, { position: 'top-right' });
            navigate('/');
        } catch (error) {
            console.log('Error submitting user data:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to='/' type='button' className='btn btn-secondary'>
                <i className='fa-solid fa-backward'></i> Back
            </Link>
            <h3>Update User</h3>
            <form className='addUserForm' onSubmit={SubmitForm}>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={user.name}
                        onChange={inputHandler}
                        name='name'
                        autoComplete='off'
                        placeholder='Enter Your Name'
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        value={user.email}
                        onChange={inputHandler}
                        name='email'
                        autoComplete='off'
                        placeholder='Enter Your Email'
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        id='address'
                        value={user.address}
                        onChange={inputHandler}
                        name='address'
                        autoComplete='off'
                        placeholder='Enter Your Address'
                    />
                </div>
                <div className='inputGroup'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;

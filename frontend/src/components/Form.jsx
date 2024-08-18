import '../styles/Form.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

// eslint-disable-next-line react/prop-types
const Form = ({ route, method }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const flowName = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, {
                username,
                password,
            });
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate('/');
            } else navigate('/login');
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <h1>{flowName}</h1>
                    <input
                        className='form-input'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type='text'
                        placeholder='enter your username'
                    />
                    <input
                        className='form-input'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type='password'
                        placeholder='enter your password'
                    />
                    <button type='submit' className='form-button'>
                        {flowName}
                    </button>
                </>
            )}
        </form>
    );
};

export default Form;

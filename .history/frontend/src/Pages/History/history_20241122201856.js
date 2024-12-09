import { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:4000/User-history/fetch-history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setHistory(response.data.history);
            } catch (error) {
                console.log('Failed to fetch history', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className='history'>
            <h2>Your Watch History</h2>
            {history.map((item) => (
                <Link key={item._id} to={`/watch/${item.videoId._id}`} >
                    <img src={item.videoId.thumbnail} alt='....'/>
                    <p>{item.videoId.title}</p>
                    <p>Watched on: {new Date(item.watchedAt).toLocaleString()}</p>
                </Link>
            ))}
        </div>
    );
};

export default HistoryPage;

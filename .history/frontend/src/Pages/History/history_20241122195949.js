import { useEffect, useState } from 'react';
import axios from 'axios';
import 

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
        <div>
            <h2>Your Watch History</h2>
            {history.map((item) => (
                <div key={item._id}>
                    <p>{item.videoId.title}</p>
                    <p>Watched on: {new Date(item.watchedAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default HistoryPage;

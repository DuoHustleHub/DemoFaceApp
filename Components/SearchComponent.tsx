// pages/SearchComponent.js

import { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message,setMessage]= useState('')


    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://facecheck.id/api/search', {
                id_search: searchInput,
                with_progress: true,
                id_captcha: null,
                status_only: false,
                demo: true
            }, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': '3r/8VtiWco0S0aehI9P07MHA4EiALtTXuVR8JuK2ab0d8uXf9n2a0xwkVuB55CFsmsepqoFrYEU=',
                    'Cookie': 'c=2; i=HJBzQ2aEc0FnhHBDZYRwQGE%3D'
                }
            });

            setMessage(response.data.message)
            setSearchResults(response.data.output.items);
        } catch (err) {
            setError(message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Search ID</h1>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter ID"
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {searchResults && (
                <div>
                    <h2>Search Results</h2>
                    {searchResults.map((item, index) => (
                        <div key={index}>
                            <p>GUID: {item.guid}</p>
                            <p>Score: {item.score}</p>
                            <p>Group: {item.group}</p>
                            <img src={item.base64} alt={`Result ${index + 1}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;

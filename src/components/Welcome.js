import './styles/Welcome.css'
import React, { useState, useEffect} from 'react'
import { getUserData } from './firebase'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = event => {
      setSearchTerm(event.target.value);
      if (onSearch) {
        onSearch(event.target.value);
      }
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    );
};
  

const Welcome = ({ userId, onSearch, editing, setEditing }) => {
    const [nickName, setNickName] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData(userId)
            setNickName(data.nickname)
        }
        fetchData()
    }, [userId])

    if (userId === '') {
        return (
            <div className="welcome">
                <div className="welcome-top-bar">
                    <h1 className="welcome-header">Welcome to Writing Buddy!</h1>
                    <SearchBar onSearch={onSearch} />
                </div>
                <h3>
                    Documents
                </h3>
            </div>
        )
    }

    return (
        <div className="welcome">
            <div className="welcome-bar">
                <h1 className="welcome-header">Welcome back, {nickName}!</h1>
                <h1 className="welcome-header"></h1>
                <SearchBar onSearch={onSearch} />
            </div>
            <div className="welcome-bar">
                <h3>
                    Recent Documents
                </h3>
                <button className="transparent-button" style={{ opacity: 0.7 }} onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit'}</button>
            </div>
        </div>
    )
}

export default Welcome;
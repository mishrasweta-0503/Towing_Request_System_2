
import './App.css';
import axios from "axios";
import React,{useState} from 'react';

function App() {
  const [customer_name, setCustomer_Name] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const handleName = (event) => {
    setCustomer_Name(event.target.value);
  };
  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleNote = (event) => {
    setNote(event.target.value);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/requests",
        {
          customer_name: customer_name,
          location: location,
          note: note,
        }
      )
      console.log(response)
      alert('Request Submitted Successfully');
      setCustomer_Name('');
      setLocation('');
      setNote('');
    } catch (error) {
      console.log(error)
    }
  };
    return (
      <div className="app-container">
        <div className="card">
          <h1>Towing Request</h1>
    
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={customer_name}
                onChange={handleName}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={location}
                onChange={handleLocation}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Note</label>
              <textarea
                placeholder="Describe the issue (optional)"
                value={note}
                onChange={handleNote}
                rows="3"
              />
            </div>
    
            <button type="submit">Request Tow</button>
          </form>
        </div>
      </div>
    );
  
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [donors, setDonors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/donors');
      setDonors(response.data);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert("Please enter a valid email address containing '@'");
      return;
    }
    try {
      await axios.post('http://127.0.0.1:5001/api/donors', {
        name: name,
        email: email,
        donation_amount: 0
      });
      setName('');
      setEmail('');
      fetchDonors();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("This email is already in our database!");
      } else {
        console.error("Error adding donor:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this donor?")) {
      try {
        await axios.delete(`http://127.0.0.1:5001/api/donors/${id}`);
        fetchDonors(); //refreshes list after deletion
      } catch (error) {
        console.error("Error deleting donor:", error);
      }
    }
  };

  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#004a99' }}>KC Donor Dashboard</h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Add New Donor</h3>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Donor Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ marginRight: '10px', padding: '8px' }}
            required
          />
          <input 
            type="email"
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ marginRight: '10px', padding: '8px' }}
            required
          />
          <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#004a99', color: 'white', border: 'none', borderRadius: '4px' }}>
            + Add
          </button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="🔍 Search donors by name or email..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '100%', padding: '12px', fontSize: '16px', borderRadius: '4px', border: '1px solid #004a99' }}
        />
      </div>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#004a99', color: 'white' }}>
            <th style={{ padding: '12px' }}>Donor Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donor.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donor.email}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <button 
                    onClick={() => handleDelete(donor.id)}
                    style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                No donors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
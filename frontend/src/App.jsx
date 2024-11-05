import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  axios.defaults.baseURL = 'http://localhost:8001';

  const handleClick = async () => {
    try {
      const response = await axios.post('/url', { url: longURL });
      setShortURL(`http://localhost:8001/url/${response.data.id}`);
    } catch (error) {
      console.log("Error occurred while sending data to API:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleClick} style={styles.button}>Shorten URL</button>
        {shortURL && (
          <div style={styles.result}>
            <p style={styles.resultText}>Short URL:</p>
            <a href={shortURL} target="_blank" rel="noopener noreferrer" style={styles.shortLink}>
              {shortURL}
            </a>
            <button onClick={handleCopy}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f9fc',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  result: {
    marginTop: '20px',
    textAlign: 'center',
  },
  resultText: {
    fontSize: '16px',
    color: '#555',
  },
  shortLink: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: ${(props) => (props.darkMode ? "#555" : "#007BFF")};
  color: white;
  border: none;
  cursor: pointer;
`;

const App = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            if (!parsedJson.data) {
                alert("Invalid JSON Format");
                return;
            }
            const res = await axios.post("https://your-backend.herokuapp.com/bfhl", parsedJson);
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or Server Error");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setJsonInput(event.target.result);
        };
        reader.readAsText(file);
    };

    return (
        <Container darkMode={darkMode}>
            <h1>Bajaj Finserv Health Dev Challenge</h1>
            <Button darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
                Toggle Dark Mode
            </Button>

            <input type="file" onChange={handleFileUpload} />
            <textarea rows="5" cols="50" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />

            <Button darkMode={darkMode} onClick={handleSubmit}>Submit</Button>

            {response && (
                <>
                    <h2>Filters</h2>
                    <select multiple onChange={(e) => {
                        setSelectedFilter(Array.from(e.target.selectedOptions, (option) => option.value));
                    }}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>

                    <h2>Response</h2>
                    {selectedFilter.map((filter) => (
                        <p key={filter}><strong>{filter}:</strong> {JSON.stringify(response[filter])}</p>
                    ))}
                </>
            )}
        </Container>
    );
};

export default App;

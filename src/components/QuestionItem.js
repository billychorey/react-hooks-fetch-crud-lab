import React, {useState, useEffect } from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const options = answers && Array.isArray(answers)
  ? answers.map((answer, index) => (
      <option key={index} value={index}>
        {answer}
      </option>
    ))
  : [];

  useEffect(() => {
    // Update the correct index on the server when it changes
    if (selectedCorrectIndex !== correctIndex) {
      updateCorrectIndex(selectedCorrectIndex);
    }
  }, [selectedCorrectIndex, correctIndex]);

  const updateCorrectIndex = (newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the correct index in state
        setSelectedCorrectIndex(data.correctIndex);
      })
      .catch((error) => console.error("Error updating correct index:", error));
  };

  const handleSelectChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setSelectedCorrectIndex(newIndex);
  };

  const handleDelete = () => {
    onDeleteQuestion(id)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectIndex} onChange={handleSelectChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;

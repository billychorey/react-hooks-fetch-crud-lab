import React, { useState, useEffect  } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch questions.");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question.");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm questions={questions} setQuestions ={setQuestions} onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion}/>)}
    </main>
  );
}

export default App;
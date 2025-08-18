import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import apiRequest from "../Components/ApiRequest.js";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizCreation() {
  const [questions, setQuestions] = useState([]);

  const { courseId } = useParams();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", ""],
        answer: null,
      },
    ]);
  };

  const updateQuestionText = (value, idx) => {
    const updated = [...questions];
    updated[idx].question = value;
    setQuestions(updated);
  };

  const updateOption = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const setCorrectOption = (qIdx, optIdx) => {
    const updated = [...questions];
    updated[qIdx].answer = optIdx;
    setQuestions(updated);
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const navigate=useNavigate()

  async function handleSubmit() {
    console.log(questions);

    questions.forEach((question, idx) => {
      if (question.answer == null) {
        alert(`Correct option missing in question no : ${idx + 1}`);
      }
    });

    try {
      const data = { quiz: questions };

      const response = await apiRequest(
        "post",
        `/instructor/uploadquiz/${courseId}`,
        data
      );

      console.log(response.data);
      alert("Quiz successfully uploaded")

      navigate(`/course/${courseId}`)

    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create a Quiz</h1>

      {/* Questions */}
      <div className="w-full max-w-2xl space-y-6">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="bg-gray-800 shadow-md rounded-2xl p-6">
            Question {qIdx + 1}
            <div className="flex justify-between items-start mb-4">
              <input
                type="text"
                placeholder={`Question ${qIdx + 1}`}
                value={q.question}
                onChange={(e) => updateQuestionText(e.target.value, qIdx)}
                className="flex-1 border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2"
              />
              <button
                onClick={() => removeQuestion(qIdx)}
                className="ml-4 text-red-400 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-${qIdx}`}
                    checked={q.answer === optIdx}
                    onChange={() => setCorrectOption(qIdx, optIdx)}
                  />
                  <input
                    type="text"
                    placeholder={`Option ${optIdx + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                    className="flex-1 border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2"
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(qIdx)}
                className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded-md py-2 mt-2 hover:bg-gray-700"
              >
                <FaPlus /> Add Option
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addQuestion}
        className="cursor-pointer my-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <FaPlus /> Add New Question
      </button>

      {questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className="cursor-pointer mt-8 px-6 py-2 text-lg bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import QuestionCard from "../Components/QuestionCard.jsx";
import { useParams } from "react-router-dom";
import apiRequest from "../Components/ApiRequest.js";

export default function QuizSubmit() {
  const { quizId } = useParams();

  const [allQuiz, setAllQuiz] = useState([]);
  const [answers, setAnswers] = useState([]); // track selected answers

  useEffect(() => {
    async function getQuiz() {
      try {
        const response = await apiRequest("get", `/student/getquiz/${quizId}`);
        console.log(response.data)
        setAllQuiz(response.data.allQuiz.allQues);

        // initialize answers with null
        setAnswers(Array(response.data.allQuiz.length).fill(null));
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
    getQuiz();
  }, [quizId]);

  // when a user selects an option
  const handleOptionSelect = (questionIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx; // store chosen option index
    setAnswers(newAnswers);
  };

  // submit function
  const handleSubmit = async () => {
    const formattedAnswers = answers.map((ans, idx) => ({
      questionIdx: idx,
      choosenOptionIdx: ans,
    }));

    console.log("Submitting:", formattedAnswers);

    try {
      const response = await apiRequest("post", `/student/submitquiz/${quizId}`, {
        answers: formattedAnswers,
      });
      console.log("Submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div>
      <div className="w-full pt-10 flex flex-col gap-y-6 items-center md:flex-row md:justify-around md:flex-wrap">
        {allQuiz.map((quiz, index) => (
          <QuestionCard
            key={index}
            question={quiz.question}
            options={quiz.options}
            number={index}
            onSelectOption={(optionIdx) => handleOptionSelect(index, optionIdx)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 cursor-pointer font-bold text-xl p-3 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

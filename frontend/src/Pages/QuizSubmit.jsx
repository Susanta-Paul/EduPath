import { useState } from "react"
import QuestionCard from "../Components/QuestionCard.jsx"

export default function QuizSubmit(){


    const [allQuiz, setAllQuiz]=useState([
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
        {question: "who is the current president of US", options:["Trump", "Obama", "Biden", "Lincon"]},
    ])

    return(
        <div>
            <div className="w-full pt-10 flex flex-col gap-y-6 items-center md:flex-row md:justify-around md:flex-wrap">
                {allQuiz.map((quiz, index)=>(
                    <QuestionCard 
                        question={quiz.question}
                        options={quiz.options}
                        number={index}
                        key={index}
                    />
                ))}

            </div>
            <div className="flex justify-center mt-6"><button className="bg-blue-500 cursor-pointer font-bold text-xl p-3 rounded-lg">Submit</button></div>
        </div>
    )
}
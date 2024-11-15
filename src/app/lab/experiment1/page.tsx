/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useEffect, useState } from "react";
import PopUp from "@/components/PopUp";
import PopUpAnswer from "@/components/PopUpAnswer";
import ScoreCard from "@/components/ScoreCard";
import router from "next/navigation";

const elements = [
    { symbol: "H", name: "Hydrogen", mrNumber: 1, period: 1, group: 1 },
    { symbol: "He", name: "Helium", mrNumber: 4, period: 1, group: 18 },
    { symbol: "Li", name: "Lithium", mrNumber: 7, period: 2, group: 1 },
    { symbol: "Be", name: "Beryllium", mrNumber: 9, period: 2, group: 2 },
    { symbol: "B", name: "Boron", mrNumber: 11, period: 2, group: 13 },
    { symbol: "C", name: "Carbon", mrNumber: 12, period: 2, group: 14 },
    { symbol: "N", name: "Nitrogen", mrNumber: 14, period: 2, group: 15 },
    { symbol: "O", name: "Oxygen", mrNumber: 16, period: 2, group: 16 },
    { symbol: "F", name: "Fluorine", mrNumber: 19, period: 2, group: 17 },
    { symbol: "Ne", name: "Neon", mrNumber: 20, period: 2, group: 18 },
    { symbol: "Na", name: "Sodium", mrNumber: 23, period: 3, group: 1 },
    { symbol: "Mg", name: "Magnesium", mrNumber: 24, period: 3, group: 2 },
    { symbol: "Al", name: "Aluminum", mrNumber: 27, period: 3, group: 13 },
    { symbol: "Si", name: "Silicon", mrNumber: 28, period: 3, group: 14 },
    { symbol: "P", name: "Phosphorus", mrNumber: 31, period: 3, group: 15 },
    { symbol: "S", name: "Sulfur", mrNumber: 32, period: 3, group: 16 },
    { symbol: "Cl", name: "Chlorine", mrNumber: 35.5, period: 3, group: 17 },
    { symbol: "Ar", name: "Argon", mrNumber: 40, period: 3, group: 18 },
    { symbol: "K", name: "Potassium", mrNumber: 39, period: 4, group: 1 },
    { symbol: "Ca", name: "Calcium", mrNumber: 40, period: 4, group: 2 },
];


const Experiment1: FC = () => {
    const [openPopup, setOpenPopup] = useState(false); // Controls "How to Play" pop-up
    const [openPopupAnswer, setOpenPopupAnswer] = useState(false); // Controls Submit pop-up
    const [status, setStatus] = useState(false); // Controls Submit pop-up
    const [popupContent, setPopupContent] = useState(""); // Content for PopUpAnswer component
    const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [massNumberInput, setMassNumberInput] = useState(""); // For "Relative Mass Number"
    const [elementNameInput, setElementNameInput] = useState(""); // For "Element Name"
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [score, setScore] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // New state to track completed questions
    const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
    // New state to track the saved question index
    const [savedQuestionIndex, setSavedQuestionIndex] = useState<number | null>(null);
    const handleRemoveHowToPlay = () => setOpenPopup(false);
    const handleRemoveAnswerPopUp = () => setOpenPopupAnswer(false);


    const handlePeriodClick = (index: number) => {
        setSelectedPeriod(selectedPeriod === index ? null : index);
    };

  
    const handleGroupClick = (index: number) => {
        setSelectedGroup(selectedGroup === index ? null : index);
    };

    
    const handleNextQuestion = () => {
        if (currentQuestion < elements.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            resetSelections();
        }
    };

   
    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            resetSelections();
        }
    };

    
    const resetSelections = () => {
        setSelectedPeriod(null);
        setSelectedGroup(null);
        setMassNumberInput("");
        setElementNameInput("");
    };


    const handleSubmit = async () => {
        if (completedQuestions.has(currentQuestion)) {
            setPopupContent("You've already completed this question. Please move to the next one.");
            setOpenPopupAnswer(true);
            return;
        }

        const currentElement = elements[currentQuestion];
    
        if (
            selectedPeriod === null ||
            selectedGroup === null ||
            !massNumberInput ||
            !elementNameInput
        ) {
            setPopupContent("Please fill in all fields and make selections.");
            setOpenPopupAnswer(true);
            return;
        }
    
        let newScore = score;
        let message = "";
    
        const isCorrect = 
            selectedPeriod === currentElement.period - 1 &&
            selectedGroup === currentElement.group - 1 &&
            parseInt(massNumberInput) === currentElement.mrNumber &&
            elementNameInput.toLowerCase() === currentElement.name.toLowerCase();
    
        if (isCorrect) {
            newScore += 100;
            message = "Correct! Well done. +100 points";
            setStatus(true);
        } else {
            newScore = Math.max(0, newScore - 50);
            message = `Incorrect. -50 points\nThe correct answer is:\n` +
                     `Name: ${currentElement.name},\n` +
                     `Relative Mass Number: ${currentElement.mrNumber},\n` +
                     `Period: ${currentElement.period}, Group: ${currentElement.group}.`;
            setStatus(false);
        }
    
        setScore(newScore);
        
        // Mark the question as completed
        setCompletedQuestions(prev => new Set(prev).add(currentQuestion));
    
        if (isAuthenticated) {
            try {
                const response = await fetch('https://server-i2k01wfod-tvaldigs-projects.vercel.app/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        score: newScore,
                        currentQuestion,
                        completedQuestions: Array.from(new Set([...Array.from(completedQuestions), currentQuestion]))
                    }),
                });
    
                if (!response.ok) {
                    if (response.status === 403) {
                        setIsAuthenticated(false);
                        message += "\n\nNote: Your session has expired. Please log in again.";
                    } else {
                        const errorData = await response.json().catch(() => null);
                        message += `\n\nNote: ${errorData?.error || 'Failed to save score. Please try again.'}`;
                    }
                }
            } catch (error) {
                console.error('Failed to save score:', error);
                message += "\n\nNote: Network error. Score not saved.";
            }
        } else {
            message += "\n\nNote: Log in to save your progress.";
        }
    
        setPopupContent(message);
        setOpenPopupAnswer(true);
    };
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch('https://server-i2k01wfod-tvaldigs-projects.vercel.app/latest', {
                    headers: {
                        'Accept': 'application/json'
                    },
                });
    
                if (!response.ok) {
                    if (response.status === 403) {
                        setIsAuthenticated(false);
                        return;
                    }
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
                if (data) {
                    setScore(data.score || 0);
                    setCurrentQuestion(data.currentQuestion || 0);
                    setCompletedQuestions(new Set(data.completedQuestions || []));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
            }
        };
    
        fetchInitialData();

        // Check for return question from login
        const params = new URLSearchParams(window.location.search);
        const returnQuestion = params.get('returnQuestion');
        if (returnQuestion) {
            setCurrentQuestion(parseInt(returnQuestion));
        }
    }, []);
    
    useEffect(() => {

        checkAuthAndFetchScore();
    }, []);

    const checkAuthAndFetchScore = async () => {
        try {
            const response = await fetch('https://server-i2k01wfod-tvaldigs-projects.vercel.app/latest');
            if (response.status === 403) {
                setIsAuthenticated(false);
                return;
            }
            setIsAuthenticated(true);
            const data = await response.json();
            if (data && data.score) {
                setScore(data.score);
            }
        } catch (error) {
            console.error('Failed to fetch score:', error);
        }
    };
    const handleSave = async () => {
        if (!isAuthenticated) {
            // Save the current question index
            setSavedQuestionIndex(currentQuestion);
            // Redirect to login page with the current question as a query parameter
            return;
        }

        try {
            const response = await fetch('https://server-i2k01wfod-tvaldigs-projects.vercel.app/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    score,
                    currentQuestion,
                    completedQuestions: Array.from(completedQuestions)
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save progress');
            }

            setPopupContent("Progress saved successfully!");
            setOpenPopupAnswer(true);
        } catch (error) {
            console.error('Failed to save progress:', error);
            setPopupContent("Failed to save progress. Please try again.");
            setOpenPopupAnswer(true);
        }
    };

    const currentElement = elements[currentQuestion];
    const isQuestionCompleted = completedQuestions.has(currentQuestion);
    return (
        <div className="min-h-screen bg-bg-2 flex flex-col items-center p-4 space-y-8">
            <h1 className="font-superfunky font-bold [text-shadow:_5px_8px_10px_rgb(0_0_0_/_60%)] text-shadow-lg lg:text-5xl md:text-4xl text-2xl text-center text-black">
                Guess The Element
            </h1>

            {/* Button and Score Section */}
            <div className="flex flex-row space-x-4 items-center">
                <button
                    onClick={() => setOpenPopup(true)}
                    className="text-white font-spbutchlite font-bold text-[14px] px-4 py-2 rounded-lg border border-[#729762] bg-[#000000] hover:bg-[#FFFFFF] hover:text-black shadow-md hover:scale-110 transition duration-300"
                >
                    How to Play?
                </button>
                <ScoreCard score={score} />
            </div>

            <div className="dashboard-container flex flex-col items-center bg-white border-2 border-black p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex flex-col items-center mb-4">
                    <button className="bg-red-300 font-spbutchlite font-bold text-black font-semibold py-2 px-4 rounded-lg shadow-md" onClick={handleSave}>Save</button>
                </div>

                {/* Question Display Area */}
                <div className="dashboard-content border border-black rounded-lg p-4 mb-4 w-full h-48 flex justify-center items-center text-[100px] font-bold text-gray-800">
                    {currentElement.symbol} {/* Display the element symbol here */}
                </div>

                <p className="text-lg font-spbutchlite text-black font-bold mb-4">
                    Question {currentQuestion + 1} / {elements.length}
                </p>

         
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        className="bg-biru-tua font-spbutchlite font-bold text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:bg-gray-400"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestion === elements.length - 1}
                        className="bg-biru-tua font-spbutchlite font-bold text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>

                {/* Input Fields Section with scrollable and selectable buttons */}
                <div className="dashboard-inputs border border-black rounded-lg p-4 space-y-4 w-full">
                    {/* Period Selection */}
                    <div className="text-center text-xl font-spbutchlite font-bold text-black mb-2">Choose Period</div>
                    <div className="flex overflow-x-scroll space-x-2">
                        {[...Array(7)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePeriodClick(i)}
                                disabled={isQuestionCompleted}
                                className={`p-2 text-center text-black font-spbutchlite font-bold text-[100px] rounded-lg border ${selectedPeriod === i ? "bg-kuning-muda" : "bg-gray-100"} transition-colors`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Group Selection */}
                    <div className="text-center text-xl font-spbutchlite font-bold text-black mt-4 mb-2">Choose Group</div>
                    <div className="flex overflow-x-scroll space-x-2">
                        {[...Array(18)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleGroupClick(i)}
                                disabled = {isQuestionCompleted}
                                className={`p-2 rounded-lg border text-center text-black font-spbutchlite font-bold text-[100px] ${selectedGroup === i ? "bg-kuning-muda" : "bg-gray-100"} transition-colors`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Additional Input Fields */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <input
                            className="bg-gray-100 text-black border rounded-lg p-2 font-spbutchlite font-bold"
                            placeholder="Relative Mass Number"
                            disabled={isQuestionCompleted}
                            value={massNumberInput}
                            onChange={(e) => setMassNumberInput(e.target.value)}
                        />
                        <input
                            className="bg-gray-100 text-black border rounded-lg p-2 font-spbutchlite font-bold"
                            placeholder="Element Name"
                            value={elementNameInput}
                            disabled={isQuestionCompleted}
                            onChange={(e) => setElementNameInput(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white font-spbutchlite font-bold py-2 px-6 rounded-lg shadow-md mt-4"
                >
                    Submit
                </button>
            </div>

            {/* Pop-up Components */}
            <PopUp openPopUp={openPopup} content="Given an element from a periodic table, Try to guess the Period number,
             Group number,
             Mass number,
             and the name of the element.
             Remember the name is Case sensitive, use Uppercase in the first letter.
             Good luck!" closePopUp={handleRemoveHowToPlay} />
            <PopUpAnswer openPopUpAnswer={openPopupAnswer} content={popupContent} status={status} closePopUpAnswer={handleRemoveAnswerPopUp} />
        </div>
    );
};

export default Experiment1;

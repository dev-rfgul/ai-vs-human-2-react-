// import React, { useState, useEffect } from "react";
// import Sound from "react-sound"
// import soundfile from "/audio/sound.mp3";
// import axios from "axios";

// const Home = () => {
//   const [number, setNumber] = useState("");
//   const [AIGuess, setAIGuess] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [attempts, setAttempts] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [gameWon, setGameWon] = useState(false);
//   const [score, setScore] = useState(0);

//   const getNumberFromUser = (event) => {
//     setNumber(event.target.value);
//   };

//   const getCompletionFromAI = () => {
//     const GROQ_API_KEY = "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";
//     const requestData = {
//       messages: [
//         {
//           role: "system",
//           content:
//             "Generate a random integer between 1 and 100 without any extra text. Use the divide and conquer approach to guess the number.",
//         },
//       ],
//       model: "llama3-8b-8192",
//     };

//     axios
//       .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
//         headers: {
//           Authorization: `Bearer ${GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         const data = response.data.choices[0].message.content;
//         const extractedNumber = extractIntegerFromParagraph(data);
//         if (extractedNumber !== null) {
//           setAIGuess(extractedNumber);
//           setShowPopup(true);
//           setAttempts(1);
//         } else {
//           console.log("Failed to extract a valid integer from AI response");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const generateNextNumber = (greaterThan) => {
//     if (attempts < 15) {
//       const GROQ_API_KEY = "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";
//       const requestData = {
//         messages: [
//           {
//             role: "system",
//             content: `The number you generated previously was ${AIGuess}. Now generate another integer between 1 and 100 without any extra text. The new number should be ${
//               greaterThan ? "greater" : "less"
//             } than ${AIGuess}.`,
//           },
//         ],
//         model: "llama3-8b-8192",
//       };

//       axios
//         .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
//           headers: {
//             Authorization: `Bearer ${GROQ_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         })
//         .then((response) => {
//           const data = response.data.choices[0].message.content;
//           const extractedNumber = extractIntegerFromParagraph(data);
//           if (extractedNumber !== null) {
//             setAIGuess(extractedNumber);
//             setAttempts((prev) => prev + 1);
//             if (extractedNumber === parseInt(number)) {
//               handleGameWon();
//             }
//           } else {
//             console.log("Failed to extract a valid integer from AI response");
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     } else {
//       handleGameOver();
//     }
//   };

//   const handleGameOver = () => {
//     setGameOver(true);
//     setShowPopup(false);
//     setScore((prev) => prev + 1);
//   };

//   const handleGameWon = () => {
//     setGameWon(true);
//     setShowPopup(false);
//   };

//   const extractIntegerFromParagraph = (paragraph) => {
//     const pattern = /\b\d+\b/;
//     const match = paragraph.match(pattern);
//     return match ? parseInt(match[0]) : null;
//   };

//   useEffect(() => {
//     if (showPopup) {
//       const handleClosePopup = (e) => {
//         if (e.target.id === "popup-background") {
//           setShowPopup(false);
//         }
//       };

//       window.addEventListener("click", handleClosePopup);
//       return () => {
//         window.removeEventListener("click", handleClosePopup);
//       };
//     }
//   }, [showPopup]);

//   return (
//     <div className="relative">
//       <div className="flex justify-center mt-9 h-screen">
//         <div className="text-center">
//           <h1 className="text-6xl font-black mb-8 underline hover:underline-offset-8">
//             AI VS HUMAN
//           </h1>

//           <div className="flex flex-col justify-center text-center">
//             <input
//               onChange={getNumberFromUser}
//               placeholder="Enter the Number from 1 - 100"
//               type="number"
//               value={number}
//               className="border-2 border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
//             />

//             <button
//               onClick={getCompletionFromAI}
//               className="mt-5 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-gray-800"
//             >
//               Start Game
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="fixed top-4 right-4 bg-gray-100 border border-gray-300 p-4 rounded shadow-md text-black font-bold">
//         Score: {score}
//       </div>

//       {showPopup && (
//         <div
//           id="popup-background"
//           className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
//         >
//           <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
//             <h2 className="text-2xl text-black font-bold mb-4">
//               AI Generated Number: {AIGuess}
//             </h2>
//             <h2 className="text-2xl text-black font-bold mb-4">
//               Your Number: {number}
//             </h2>

//             <div className="mt-4">
//               <button
//                 onClick={() => generateNextNumber(true)}
//                 className="bg-gray-800 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-black hover:font-bold mr-5"
//               >
//                 Greater
//               </button>

//               <button
//                 onClick={() => generateNextNumber(false)}
//                 className="bg-gray-800 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-black hover:font-bold mr-5"
//               >
//                 Smaller
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {gameOver && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
//             <h2 className="text-2xl text-black font-bold mb-4">AI Lose</h2>
//             <button
//               onClick={() => {
//                 setGameOver(false);
//                 setAttempts(0);
//                 setAIGuess("");
//               }}
//               className="bg-white text-black border-black border px-4 py-2 rounded hover:bg-gray-800 hover:text-white hover:border-transparent hover:font-normal mr-5 font-bold"
//             >
//               Reset Game
//             </button>
//           </div>
//         </div>
//       )}

//       {gameWon && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
//             <h2 className="text-2xl text-black font-bold mb-4">AI Wins</h2>
//             <button
//               onClick={() => {
//                 setGameWon(false);
//                 setAttempts(0);
//                 setAIGuess("");
//               }}
//               className="bg-white text-black border-black border px-4 py-2 rounded hover:bg-gray-800 hover:text-white hover:border-transparent hover:font-normal mr-5 font-bold"
//             >
//               Reset Game
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import Sound from "react-sound";
import axios from "axios";

const Home = () => {
  const [number, setNumber] = useState("");
  const [AIGuess, setAIGuess] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const getNumberFromUser = (event) => {
    setNumber(event.target.value);
  };
  const playAudio = () => {
    setAudioPlaying(true);
  };

  const getCompletionFromAI = () => {
    const GROQ_API_KEY =
      "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";
    const requestData = {
      messages: [
        {
          role: "system",
          content:
            "Generate a random integer between 1 and 100 without any extra text. Use the divide and conquer approach to guess the number.",
        },
      ],
      model: "llama3-8b-8192",
    };

    axios
      .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data.choices[0].message.content;
        const extractedNumber = extractIntegerFromParagraph(data);
        if (extractedNumber !== null) {
          setAIGuess(extractedNumber);
          setShowPopup(true);
          setAttempts(1);
        } else {
          console.log("Failed to extract a valid integer from AI response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generateNextNumber = (greaterThan) => {
    if (attempts < 15) {
      const GROQ_API_KEY =
        "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";
      const requestData = {
        messages: [
          {
            role: "system",
            content: `The number you generated previously was ${AIGuess}. Now generate another integer between 1 and 100 without any extra text. The new number should be ${
              greaterThan ? "greater" : "less"
            } than ${AIGuess}.`,
          },
        ],
        model: "llama3-8b-8192",
      };

      axios
        .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data.choices[0].message.content;
          const extractedNumber = extractIntegerFromParagraph(data);
          if (extractedNumber !== null) {
            setAIGuess(extractedNumber);
            setAttempts((prev) => prev + 1);
            if (extractedNumber === parseInt(number)) {
              handleGameWon();
            }
          } else {
            console.log("Failed to extract a valid integer from AI response");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    setShowPopup(false);
    setScore((prev) => prev + 1);
  };

  const handleGameWon = () => {
    setGameWon(true);
    setShowPopup(false);
  };

  const extractIntegerFromParagraph = (paragraph) => {
    const pattern = /\b\d+\b/;
    const match = paragraph.match(pattern);
    return match ? parseInt(match[0]) : null;
  };

  useEffect(() => {
    if (showPopup) {
      const handleClosePopup = (e) => {
        if (e.target.id === "popup-background") {
          setShowPopup(false);
        }
      };

      window.addEventListener("click", handleClosePopup);
      return () => {
        window.removeEventListener("click", handleClosePopup);
      };
    }
  }, [showPopup]);

  return (
    <div className="relative">
      <div>
        <Sound
          url="/sound.mp3"
          playStatus={
            audioPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          volume={100}
        />
      </div>
      <div className="flex justify-center mt-9 h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-8 underline hover:underline-offset-8">
            AI VS HUMAN
          </h1>

          <div className="flex flex-col justify-center text-center">
            <input
              onChange={getNumberFromUser}
              placeholder="Enter the Number from 1 - 100"
              type="number"
              value={number}
              className="border-2 border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={() => {
                getCompletionFromAI();
                playAudio();
              }}
              className="mt-5 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-gray-800"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 bg-gray-100 border border-gray-300 p-4 rounded shadow-md text-black font-bold">
        Score: {score}
      </div>

      {showPopup && (
        <div
          id="popup-background"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl text-black font-bold mb-4">
              AI Generated Number: {AIGuess}
            </h2>
            <h2 className="text-2xl text-black font-bold mb-4">
              Your Number: {number}
            </h2>

            <div className="mt-4">
              <button
                onClick={() => generateNextNumber(true)}
                className="bg-gray-800 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-black hover:font-bold mr-5"
              >
                Greater
              </button>

              <button
                onClick={() => generateNextNumber(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-black hover:font-bold mr-5"
              >
                Smaller
              </button>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
            <h2 className="text-2xl text-black font-bold mb-4">AI Lose</h2>
            <button
              onClick={() => {
                setGameOver(false);
                setAttempts(0);
                setAIGuess("");
              }}
              className="bg-white text-black border-black border px-4 py-2 rounded hover:bg-gray-800 hover:text-white hover:border-transparent hover:font-normal mr-5 font-bold"
            >
              Reset Game
            </button>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
            <h2 className="text-2xl text-black font-bold mb-4">AI Wins</h2>
            <button
              onClick={() => {
                setGameWon(false);
                setAttempts(0);
                setAIGuess("");
              }}
              className="bg-white text-black border-black border px-4 py-2 rounded hover:bg-gray-800 hover:text-white hover:border-transparent hover:font-normal mr-5 font-bold"
            >
              Reset Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

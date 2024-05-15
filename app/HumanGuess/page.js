// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function HumanGuess() {
//     const [guess, setGuess] = useState('');
//     const [feedback, setFeedback] = useState('');
//     const [guessCount, setGuessCount] = useState(0);
//     const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
//     const router = useRouter();

//     const handleGuess = () => {
//         const userGuess = parseInt(guess);
//         if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
//             setFeedback('Please enter a valid number between 1 and 100.');
//             return;
//         }

//         setGuessCount(guessCount + 1);

//         if (userGuess === targetNumber) {
//             router.push(`/humanGuessResult?guess=${userGuess}&count=${guessCount}`);
//         } else if (userGuess < targetNumber) {
//             setFeedback('Too low. Try a higher number.');
//         } else {
//             setFeedback('Too high. Try a lower number.');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
//             <h1 className="text-3xl mb-4">Guess the Number (Human vs AI)</h1>
//             <p className="mb-4">Think of a number between 1 and 100.</p>
//             <input
//                 type="number"
//                 className="border rounded p-2 mb-2"
//                 placeholder="Enter your guess"
//                 value={guess}
//                 onChange={(e) => setGuess(e.target.value)}
//             />
//             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGuess}>Guess</button>
//             {feedback && <p className="mt-4">{feedback}</p>}
//         </div>
//     );
// }

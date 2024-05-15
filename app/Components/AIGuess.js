import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AIGuess() {
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [guessCount, setGuessCount] = useState(0);
    const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const router = useRouter();

    useEffect(() => {
        if (guess !== '') {
            setTimeout(() => {
                aiGuess();
            }, 1000); // AI takes a second before guessing
        }
    }, [guess]);

    const aiGuess = () => {
        setGuessCount(guessCount + 1);
        const aiGuess = Math.floor(Math.random() * 100) + 1;

        setGuess(aiGuess.toString());

        if (aiGuess === targetNumber) {
            router.push(`/aiGuessResult?guess=${aiGuess}&count=${guessCount}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
            <h1 className="text-3xl mb-4">Guess the Number (AI vs Human)</h1>
            <p>The AI is guessing a number between 1 and 100...</p>
            <p>AI's guess: {guess}</p>
            {guess !== '' && <p>Total guesses: {guessCount}</p>}
        </div>
    );
}

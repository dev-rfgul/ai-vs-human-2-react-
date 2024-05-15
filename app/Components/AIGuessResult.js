import { useRouter } from 'next/router';

export default function AIGuessResult() {
    const router = useRouter();
    const { guess, count } = router.query;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
            <h1 className="text-3xl mb-4">AI Guess Result</h1>
            <p>AI's guess: {guess}</p>
            <p>Total guesses: {count}</p>
        </div>
    );
}

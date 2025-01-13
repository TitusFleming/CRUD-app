'use client';

import { SignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import TodoList from '@/components/TodoList';

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="text-center mt-20">
      {isSignedIn ? (
        <TodoList />
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
          <p className="mb-8">Please sign in to continue</p>
          <SignIn routing="hash" appearance={{
            elements: {
              rootBox: "mx-auto"
            }
          }} />
        </div>
      )}
    </div>
  );
}

'use client';

import { SignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import TodoList from '@/components/TodoList';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="text-center mt-20">
      {isSignedIn ? (
        <TodoList />
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to the CRUD App</h1>
          <p className="mb-8">Please sign in to access your todos.</p>
          <SignIn routing="hash" />
        </div>
      )}
    </div>
  );
}

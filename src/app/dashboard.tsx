'use client';

import { useUser } from '@clerk/nextjs';
import TodoList from "@/components/TodoList";

export default function Dashboard() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TodoList />
    </div>
  );
}

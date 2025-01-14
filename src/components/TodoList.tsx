'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/Card';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError('Failed to fetch todos');
      setTodos([]);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add todo');
      }

      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update todo');
      }

      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete todo');
      }

      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete todo');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Tasks</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={addTodo} className="mb-8">
        <div className="flex gap-3">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow shadow-sm"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Add
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span 
                  className={`flex-grow ${
                    todo.completed 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-700'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <Button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white ml-4 px-3 py-1"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
}

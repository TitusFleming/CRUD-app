'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/Card';
import { useUser } from '@clerk/nextjs';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const todo = await response.json();
      setTodos(prevTodos => [todo, ...prevTodos]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed }),
      });

      if (response.ok) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed } : todo
        ));
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <section id="todos" className="py-16">
      <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Todo List</h2>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-1"
              />
              <Button type="submit" variant="default">
                Add
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {todos.map((todo) => (
            <Card key={todo.id} className="bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {todo.title}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Test query
    const count = await prisma.todo.count();
    console.log('Todo count:', count);
    
    return NextResponse.json({ status: 'Connected', count });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed', details: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 
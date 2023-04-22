import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'

export async function POST(
  request: NextRequest
) {
  const body = await request.json()
  const {
    email, 
    name, 
    password
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
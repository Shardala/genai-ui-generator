/* eslint-disable */

import { promptGuide } from '@/app/consts';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const data = await req.json()
        const prompt = data.body + ". " + promptGuide;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const code = response.text()

        return NextResponse.json({code: code})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
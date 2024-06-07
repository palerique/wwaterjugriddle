import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { x_capacity, y_capacity, z_amount_wanted } = await req.json();

    try {
        const response = await axios.post('http://localhost:3002/waterjugriddle/solve', {
            x_capacity, y_capacity, z_amount_wanted,
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ message: error.response?.data?.message || 'Internal Server Error' }, { status: error.response?.status || 500 });
    }
}

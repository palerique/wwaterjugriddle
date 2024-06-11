import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const { x_capacity, y_capacity, z_amount_wanted } = await req.json();
    try {
        const serverUrl = process.env.SERVER_URL;
        console.log(`Attempting POST request to server at: ${serverUrl}`);
        const response = await axios.post(`${serverUrl}/waterjugriddle/solve`, {
            x_capacity,
            y_capacity,
            z_amount_wanted,
        });
        console.log(
            `POST request successful, received response: ${response.data}`,
        );
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error(`There was an error with the POST request: ${error}`);
        return NextResponse.json(
            {
                message:
                    error.response?.data?.message || "Internal Server Error",
            },
            { status: error.response?.status || 500 },
        );
    }
}

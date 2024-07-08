// app/api/servers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BATTLEMETRICS_API_URL = 'https://api.battlemetrics.com/servers';
const SERVER_IDS = process.env.SERVER_IDS?.split(',') || [];

const API_KEY = process.env.BATTLEMETRICS_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const serverPromises = SERVER_IDS.map((id: string) =>
      axios.get(`${BATTLEMETRICS_API_URL}/${id}`, {
        headers: { 'Authorization': API_KEY }
      })
    );
    const serverResponses = await Promise.all(serverPromises);
    const serverData = serverResponses.map(response => response.data);
    console.log('Server data:', JSON.stringify(serverData, null, 2));
    return NextResponse.json(serverData, { status: 200 });  
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch server data' }, { status: 500 });
  }
}

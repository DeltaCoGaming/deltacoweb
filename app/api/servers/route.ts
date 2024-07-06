// app/api/servers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BATTLEMETRICS_API_URL = 'https://api.battlemetrics.com/servers';
const SERVER_IDS = [
  "27304883",
  "630697",
  "20151421",
  '5103536',
];

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQzNGE4NjIzMDVmZGI3NTMiLCJpYXQiOjE3MjAxOTIzMTcsIm5iZiI6MTcyMDE5MjMxNywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo3ODQyMjcifQ.eYb4iGmAGdsKGOOnUCjm27xAX8doCaRPefFzRZzPEmQ';

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


// app/api/members/route.ts
// move id and widget url to env 

import { NextResponse } from 'next/server';

const DISCORD_SERVER_ID = '1133120424054628352';
const DISCORD_WIDGET_URL = `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`;

export async function GET(request: Request) {
  try {
    console.log('Fetching members from Discord API...');
    const response = await fetch(DISCORD_WIDGET_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch members from Discord: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Discord API response:', JSON.stringify(data, null, 2));
    
    if (!data.members || !Array.isArray(data.members)) {
      throw new Error('Invalid data structure received from Discord API');
    }
    
    const members = data.members.map((member: any) => ({
      id: member.id,
      name: member.username,
      avatar: member.avatar_url,
      status: member.status,
    }));
    console.log('Mapped members:', JSON.stringify(members, null, 2));
    
    return NextResponse.json(members);
  } catch (error: unknown) {
    console.error('Error in API route:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
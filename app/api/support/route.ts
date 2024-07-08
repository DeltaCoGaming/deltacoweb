import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  try {
    if (!webhookUrl) {
      throw new Error('Discord webhook URL is not defined.');
    }

    const body = await req.json();
    const {
      discordName,
      discordId,
      supportType,
      urgency,
      description,
      receiveDm,
    } = body;

    const message = {
      content: `**New Support Request**\n\n**Discord Name:** ${discordName}\n**Discord ID:** ${discordId}\n**Support Type:** ${supportType}\n**Urgency:** ${urgency}\n**Description:** ${description}\n**Receive DM:** ${receiveDm ? 'Yes' : 'No'}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Support request sent successfully!' });
    } else {
      console.error('Failed to send support request:', response.status, response.statusText);
      return NextResponse.json({ message: 'Failed to send support request.' }, { status: response.status });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}

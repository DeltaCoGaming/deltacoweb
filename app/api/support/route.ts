import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      discordName,
      discordId,
      supportType,
      urgency,
      description,
      receiveDm,
    } = body;

    const webhookUrl = 'https://discord.com/api/webhooks/1259405355184558080/2rGnyr2daK9scGJs_j35C5Qsg2sB7OVNS2QzxuOzrMCx8mxQ6FCO4NA2dv8-gIZrK2Q3';

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
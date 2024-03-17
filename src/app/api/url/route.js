import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';


export async function POST(request) {
    const data = await request.json();
    const url = data.url
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', url);
    try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': process.env.REMOVE_BG_API_KEY,
            },
            responseType: 'arraybuffer',
            encoding: null
        });
        if (response.status !== 200) {
            console.error('Error:', response.status, response.statusText);
            return NextResponse.json({ error: 'Remove.bg API error' }, { status: response.status });
        }

        const uuid = uuidv4();
        const imagePath = `public/bg-remove-images/${uuid}.png`;

        fs.writeFileSync(imagePath, response.data);

        // Asynchronously delete the file
        await fs.promises.unlink(imagePath);

        return NextResponse.json({ id: uuid, imagePath: `/bg-remove-images/${uuid}.png`, del: "file deleted." }, { status: 200 });
    } catch (error) {
        console.error('Request failed:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

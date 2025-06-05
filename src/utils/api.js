const apiUrl = "https://api.openai.com/v1/chat/completions";

export function openai(prompt, setResult) {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: prompt,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.choices[0].message.content.toLowerCase());
            setResult(parseResult(data.choices[0].message.content.toLowerCase()));
        })
        .catch((error) => {
            console.error('Error al realizar la solicitud:', error);
        });
}


function parseResult(input) {
    return input.split(',').map(part => {
        const match = part.trim().match(/^(.+?)\s(\d+)%$/);
        if (match) {
            return {
                race: match[1],
                percentage: parseInt(match[2], 10),
                color: getRandomColor()
            };
        }
        return null;
    }).filter(Boolean);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}
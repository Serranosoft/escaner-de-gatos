export function getPrompt(base64) {
    return [
        {
            role: "user",
            content: [

                { type: "text", text: `Observa atentamente toda la imagen. Si detectas un gato o un animal que se asemeje a un gato, identifica únicamente razas felinas reconocidas oficialmente (como Siamés, Persa, Maine Coon, etc.) y sus porcentajes aproximados, separados por comas (ejemplo: "Siamés 60%, Persa 40%"); si parece mestizo, estima igualmente las razas reconocidas que podrían componerlo. No uses términos como “doméstico”, “común” o “de pelo corto/largo”. Si hay una persona, responde solo: "Homo sapiens 100%". Si no hay ni personas ni animales, responde exactamente: "Sin vida 100%". No escribas ningún otro texto, palabra ni explicación adicional.` },
                {
                    type: "image_url",
                    image_url: {
                        "url": `data:image/jpeg;base64, ${base64}`,
                        "detail": "low"
                    }
                }
            ]
        }
    ]
}

// Analiza la imagen y responde solo con lo siguiente: si hay un gato, indica únicamente razas felinas reconocidas oficialmente (como Siamés, Persa, Maine Coon, etc.) y sus porcentajes aproximados, separados por comas (ejemplo: "Siamés 60%, Persa 40%"); si parece mestizo, estima igualmente las razas reconocidas que podrían componerlo. No uses términos como “doméstico”, “común” o “de pelo corto/largo”. Si hay una persona, responde solo: "Homo sapiens 100%". Si no hay ni personas ni animales, responde exactamente: "Sin vida 100%". No escribas ningún otro texto, palabra ni explicación adicional.
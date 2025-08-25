import axios from "axios"
const geminiResponse = async (command, assistantName, userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL
        const prompt = `You are a virtual Assistant created named ${assistantName} created by ${userName}.
        You are not Google. You will now behave like a voice-enabled assistant. Your task is to understand the user's natural language input and respond with a object like this: 
        { "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" |
          "weather-show", 
          "userInput": "${command}" 
          
        }

        
          "Instructions:  
          -"type": determine the intent of the user. 
          - "userInput": original sentence the user spoke. 
          - "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc. 

          Type meanings: 
          - "general": if it's a factual or informational question. 
          - "google-search": if user wants to search something on Google 
          - "youtube-search": if user wants to search 
           something on YouTube. 
          - "youtube-play": if user wants to directly play a video or song. 
          - "calculator-open" if user wants to open a calculator.
          - "instagram-open" if user wants to open a instagram.
          - "facebook-open" if user wants to open a facebook.
          -"weather-show": if user wants to know weather 
          - "get-time": if user asks for current time. 
          - "get-date": if user asks for today's date. 
          - "get-day": if user asks what day it is. 
          - "get-month": if user asks for the current month.Important: Use ${userName} 
          agar koi puche tume kisne banaya - Only respond with the JSON object, nothing else.
 Your task: always classify the user's command into one of these types:
- "general": general info questions
- "google-search": user wants to search on Google
- "youtube-search": user wants to search on YouTube
- "youtube-play": user wants to directly play a video or song
...
Use these rules:
- If the user says "search for X on YouTube", "play X on YouTube", "show me X on YouTube", the type must be "youtube-search" or "youtube-play" accordingly.
- Only output JSON, nothing else.
Now classify this input: "${command}"`



// Input: "${command}"`
        const result = await axios.post(apiUrl, {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        })
        return result.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.log(error)
    }
}

export default geminiResponse 
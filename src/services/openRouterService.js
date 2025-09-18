const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || 'YOUR_OPENROUTER_API_KEY_HERE';
const MODEL_NAME = 'deepseek/deepseek-chat-v3.1:free';

export const generateCV = async (jobDescription, userProfile) => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY_HERE') {
    console.error('OpenRouter API Key is not configured.');
    throw new Error('OpenRouter API Key is not configured.');
  }

  const prompt = `You are an AI assistant specialized in generating tailored CVs for job applications. Given the following job description and user profile, generate a concise and impactful CV that highlights the most relevant experiences and skills for the job. Focus on keywords from the job description and optimize for ATS.\n\nJob Description:\n${jobDescription}\n\nUser Profile:\n${JSON.stringify(userProfile, null, 2)}\n\nGenerate the CV in a professional, clear, and ATS-friendly format. Focus on bullet points for achievements and responsibilities. Do not include personal contact information, only professional details.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`Failed to generate CV: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
};

export const extractJobKeywords = async (jobDescription) => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY_HERE') {
    console.error('OpenRouter API Key is not configured.');
    throw new Error('OpenRouter API Key is not configured.');
  }

  const prompt = `Given the following job description, extract the most important keywords and skills relevant for an Applicant Tracking System (ATS). Provide them as a comma-separated list.\n\nJob Description:\n${jobDescription}`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`Failed to extract keywords: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.split(',').map(keyword => keyword.trim());
  } catch (error) {
    console.error("Error calling OpenRouter API for keyword extraction:", error);
    throw error;
  }
};


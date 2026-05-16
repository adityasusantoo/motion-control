export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const apiKey = request.headers.get('x-user-api-key');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key Magnific tidak ditemukan.' }), { status: 401 });
    }

    const formData = await request.formData();
    
    // Pastikan URL API Magnific ini benar sesuai dokumentasi mereka
    const magnificApiUrl = 'https://api.magnific.ai/v1/motion'; 

    // Tembak ke server Magnific
    const magnificResponse = await fetch(magnificApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData
    });

    // Ambil balasan sebagai teks lalu kembalikan ke frontend
    const responseText = await magnificResponse.text();
    return new Response(responseText, {
      status: magnificResponse.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Vercel Server Error: ' + error.message }), { status: 500 });
  }
}

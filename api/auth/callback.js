export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const CLIENT_ID = 'Ov23liQdjxKpB65oZ4lF';
  const CLIENT_SECRET = '19811c5236b6775917be80a7f9c51477d89b0439';
  
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return new Response(`Error: ${tokenData.error_description}`, { status: 400 });
    }
    
    const accessToken = tokenData.access_token;
    
    // Return HTML that sends token back to CMS
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorization Complete</title>
</head>
<body>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        window.opener.postMessage(
          'authorization:github:success:{"token":"${accessToken}","provider":"github"}',
          e.origin
        );
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
  <p>Authorizing... Please wait.</p>
</body>
</html>
    `;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
    
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

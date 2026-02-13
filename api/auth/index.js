export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  const CLIENT_ID = 'Ov23liQdjxKpB65oZ4lF';
  const REDIRECT_URI = 'https://www.hallsofhope.com/api/auth/callback';
  
  const authURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo,user`;
  
  return Response.redirect(authURL, 302);
}

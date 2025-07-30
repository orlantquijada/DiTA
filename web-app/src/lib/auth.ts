export function isAuthenticated(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];

  return token === process.env.BEARER_TOKEN;
}

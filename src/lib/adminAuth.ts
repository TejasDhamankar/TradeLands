export const ADMIN_SESSION_COOKIE = 'tradelands_admin_session';
const ADMIN_SESSION_VALUE = 'authenticated';

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('Missing ADMIN_USERNAME or ADMIN_PASSWORD environment variables');
  }

  return { username, password };
}

export function isValidAdminLogin(username: string, password: string) {
  const admin = getAdminCredentials();
  return username === admin.username && password === admin.password;
}

export function getAdminSessionValue() {
  return ADMIN_SESSION_VALUE;
}


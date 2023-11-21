import * as jwt from 'jsonwebtoken';

interface User {
  id: string;
  // Add other user properties here as needed
}

// Specify the return type of the function as `string`
function generateAccessToken(user: User): string {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '5m',
  });
}

// Specify the return type of the function as `string`
function generateRefreshToken(user: User, jti: string): string {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '8h',
  });
}

interface TokenResult {
  accessToken: string;
  refreshToken: string;
}

// Specify the return type of the function as `TokenResult`
function generateTokens(user: User, jti: string): TokenResult {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};

import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService({});

interface AccessToken {
  userId?: string;
  iat?: number;
}

export function decodeAccessToken(accessToken: string) {
  try {
    if (!accessToken) return null;
    const result: AccessToken | string | null = jwtService.decode(
      accessToken.replace('Bearer ', ''),
    );

    if (typeof result === 'string' || !result) {
      return null;
    }
    return result;
  } catch (error) {
    throw '[Error] Token Invalid.';
  }
}

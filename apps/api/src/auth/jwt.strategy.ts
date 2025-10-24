import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@repo/database';

dotenv.config();

  // Create a singleton Prisma instance OUTSIDE the class
const prismaClient = new PrismaClient();

type JwtPayload = {
    sub: string;
    iss: string;
    aud: string | string[];
    scope?: string;
};

export interface JwtUser {
    userId: string;
    provider: string;
    providerId: string;
    sub: string;
    scopes: string[];
}

function splitSub(sub: string) {
    const [provider, ...rest] = sub.split('|');
    return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `${process.env.AUTH0_ISSUER_URL}`,
        algorithms: ['RS256'],
        });
    }

    async validate(payload: JwtPayload): Promise<JwtUser> {
        const { sub } = payload;
        const { provider, providerId } = splitSub(sub);

      // Use the singleton instance
        let auth = await prismaClient.authentication.findFirst({
            where: { provider, providerId },
            include: { user: true },
        });

        if (!auth) {
        const user = await prismaClient.user.create({
            data: {
                authentications: {
                create: {
                        provider,
                        providerId,
                    },
                },
            },
        });
        auth = await prismaClient.authentication.findFirst({
            where: { provider, providerId },
            include: { user: true },
        });
    }

        return {
            userId: auth.userId,
            provider,
            providerId,
            sub,
            scopes: (payload.scope ?? '').split(' ').filter(Boolean),
        } as JwtUser;
    }
}
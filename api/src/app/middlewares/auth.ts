import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface RequestWithUserDetails extends Request {
    userId?: string;
    userType?: 'clinic' | 'doctor' | 'patient';
}

export function verifyToken(request: RequestWithUserDetails, response: Response, next: NextFunction) {
    const headers: { [key: string]: string | string[] | undefined } = request.headers;
    const authHeader = typeof headers['authorization'] === 'string' ? headers['authorization'] : undefined;
    if (!authHeader) return response.status(403).json({ error: 'Authorization header not provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return response.status(403).json({ error: 'Token error' });

    const [ scheme, token ] = parts;
    if (!/^Bearer$/i.test(scheme)) return response.status(403).json({ error: 'Token malformatted' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return response.status(500).json({ error: 'Secret key not defined' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return response.status(500).json({ error: 'Failed to authenticate token' });

        const payload = decoded as JwtPayload & { userType: 'clinic' | 'doctor' | 'patient' };
        request.userId = payload.id;
        request.userType = payload.userType;
        next();
    });
}
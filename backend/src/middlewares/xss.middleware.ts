import { NextFunction, Request, Response } from 'express';

const sanitize = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value.replace(/[<>]/g, '');
  }
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitize(v)]));
  }
  return value;
};

export const xssSanitizer = (req: Request, _res: Response, next: NextFunction) => {
  req.body = sanitize(req.body);
  next();
};

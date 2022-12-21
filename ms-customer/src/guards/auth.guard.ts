import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    return this.validateRequest(request);
  }

  validateRequest(request): Promise<boolean> {
    const token = request.headers.authorization;
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const { data } = await this.httpService.axiosRef.get<boolean>(
          'http://44.205.159.254:3500/api/v1/auth/validate',
          {
            headers: {
              authorization: `${token.split('Bearer ')[1]}`,
            },
          },
        );
        resolve(data);
      } catch (error) {
        reject(false);
      }
    });
  }
}

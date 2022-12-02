import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export interface UserProfile {
  profiles: ProfileRoles[];
}
export interface ProfileRoles {
  roles: [{ name: string }];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request, roles);
  }

  validateRequest(request, routeRoles: string[]): Promise<boolean> {
    const token = request.headers.authorization;
    return new Promise<boolean>(async (resolve, reject) => {
      const { data: user } = await this.httpService.axiosRef.get(
        'http://44.198.33.18:3500/api/v1/auth/decode',
        {
          headers: {
            authorization: `${token.split('Bearer ')[1]}`,
          },
        },
      );
      if (!user) resolve(false);
      // Fazer um request para o ms-authorization usando o user.login para recuperar os perfis do usuário
      // this.httpService.axiosRef
      //   .get(`http://44.198.33.18:3507/api/v1/profiles/${user.login}`, {})
      //   .then((res) => {
      //     const user: UserProfile = res.data.profiles;
      //     user.profiles.forEach((profile) => {
      //       if (profile.roles.find((role) => routeRoles.includes(role.name))) {
      //         resolve(true);
      //       }
      //     });
      //     resolve(false);
      //   })
      //   .catch(() => {
      //     reject(false);
      //   });

      // Remover essa linha quando a solução estiver pronta
      resolve(true);
    });
  }
}

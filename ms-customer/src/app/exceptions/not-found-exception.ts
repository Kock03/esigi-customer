import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Registro não encontrado', HttpStatus.NOT_FOUND);
  }
}

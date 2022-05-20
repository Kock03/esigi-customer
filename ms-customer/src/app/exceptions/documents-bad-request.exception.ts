import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentsBadRequestExcpetion extends HttpException {
  constructor() {
    super('O cnpj não é válido', HttpStatus.BAD_REQUEST);
  }
}

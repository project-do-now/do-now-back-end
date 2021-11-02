import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  code: number = HttpStatus.OK;
  message: string = '';
  payload?: any = null;
  constructor(code?: number, message?: string, payload?: any) {
    (this.code = code), (this.message = message), (this.payload = payload);
  }
}

export class UserDTO {
  @ApiProperty({ description: '아이디' })
  id: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
  @ApiProperty({ description: '이름' })
  name: string;
  @ApiProperty({ description: '성별 : [ 남 / 여 ]' })
  gender: string;
  @ApiProperty({ description: '휴대폰 번호 : [ 000-0000-0000 ]' })
  phoneNumber: string;
  @ApiProperty({ description: '이메일 주소 : [ 0000@gmail.com ]' })
  email: string;
  @ApiProperty({ description: '생일 : [ 1999-01-01 ]' })
  birthday: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDTO {
  @ApiProperty({ description: '아이디' })
  id: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
}

export class LoginResDTO {
  @ApiProperty({ description: 'access Token' })
  accessToken: string;
}

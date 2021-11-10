import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './model.dto';

export class PostUserReqDTO extends UserDTO {}

export class GetUserResDTO extends UserDTO {}

export class GetUsersResDTO {
  @ApiProperty({ description: '등록된 유저 인원 수' })
  total: number;
  @ApiProperty({ type: UserDTO, isArray: true, description: '유저 전체 조회' })
  users: UserDTO[];
}

export class PatchUserQueryDTO {
  @ApiProperty({ description: '비밀번호' })
  password?: string;
  @ApiProperty({ description: '이름' })
  name?: string;
  @ApiProperty({ description: '성별 : [ 남 / 여 ]' })
  gender?: string;
  @ApiProperty({ description: '휴대폰 번호 : [ 000-0000-0000 ]' })
  phoneNumber?: string;
  @ApiProperty({ description: '이메일 주소 : [ 0000@gmail.com ]' })
  email?: string;
  @ApiProperty({ description: '생일 : [ 1999-01-01 ]' })
  birthday?: string;
}

export class PutUserBodyDTO {
  @ApiProperty({ description: '비밀번호' })
  password?: string;
  @ApiProperty({ description: '이름' })
  name?: string;
  @ApiProperty({ description: '성별 : [ 남 / 여 ]' })
  gender?: string;
  @ApiProperty({ description: '휴대폰 번호 : [ 000-0000-0000 ]' })
  phoneNumber?: string;
  @ApiProperty({ description: '이메일 주소 : [ 0000@gmail.com ]' })
  email?: string;
  @ApiProperty({ description: '생일 : [ 1999-01-01 ]' })
  birthday?: string;
}

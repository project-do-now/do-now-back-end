/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({ description: 'response code' })
  code: number = HttpStatus.OK;
  @ApiProperty({ description: 'response message' })
  message: string = '';
  payload?: any = null;
  constructor(code?: number, message?: string, payload?: any) {
    (this.code = code), (this.message = message), (this.payload = payload);
  }
}

export class Label {
  @ApiProperty({
    description:
      '일정 표시 색 [ red | orange | yellow | green | blue | skyblue | purple | white | black ]',
    required: false,
    default: 'purple',
  })
  color: string;
  @ApiProperty({
    description: '다꾸 스티커 [ ... ]',
    required: false,
    default: null,
  })
  sticker?: string | null;
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

export class ScheduleDTO {
  @ApiProperty({ description: '일정 아이디' })
  id: number;
  @ApiProperty({ description: '일정을 생성한 유저 아이디' })
  userId: string;
  @ApiProperty({ description: '생성 날짜 [ 2021-10-10T00:00:00 ]' })
  createdAt: string;
  @ApiProperty({
    description: '수정된 날짜 [ 2021-10-10T00:00:00 ]',
    default: null,
  })
  updatedAt: string | null;
  @ApiProperty({ description: '일정 표시 시작날짜 [ 2021-10-10T00:00:00 ]' })
  startDate: string;
  @ApiProperty({ description: '일정 표시 종료날짜 [ 2021-10-10T00:00:00 ]' })
  endDate: string;
  @ApiProperty({ description: '일정 제목' })
  title: string;
  @ApiProperty({ description: '일정 내용', required: false })
  content: string;
  @ApiProperty({
    description: '초대 및 공유할 참고인 아이디 리스트',
    required: false,
  })
  invitedId?: string[];
  @ApiProperty({ description: '라벨', required: false })
  label?: Label;
  @ApiProperty({
    description: '중요 표시 [ true | false ]',
    required: false,
    default: false,
  })
  starMark?: boolean;
  @ApiProperty({
    description: '반복 일정 설정 아이디',
    required: false,
    default: null,
  })
  repeatedScheduleId?: number | null;
}

export class DiaryDTO {
  @ApiProperty({ description: '일기 아이디' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '포스팅 날짜' })
  createdAt: string;
  @ApiProperty({ description: '수정 날짜', default: null })
  updatedAt?: string;
  @ApiProperty({ description: '유저 아이디' })
  userId: string;
  @ApiProperty({ description: '일기 내용' })
  content: string;
  @ApiProperty({ description: '암호 설정 여부', default: false })
  setPassword: boolean;
}

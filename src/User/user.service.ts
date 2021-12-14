import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import * as ModelDTO from 'src/dto/model.dto';
import * as UserDTO from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { decodeAccessToken } from 'src/util/token.manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async postUser(createUserDTO: UserDTO.PostUserReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const findUser = await this.usersRepository.findOne(createUserDTO.id);

    if (findUser) {
      result.message = '[Error] Try another User Id.';
      result.payload = findUser;
    } else {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

      const createdUser = { ...createUserDTO, password: hashedPassword };
      this.usersRepository.insert(createdUser);

      const payloadUser = new UserDTO.UserResDTO();
      payloadUser.id = createdUser.id;
      payloadUser.name = createdUser.name;
      payloadUser.gender = createdUser.gender;
      payloadUser.phoneNumber = createdUser.phoneNumber;
      payloadUser.email = createdUser.email;
      payloadUser.birthday = createdUser.birthday;

      result.message = 'User Create Success.';
      result.payload = payloadUser;
    }

    result.code = HttpStatus.CREATED;
    return result;
  }

  async getUser(userId: string) {
    const result = new ModelDTO.ResponseDTO();
    const user = new UserDTO.GetUserResDTO();

    const findUser = (await this.usersRepository.findOne(userId)) ?? null;

    if (findUser) {
      user.id = findUser.id;
      user.name = findUser.name;
      user.gender = findUser.gender;
      user.phoneNumber = findUser.phoneNumber;
      user.email = findUser.email;
      user.birthday = findUser.birthday;

      result.message = '';
      result.payload = user;
    } else {
      result.message = '[Error] User Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async getUsers() {
    const result = new ModelDTO.ResponseDTO();

    const users = new UserDTO.GetUsersResDTO();

    const findAllUsers = await this.usersRepository.findAndCount();

    users.total = findAllUsers[1];

    users.users = findAllUsers[0].map((value) => ({
      id: value.id,
      name: value.name,
      gender: value.gender,
      birthday: value.birthday,
      email: value.email,
      phoneNumber: value.phoneNumber,
    }));

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = users;

    return result;
  }

  async patchUSer(
    accessToken: string,
    patchUserQeuryDTO: UserDTO.PatchUserQueryDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const { password, name, gender, phoneNumber, email, birthday } =
      patchUserQeuryDTO;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const findUser = await this.usersRepository.findOne(userId);

    if (findUser) {
      const payloadUser = new UserDTO.UserResDTO();

      payloadUser.id = userId;
      payloadUser.name = name ?? findUser.name;
      payloadUser.gender = gender ?? findUser.gender;
      payloadUser.phoneNumber = phoneNumber ?? findUser.phoneNumber;
      payloadUser.email = email ?? findUser.email;
      payloadUser.birthday = birthday ?? findUser.birthday;

      const updateUser = {
        ...payloadUser,
        password: hashedPassword ?? findUser.password,
      };

      await this.usersRepository.update(userId, updateUser);

      result.message = 'User Update Success.';
      result.payload = payloadUser;
    } else {
      result.message = '[Error] User Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async putUser(accessToken: string, putUserBodyDTO: UserDTO.PutUserBodyDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { name, gender, phoneNumber, password, email, birthday } =
      putUserBodyDTO;

    if (!name || !gender || !phoneNumber || !password || !email || !birthday) {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] All Parameters should be needed.';
      result.payload = null;
      return result;
    }
    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const findUser = await this.usersRepository.findOne(userId);

    if (findUser) {
      const payloadUser = new UserDTO.UserResDTO();
      payloadUser.id = userId;
      payloadUser.name = name;
      payloadUser.gender = gender;
      payloadUser.phoneNumber = phoneNumber;
      payloadUser.email = email;
      payloadUser.birthday = birthday;

      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      const updateUser = {
        ...payloadUser,
        password: hashedPassword,
      };

      await this.usersRepository.update(userId, updateUser);

      result.message = 'User Update Success.';
      result.payload = payloadUser;
    } else {
      result.message = '[Error] User Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async deleteUser(userId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findUser = await this.usersRepository.findOne(userId);

    if (findUser) {
      await this.usersRepository.delete(userId);
      result.message = 'User Delete Success.';
    } else {
      result.message = '[Error] User Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}

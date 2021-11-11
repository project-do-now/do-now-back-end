import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from 'src/entity/user.entity';
import * as ModelDTO from 'src/dto/model.dto';
import * as UserDTO from 'src/dto/user.dto';

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
      this.usersRepository.insert(createUserDTO);
      result.message = 'User Create Success.';
      result.payload = createUserDTO;
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
      user.password = findUser.password;
      user.name = findUser.name;
      user.gender = findUser.gender;
      user.phoneNumber = findUser.phoneNumber;
      user.email = findUser.email;
      user.birthday = findUser.birthday;

      result.message = '';
      result.payload = user;
    } else {
      result.message = 'User Not Found.';
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
    users.users = findAllUsers[0];

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = users;

    return result;
  }

  async patchUSer(
    userId: string,
    patchUserQeuryDTO: UserDTO.PatchUserQueryDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();
    const { password, name, gender, phoneNumber, email, birthday } =
      patchUserQeuryDTO;

    const findUser = await this.usersRepository.findOne(userId);

    if (findUser) {
      const payloadUser = new ModelDTO.UserDTO();

      payloadUser.id = userId;
      payloadUser.password = password ?? findUser.password;
      payloadUser.name = name ?? findUser.name;
      payloadUser.gender = gender ?? findUser.gender;
      payloadUser.phoneNumber = phoneNumber ?? findUser.phoneNumber;
      payloadUser.email = email ?? findUser.email;
      payloadUser.birthday = birthday ?? findUser.birthday;

      await this.usersRepository.update(userId, payloadUser);

      result.message = 'User Update Success.';
      result.payload = payloadUser;
    } else {
      result.message = 'User Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async putUser(userId: string, putUserBodyDTO: UserDTO.PutUserBodyDTO) {
    const result = new ModelDTO.ResponseDTO();

    const findUser = await this.usersRepository.findOne(userId);

    if (findUser) {
      const updateUser = new ModelDTO.UserDTO();
      updateUser.id = userId;
      updateUser.password = putUserBodyDTO?.password ?? null;
      updateUser.name = putUserBodyDTO?.name ?? null;
      updateUser.gender = putUserBodyDTO?.gender ?? null;
      updateUser.phoneNumber = putUserBodyDTO?.phoneNumber ?? null;
      updateUser.email = putUserBodyDTO?.email ?? null;
      updateUser.birthday = putUserBodyDTO?.birthday ?? null;

      await this.usersRepository.update(userId, updateUser);

      result.message = 'User Update Success.';
      result.payload = updateUser;
    } else {
      result.message = 'User Not Found.';
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
      result.message = 'User Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}

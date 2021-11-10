import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as UserDTO from 'src/dto/user.dto';

@Injectable()
export class UserService {
  private users: ModelDTO.UserDTO[] = [];

  async postUser(createUserDTO: UserDTO.PostUserReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const findUser = this.users.find((value) => value.id === createUserDTO.id);

    if (findUser) {
      result.message = '[Error] Try another User Id.';
    } else {
      this.users.push(createUserDTO);
      result.message = 'User Create Success.';
    }

    result.code = HttpStatus.CREATED;
    result.payload = null;
    return result;
  }

  async getUser(userId: string) {
    const result = new ModelDTO.ResponseDTO();
    const user = new UserDTO.GetUserResDTO();

    const findUser = this.users.find((value) => value.id === userId) ?? null;

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

    users.total = this.users.length;
    users.users = this.users;

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

    const findUser = this.users.find((value) => value.id === userId);
    const payloadUser = new ModelDTO.UserDTO();

    if (findUser) {
      this.users = this.users.map((value) => {
        if (value.id === userId) {
          payloadUser.id = userId;
          payloadUser.password = password ?? value.password;
          payloadUser.name = name ?? value.name;
          payloadUser.gender = gender ?? value.gender;
          payloadUser.phoneNumber = phoneNumber ?? value.phoneNumber;
          payloadUser.email = email ?? value.email;
          payloadUser.birthday = birthday ?? value.birthday;

          return payloadUser;
        } else return value;
      });

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

    const findUser = this.users.find((value) => value.id === userId);

    if (findUser) {
      const updateUser = new ModelDTO.UserDTO();
      this.users = this.users.map((value) => {
        if (value.id === userId) {
          updateUser.id = userId;
          updateUser.password = putUserBodyDTO.password;
          updateUser.name = putUserBodyDTO.name;
          updateUser.gender = putUserBodyDTO.gender;
          updateUser.phoneNumber = putUserBodyDTO.phoneNumber;
          updateUser.email = putUserBodyDTO.email;
          updateUser.birthday = putUserBodyDTO.birthday;

          return updateUser;
        } else return value;
      });

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

    const user = this.users.find((value) => value.id === userId);

    if (user) {
      this.users = this.users.filter((value) => value.id !== userId);
      result.message = 'User Delete Success.';
    } else {
      result.message = 'User Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}

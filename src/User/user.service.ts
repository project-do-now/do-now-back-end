import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as UserDTO from 'src/dto/user.dto';

@Injectable()
export class UserService {
  private users: ModelDTO.UserDTO[] = [];

  async putUser(createUserDTO: UserDTO.CreateUserDTO) {
    const result = new ModelDTO.ResponseDto();
    this.users.push(createUserDTO);

    result.code = HttpStatus.CREATED;
    result.message = 'User Create Success.';
    result.payload = null;
    return result;
  }

  async getUser(userId: string) {
    const result = new ModelDTO.ResponseDto();
    const user = new UserDTO.FindUserResDTO();

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
    const result = new ModelDTO.ResponseDto();

    const users = new UserDTO.FindUsersResDTO();

    users.total = this.users.length;
    users.users = this.users;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = users;

    return result;
  }

  async updateUser(
    userId: string,
    updateUserBodyDTO: UserDTO.UpdateUserBodyDTO,
  ) {
    const result = new ModelDTO.ResponseDto();

    const findUser = this.users.find((value) => value.id === userId);

    if (findUser) {
      this.users = this.users.map((value) => {
        if (value.id === userId) {
          const updateUser = new ModelDTO.UserDTO();

          updateUser.id = userId;
          updateUser.password = updateUserBodyDTO.password ?? value.password;
          updateUser.name = updateUserBodyDTO.name ?? value.name;
          updateUser.gender = updateUserBodyDTO.gender ?? value.gender;
          updateUser.phoneNumber =
            updateUserBodyDTO.phoneNumber ?? value.phoneNumber;
          updateUser.email = updateUserBodyDTO.email ?? value.email;
          updateUser.birthday = updateUserBodyDTO.birthday ?? value.birthday;

          return updateUser;
        } else return value;
      });

      result.message = 'User Update Success.';
    } else {
      result.message = 'User Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }

  async deleteUser(userId: string) {
    const result = new ModelDTO.ResponseDto();

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

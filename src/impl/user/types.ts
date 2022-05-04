import { resolve } from "path";
import {
  DeleteUserResponse,
  GetUserResponse,
  ListUserResponse,
  PostUserResponse,
  UpdateUserResponse,
  UserApi,
} from "../../../dist/api/user/types";
import { Api } from "../../../dist/models";
import { con } from "../../mySQL/config";

export class UserApiImpl implements UserApi {
  listUser(): Promise<ListUserResponse> {
    return new Promise<ListUserResponse>((resolve, reject) => {
      try {
        con.query("select * from users", function (err, res) {
          if (err) throw err;
          console.log(res);
          const response = <ListUserResponse>{
            status: 200,
            body: res,
          };
          resolve(response);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  postUser(request: Api.User): Promise<PostUserResponse> {
    return new Promise<PostUserResponse>((resolve, reject) => {
      console.log(request.firstName);
      try {
        let users = {
          id: request.id,
          firstName: request.firstName,
          lastName: request.lastName,
          dateOfBirth: request.dateOfBirth,
          address: request.address,
        };
        con.query("insert into users set ?", users, function (err, res) {
          if (err) {
            throw err;
          }
          console.log(res.insertId);
          const response = <PostUserResponse>{
            status: 201,
            body: `user created successfully with ${res.insertId.toString()}`,
          };
          resolve(response);
        });
      } catch (err) {
        console.log(err);
        const response = <PostUserResponse>{ status: 400, body: err };
        resolve(response);
      }
    });
  }

  getUser(userId: string): Promise<GetUserResponse> {
    return new Promise<GetUserResponse>((resolve, reject) => {
      try {
        console.log(userId);
        con.query(
          "select * from users where id = ?",
          [userId],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            const response = <GetUserResponse>{
              status: 200,
              body: res[0],
            };
            resolve(response);
          }
        );
      } catch (err) {
        console.log(err);
        const response = <GetUserResponse>{ status: 400, body: err };
        resolve(response);
      }
    });
  }

  updateUser(userId: string, request: Api.User): Promise<UpdateUserResponse> {
    return new Promise<UpdateUserResponse>((resolve, reject) => {
      try {
        con.query(
          "update users set firstName = ?, lastName = ?, dateOfBirth = ?, address = ? where id = ?",
          [
            request.firstName,
            request.lastName,
            request.dateOfBirth,
            request.address,
            userId,
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            const response = <UpdateUserResponse>{
              status: 200,
              body: { message: `user updated successfully with ${userId}` },
            };
            resolve(response);
          }
        );
      } catch (err) {
        console.log(err);
        const response = <UpdateUserResponse>{ status: 400, body: err };
        resolve(response);
      }
    });
  }

  deleteUser(userId: string): Promise<DeleteUserResponse> {
    return new Promise<DeleteUserResponse>((resolve, reject) => {
      try {
        con.query(
          "delete from users where id = ?",
          [userId],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            const response = <DeleteUserResponse>{
              status: 200,
              body: { message: `user deleted successfully with ${userId}` },
            };
            resolve(response);
          }
        );
      } catch (err) {
        console.log(err);
        const response = <DeleteUserResponse>{ status: 400, body: err };
        resolve(response);
      }
    });
  }
}

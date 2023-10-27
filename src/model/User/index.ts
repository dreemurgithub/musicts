import { regexUserName, regexPassword } from "../../config/constants";
import {
  addUserQuery,
  checkSignin,
  checkEmail,
  checkUsername,
  editUserQuery,
} from "../helper/query";
import { errorUserCheck } from "./userRegexHelper";

const makeUser = async ({
  password,
  username,
  name,
}: {
  password: string;
  username: string;
  name: string;
}) => {
  const checkError = await errorUserCheck({ name, password, username });
  if (!checkError.success) return checkError;
  const result = await addUserQuery({ name, password, username });
  if (result.rowCount)
    return {
      success: true,
      data: { name, password, username },
      message: "",
    };
  return {
    success: false,
    message: "Something wrong",
    data: null,
  };
};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await checkSignin({ email, password });
  if (result.rowCount)
    return {
      success: true,
      data: {
        email,
        password,
        username: result.rows[0].username,
        id: result.rows[0].id,
      },
      message: "",
    };
  return {
    success: false,
    message: "Wrong email or password",
    data: null,
  };
};

const editUser = async ({
  password,
  username,
  id,
  name,
}: {
  password: string;
  username: string;
  id: number;
  name: string;
}) => {
  const checkError = await errorUserCheck({ name, password, username });
  if (!checkError.success) return checkError;

  const result = await editUserQuery({ name, password, id, username });
  if (result.rowCount)
    return {
      success: true,
      data: {
        name,
        password,
        username,
        id
      },
      message: "",
    };
  return {
    success: false,
    message: "Something wrong",
    data: null,
  };
};

export { makeUser, signIn, editUser };

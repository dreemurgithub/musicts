import { regexUserName, regexPassword } from "@/config/constants";
import {
  addUserQuery,
  checkSignin,
  checkUsername,
  editUserQuery,
} from "@/model/helper/query";
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
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const result = await checkSignin({ username, password });
  if (result.rowCount)
    return {
      success: true,
      data: {
        username,
        password,
        id: result.rows[0].id,
      },
      message: "",
    };
  return {
    success: false,
    message: "Wrong username or password",
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

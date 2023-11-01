import { regexUserName, regexPassword } from "@/config/constants";
import {
  addUserQuery,
  checkSignin,
  checkUsername,
  editUserQuery,
} from "@/model/helper/query";
import { errorUserCheck } from "./userRegexHelper";
import { hashPassword } from "./hash";
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
  const passwordSecure = hashPassword(password)
  const result = await addUserQuery({ name, password: passwordSecure, username });
  if (result.rowCount)
    return {
      success: true,
      data: { name, username },
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
  const passwordSecure = hashPassword(password)
  const result = await checkSignin({ username, password: passwordSecure });
  if (result.rowCount)
    return {
      success: true,
      data: {
        username,
        id: Number(result.rows[0].id),
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
  const checkError = await errorUserCheck({ name, password, username,id });
  if (!checkError.success) return checkError;

  const passwordSecure = hashPassword(password)

  const result = await editUserQuery({ name, password : passwordSecure, id, username });
  if (result.rowCount)
    return {
      success: true,
      data: {
        name,
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

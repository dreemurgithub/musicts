import { regexEmail, regexPassword } from "../../config/constants";
import { addUser, checkSignin } from "../helper/query";

const makeUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  if (!regexEmail.test(email))
    return {
      success: false,
      message: "This is not an email",
    };
  if (!regexPassword.test(password))
    return {
      success: false,
      message:
        "Password contain atleast 6 characters, a number, a lowercase and uppercase, one chacracter in '#' or '@' or '$' or '%' ",
    };
  const result = await addUser({ email, password, username });
  console.log(result.rowCount);
  if (result.rowCount)
    return {
      success: true,
      data: { email, password, username },
    };
  return {
    success: false,
    message: "Something wrong",
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
  console.log(result.rowCount);
  if (result.rowCount)
    return {
      success: true,
      data: { email, password, username: result.rows[0].username,id: result.rows[0].id },
    };
  return {
    success: false,
    message: "Wrong email or password",
  };
};

const editUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return {
    success: false,
    message: "Something wrong",
  };
};

export { makeUser, signIn, editUser };

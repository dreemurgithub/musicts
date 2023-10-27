import { regexUserName, regexPassword } from "../../config/constants";
import { checkUsername } from "../helper/query";

export const errorUserCheck = async ({
  name,
  password,
  username,
}: {
  name: string;
  password: string;
  username: string;
}) => {
  if (!name || !username || !password)
    return {
      success: false,
      message: "Missing display name/username/name/password",
    };
  if (!regexUserName.test(username))
    return {
      success: false,
      message: "This is not an name",
    };
  if (!regexPassword.test(password))
    return {
      success: false,
      message:
        "Password contain atleast 5 characters, a number, a lowercase and uppercase",
    };
  const checkUserName = await checkUsername(username);
  if (checkUserName)
    return {
      success: false,
      message: "This username is already taken",
    };
  return { success: true,message:'' ,data: null};
};

import * as core from "express-serve-static-core";
import register from "./authentication/register";
import login from "./authentication/login";
import resetPassword from "./authentication/resetPassword";
import checkRestToken from "./authentication/checkRestToken";
import changeUserPassword from "./authentication/changeUserPassword";
// import personalChats from "./chats/personal";

const useRoutes = (app: core.Express) => {
  app.use("/register", register);
  app.use("/login", login);
  app.use("/resetPassword", resetPassword);
  app.use("/checkresettoken", checkRestToken);
  app.use("/changepassword", changeUserPassword);
};

export default useRoutes;

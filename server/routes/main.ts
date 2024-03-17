import * as core from "express-serve-static-core";
import register from "./register";
import login from "./login";
import resetPassword from "./resetPassword";
import checkRestToken from "./checkRestToken";
import changeUserPassword from "./changeUserPassword";

const useRoutes = (app: core.Express) => {
  app.use("/register", register);
  app.use("/login", login);
  app.use("/resetPassword", resetPassword);
  app.use("/checkresettoken", checkRestToken);
  app.use("/changepassword", changeUserPassword);
};

export default useRoutes;

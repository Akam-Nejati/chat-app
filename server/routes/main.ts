import * as core from "express-serve-static-core";
import register from "./register"
import login from "./login"


const useRoutes = (app: core.Express) => {
    app.use("/register", register)
    app.use("/login", login)
}

export default useRoutes
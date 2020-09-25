import express from "express"
import {UserController} from "../controller/UserController"

export const user = express.Router()

const userController = new UserController()

user.post("/signup-not-paying-listener", userController.signupNotPayingListener)
user.post("/signup-admin", userController.signupAdmin)
user.post("/signup-band", userController.signupBand)
user.get("/admin/get-all-bands", userController.allBands)
user.post("/admin/approve-band", userController.approveBand)
user.post("/login", userController.login)
user.get("/user-online", userController.userOnline)
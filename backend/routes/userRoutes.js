const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", authController.userLogin);

router.post("/signup", authController.userSignUp);

router.post("/signIn", authController.userSignIn);

router.post("/forgotPassword", authController.forgotUserPassword);

router.patch("/resetPassword/:token", authController.resetUserPassword);

router.get("/authenticate", authController.authenticateUser);

router.get(
  "/myDeliveries",
  authController.authenticate,
  authController.authorize("user"),
  userController.getMyDeliveries
);

router.patch(
  "/updateMyPassword",
  authController.authenticate,
  authController.authorize("user"),
  authController.updateMyPassword
);

router
  .route("/me")
  .get(
    authController.authenticate,
    authController.authorize("user"),
    userController.Me
  )
  .patch(
    authController.authenticate,
    authController.authorize("admin"),
    userController.updateMe
  )
  .delete(
    authController.authenticate,
    authController.authorize("admin"),
    userController.deleteMe
  );

router.get(
  "/",
  authController.authenticate,
  authController.authorize("admin"),
  userController.getAllUser
);

module.exports = router;

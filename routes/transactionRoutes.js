const express = require("express");
const {
  initializeTransaction,
  verifyTransaction,
  webhook,
  createTransaction,
  getBanksList,
  getAccountDetails,
  withdrawFunds,
} = require("../controllers/transactionController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/paystack/initialize",
  authController.authenticate,
  authController.authorize("user"),
  initializeTransaction
);
router.get(
  "/paystack/verify",
  authController.authenticate,
  authController.authorize("user"),
  verifyTransaction
);

router.get(
  "/paystack/listBanks",
  authController.authenticate,
  authController.authorize("user"),
  getBanksList
);
router.post(
  "/paystack/accountDetails",
  authController.authenticate,
  authController.authorize("user"),
  getAccountDetails
);
router.post(
  "/withdraw",
  authController.authenticate,
  authController.authorize("user"),
  withdrawFunds
);
router.get(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
  webhook
);
router.post(
  "/create",
  authController.authenticate,
  authController.authorize("user"),
  createTransaction
);

module.exports = router;

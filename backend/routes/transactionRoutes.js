const express = require("express");
const {
  initializeTransaction,
  verifyTransaction,
  webhook,
  // getTransactionFee,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/paystack/initialize", initializeTransaction);
router.get("/paystack/verify", verifyTransaction);
router.get(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
  webhook
);

// router.post("/paystack/fee", getTransactionFee);

module.exports = router;

const crypto = require("crypto");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { catchAsync, sendSuccessResponseData } = require("../utils/helpers");
const AppError = require("../utils/appError");

module.exports.createTransaction = catchAsync(async (req, res, next) => {
  const { amount, type } = req.body;

  console.log(amount);

  if (!amount || isNaN(amount) || amount <= 0) {
    return next(new AppError("Amount must be a positive number", 400));
  }

  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("User not found", 404));

  if (type === "withdrawal" && user.balance < amount) {
    return next(new AppError("Insufficient balance", 400));
  }

  // Create a transaction
  const transaction = await Transaction.create({
    user: req.user._id,
    amount,
    type,
    status: "completed",
  });

  // Update user balance
  if (type === "deposit") {
    user.balance += amount;
  } else if (type === "withdrawal") {
    user.balance -= amount;
  }
  await user.save();

  sendSuccessResponseData(res, "transaction", transaction, user.balance);
});

// Initialize Transaction
module.exports.initializeTransaction = catchAsync(async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || (!amount && amount !== 0)) {
      return res.status(400).json({ error: "Email and amount are required" });
    }

    console.log(process.env.PAYSTACK_SECRET_KEY);

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      }
    );

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to initialize transaction");

    res.json(data);
  } catch (error) {
    console.error("Error initializing transaction:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Verify Transaction
module.exports.verifyTransaction = catchAsync(async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ error: "Reference is required" });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Verification failed");

    if (data.data.status === "success") {
      // TODO: Update database with successful transaction
      res.json({ status: true, message: "Payment verified" });
    } else {
      res.status(400).json({ status: false, message: "Payment not verified" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "Error verifying payment" });
  }
});

// Webhook for Paystack
module.exports.webhook = catchAsync(async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const signature = req.headers["x-paystack-signature"];

    const hash = crypto
      .createHmac("sha512", secret)
      .update(req.rawBody)
      .digest("hex");

    if (hash !== signature) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    const event = req.body;

    if (event.event === "charge.success") {
      const paymentData = event.data;
      console.log("Payment Verified via Webhook:", paymentData.reference);

      // TODO: Update database with payment status
      res.status(200).json({ status: "success" });
    } else {
      res.status(400).json({ status: "ignored" });
    }
  } catch (error) {
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

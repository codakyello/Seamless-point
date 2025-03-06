import axios from "axios";

// Anything that involves money transfers payments, deposits, withdrawals, delivery fee
export const initializeTransaction = async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || (!amount && amount !== 0)) {
      return res.status(400).json({ error: "Email and amount are required" });
    }

    console.log(process.env.PAYSTACK_SECRET_KEY);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error initializing transaction:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { reference } = req.query;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      // TODO: Update database with successful transaction
      res.json({ status: true, message: "Payment verified" });
    } else {
      res.status(400).json({ status: false, message: "Payment not verified" });
    }
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
};
export const webhook = async (req, res) => {
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
};
// export const getTransactionFee = async (req, res) => {
//   const { amount } = req.body;

//   if (!amount) {
//     return res.status(400).json({ error: "Amount is required" });
//   }

//   try {
//     const response = await axios.get(
//       `https://api.paystack.co/transaction/fee?amount=${amount}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Error getting transaction fee:",
//       error.response?.data || error.message
//     );
//     res
//       .status(500)
//       .json({ error: error.response?.data || "Internal Server Error" });
//   }
// };

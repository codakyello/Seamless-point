const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const generateTrackingID = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);
const ParcelItem = new mongoose.Schema({
  // General
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["document", "item"],
    required: true,
  },

  // Document
  description: {
    type: String,
    required: function () {
      return this.type === "document";
    },
  },

  // Item
  category: {
    type: String,
    enum: ["clothing", "electronics", "food", "other"],
    required: function () {
      return this.type === "item";
    },
  },
  subCategory: {
    type: String,
    required: function () {
      return this.type === "item";
    },
  },
  hsCode: {
    type: String,
    required: function () {
      return this.type === "item";
    },
  },
  value: {
    type: Number,
    required: function () {
      return this.type === "item";
    },
  },
});
const deliverySchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      default: generateTrackingID,
    },
    deliveryType: {
      type: String,
      enum: ["regular-items", "food-items"],
      required: true,
    },

    // Sender's information
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    aptUnit: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    // Receiver's information
    toFirstName: {
      type: String,
      required: true,
    },
    toLastName: {
      type: String,
      required: true,
    },
    toStreet: {
      type: String,
      required: true,
    },
    toAptUnit: {
      type: String,
    },
    toCountry: {
      type: String,
      required: true,
    },
    toState: {
      type: String,
      required: true,
    },
    toCity: {
      type: String,
      required: true,
    },
    toPostCode: {
      type: String,
      required: true,
    },
    toEmail: {
      type: String,
      required: true,
    },
    toPhoneNumber: {
      type: String,
      required: true,
    },

    // Parcel information
    packagingType: {
      type: String,
      enum: ["box", "bag", "envelope", "other"],
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "NGN", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY"],
      required: true,
    },
    proofOfPurchaseImage: {
      type: String,
      // required: true,
    },
    packageImage: {
      type: String,
      // required: true,
    },
    parcelItems: {
      type: [ParcelItem],
      required: true,
    },

    // Delivery information
    courier: {
      type: String,
      enum: ["dhl", "ups", "fedex", "usps", "aramex", "anka", "other"],
      required: true,
    },

    // Delivery statuses
    status: {
      type: String,
      enum: ["unconfirmed", "completed", "ongoing", "cancelled"],
      default: "unconfirmed",
    },
    deliveryStatus: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "picked-up",
        "in-transit",
        "dropped-off",
        "cancelled",
      ],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;

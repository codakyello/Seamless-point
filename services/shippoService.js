const shippo = require("../config/shippoConfig");

async function getShippingRates(sender, receiver, parcels) {
  try {
    const res = await fetch(`https://api.goshippo.com/shipments/`, {
      method: "POST",
      headers: {
        Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address_from: sender,
        address_to: receiver,
        parcels,
        async: false,
      }),
    });

    const shipment = await res.json();

    if (!shipment.rates || shipment.rates.length === 0) {
      throw new Error("No shipping rates available.");
    }

    const grouped = {};

    shipment.rates.forEach((rate) => {
      if (!grouped[rate.provider]) {
        grouped[rate.provider] = [];
      }

      grouped[rate.provider].push({
        service: rate.servicelevel.name,
        amount: rate.amount,
        currency: rate.currency,
        estimated_days: rate.estimated_days,
      });
    });

    // Convert grouped object into an array for easier use in UI
    const result = Object.entries(grouped).map(([provider, services]) => ({
      provider,
      services,
    }));

    return result;
  } catch (error) {
    console.error("Error fetching grouped shipping rates:", error);
    throw new Error(error.message);
  }
}

async function purchaseLabel(rateId) {
  try {
    const transaction = await shippo.transaction.create({
      rate: rateId,
      label_file_type: "PDF",
    });

    return {
      tracking_number: transaction.tracking_number,
      tracking_url: transaction.tracking_url_provider,
      label_url: transaction.label_url,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getShippingRates, purchaseLabel };

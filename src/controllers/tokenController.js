const tokenService = require("../utils/tokenService");

const tokenCheck = async (req, res) => {
  try {
    const wallet = req.query.wallet ?? "Wallet address not provided";

    const chain = req.query.chain || "Chain not specified";

    if (!wallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet address required",
      });
    }
    console.log("step 1");
    const tokenInfo = await tokenService.getTokenInfo(chain);
    console.log("step 2");
    const walletBalance = await tokenService.getWalletBalance(chain, wallet);
    console.log("step 3");
    const owner = await tokenService.getOwner(chain);

    console.log(tokenInfo);

    console.log(walletBalance);

    console.log(owner);
    console.log("step 4");
    return res.json({
      success: true,
      tokenInfo,
      walletBalance,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  tokenCheck,
};

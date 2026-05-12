const { ethers } = require("ethers");

const abi = require("../contract/abi.json");

const {
    EthMainnet,
    PolygonMainnet,
    BscMainnet,
    ArbitrumMainnet,
    Avalanche,
    Fantom,
    Harmony,
    Heco,
    Klay,
    Matic,
    Moonbeam,
    Optimism,
    Palm,
    Ronin,
    xDai
} = require("../config/constant");


// Add contract addresses per chain
const CONTRACTS = {

    ethereum: {
        rpc: EthMainnet,
        contract:
            "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"
    },

    polygon: {
        rpc: PolygonMainnet,
        contract:
            "0xab594600376ec9fd91f8e885dadf0ce036862de0"
    },

    bsc: {
        rpc: BscMainnet,
        contract:
            "0x0567f2323251f0aab15c8dfb1967e4e8a7d42aee"
    },
};


const getProvider = (chain) => {

    const chainData =
        CONTRACTS[chain];

    if (!chainData) {

        throw new Error(
            "Unsupported chain"
        );
    }

    return new ethers.JsonRpcProvider(
        chainData.rpc
    );
};


const getContract = (chain) => {

    const chainData =
        CONTRACTS[chain];

    if (!chainData) {

        throw new Error(
            "Unsupported chain"
        );
    }

    const provider =
        getProvider(chain);

    return new ethers.Contract(
        chainData.contract,
        abi,
        provider
    );
};


const getTokenInfo =
async (chain) => {

    const contract =
        getContract(chain);

    const data =
        await contract.latestRoundData();

    return {

        contract:
            CONTRACTS[chain].contract,

        network:
            `${chain}-mainnet`,

        roundId:
            data.roundId.toString(),

        answer:
            data.answer.toString(),

        startedAt:
            Number(data.startedAt),

        updatedAt:
            Number(data.updatedAt),

        answeredInRound:
            data.answeredInRound.toString()
    };
};


const getWalletBalance =
async (chain, wallet) => {

    const contract =
        getContract(chain);

    const balance =
        await contract.balanceOf(wallet);

    const decimals =
        await contract.decimals();

    return ethers.formatUnits(
        balance,
        decimals
    );
};


const getOwner =
async (chain) => {

    try {

        const contract =
            getContract(chain);

        return await contract.owner();

    } catch {

        return "Owner function not available";
    }
};


module.exports = {
    getTokenInfo,
    getWalletBalance,
    getOwner
};
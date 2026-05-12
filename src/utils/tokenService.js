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
            "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    },

    polygon: {
        rpc: PolygonMainnet,
        contract:
            "0xc2132D05D31c914A87C6611C10748AEb04B58e8F"
    },

    bsc: {
        rpc: BscMainnet,
        contract:
            "0x55d398326f99059fF775485246999027B3197955"
    },

    arbitrum: {
        rpc: ArbitrumMainnet,
        contract:
            "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
    },

    avalanche: {
        rpc: Avalanche,
        contract:
            "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7"
    }
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

    const name =
        await contract.name();

    const symbol =
        await contract.symbol();

    const decimals =
        await contract.decimals();

    return {
        chain,
        name,
        symbol,
        decimals:
            Number(decimals)
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
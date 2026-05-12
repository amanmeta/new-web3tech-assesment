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
} = require("./constant");


// Replace with deployed contract address
const CONTRACT_ADDRESS = "0xYourContractAddress";


const fetchContractData = async (rpcUrl, chainName) => {

    try {

        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            abi,
            provider
        );

        const value = await contract.getValue();

        console.log(`${chainName} Contract Value:`, value.toString());

        return {
            chain: chainName,
            value: value.toString()
        };

    } catch (error) {

        console.error(`${chainName} Error:`, error.message);

        return {
            chain: chainName,
            error: error.message
        };
    }
};


const callEthContract = async () =>
    fetchContractData(EthMainnet, "Ethereum");

const callPolygonContract = async () =>
    fetchContractData(PolygonMainnet, "Polygon");

const callBscContract = async () =>
    fetchContractData(BscMainnet, "BSC");

const callArbitrumContract = async () =>
    fetchContractData(ArbitrumMainnet, "Arbitrum");

const callAvalancheContract = async () =>
    fetchContractData(Avalanche, "Avalanche");

const callFantomContract = async () =>
    fetchContractData(Fantom, "Fantom");

const callHarmonyContract = async () =>
    fetchContractData(Harmony, "Harmony");

const callHecoContract = async () =>
    fetchContractData(Heco, "Heco");

const callKlayContract = async () =>
    fetchContractData(Klay, "Klay");

const callMaticContract = async () =>
    fetchContractData(Matic, "Matic");

const callMoonbeamContract = async () =>
    fetchContractData(Moonbeam, "Moonbeam");

const callOptimismContract = async () =>
    fetchContractData(Optimism, "Optimism");

const callPalmContract = async () =>
    fetchContractData(Palm, "Palm");

const callRoninContract = async () =>
    fetchContractData(Ronin, "Ronin");

const callXDaiContract = async () =>
    fetchContractData(xDai, "xDai");


module.exports = {
    callEthContract,
    callPolygonContract,
    callBscContract,
    callArbitrumContract,
    callAvalancheContract,
    callFantomContract,
    callHarmonyContract,
    callHecoContract,
    callKlayContract,
    callMaticContract,
    callMoonbeamContract,
    callOptimismContract,
    callPalmContract,
    callRoninContract,
    callXDaiContract
};
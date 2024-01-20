// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol" as OZIERC721;

/**
 * Example contract using CCIPReceiver for cross-chain NFT minting.
 * Note: This is for demonstration and not audited for production use.
 */
contract DestinationMinter is CCIPReceiver {
    // Event declaration with an address parameter
    event MintCallSuccessful(address indexed nftAddress);

    // Correctly checksummed address
    address private router = 0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165;

    /**
     * @dev Constructor for DestinationMinter.
     */
    constructor() CCIPReceiver(router) {}

    /**
     * @dev Overridden function to handle incoming CCIP messages.
     * @param message The message containing data for NFT minting.
     */
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        // Decode the message to extract the NFT address and the minting data
        (address nftAddress, bytes memory mintData) = abi.decode(message.data, (address, bytes));
        OZIERC721.IERC721 nft = OZIERC721.IERC721(nftAddress);

        // Call the mint function of the NFT contract
        (bool success, ) = address(nft).call(mintData);
        require(success, "NFT minting failed");

        emit MintCallSuccessful(nftAddress);
    }
}

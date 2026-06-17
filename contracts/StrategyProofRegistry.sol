// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title StrategyProofRegistry
/// @notice Minimal registry for anchoring SignalPilot strategy spec hashes on BNB Chain.
/// @dev Proof registry only. This contract does not execute trades, mint NFTs, or custody assets.
contract StrategyProofRegistry {
    struct StrategyRecord {
        address creator;
        bytes32 strategyHash;
        string market;
        string metadataURI;
        uint256 timestamp;
    }

    event StrategyRecorded(
        uint256 indexed id,
        address indexed creator,
        bytes32 indexed strategyHash,
        string market,
        string metadataURI,
        uint256 timestamp
    );

    StrategyRecord[] private strategies;
    mapping(address => uint256[]) private userStrategies;

    function recordStrategy(bytes32 strategyHash, string calldata market, string calldata metadataURI)
        external
        returns (uint256 id)
    {
        require(strategyHash != bytes32(0), "invalid hash");
        require(bytes(market).length > 0, "market required");

        id = strategies.length;
        strategies.push(
            StrategyRecord({
                creator: msg.sender,
                strategyHash: strategyHash,
                market: market,
                metadataURI: metadataURI,
                timestamp: block.timestamp
            })
        );
        userStrategies[msg.sender].push(id);

        emit StrategyRecorded(id, msg.sender, strategyHash, market, metadataURI, block.timestamp);
    }

    function getStrategy(uint256 id) external view returns (StrategyRecord memory) {
        require(id < strategies.length, "strategy not found");
        return strategies[id];
    }

    function getUserStrategies(address user) external view returns (uint256[] memory) {
        return userStrategies[user];
    }
}

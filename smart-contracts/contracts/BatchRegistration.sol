// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TransactionUpdate.sol";

contract BatchRegistration {
    address public owner;
    uint256 public batchCount;
    uint256 public productCode;
    mapping(uint256 => Batch) public batches;
    struct Batch {
        string materialBatchNumber;
        uint256 batchCode;
        string rawMaterials;
        uint256 batchCount;
        address batchManager;
        uint256 timestamp;
        address tucAddress;
    }

    event BatchAdded(
        uint256 batchNumber,
        uint256 batchCode,
        string rawMaterials,
        string materialBatchNumber,
        address sender,
        uint256 timestamp,
        address tucAddr
    );
    Batch[] public batchArray;

    constructor(uint256 _productCode) {
        owner = msg.sender;
        productCode = _productCode;
        batchCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addBatch(string memory materialBatchNumber, uint256 batchCode,string memory rawMaterials)
        public
        onlyAuthorized
    {
        batchCount++;
        Batch storage newBatch = batches[batchCode];
        batches[batchCount] = Batch(
            materialBatchNumber,
            batchCode,
            rawMaterials,
            batchCount,
            msg.sender,
            block.timestamp,
            address(0)
        ); // Initialize tucAddress to 0x0
        TransactionUpdate newTUC = new TransactionUpdate(materialBatchNumber);
        batches[batchCount].tucAddress = address(newTUC);
        batchArray.push(newBatch);
        emit BatchAdded(
            batchCount,
            batchCode,
            rawMaterials,
            materialBatchNumber,
            msg.sender,
            block.timestamp,
            address(newTUC)
        );
    }

    function getAllBatchAddresses() public view returns (Batch[] memory) {
        return batchArray;
    }
}

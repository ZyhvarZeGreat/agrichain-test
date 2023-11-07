// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TransactionUpdate.sol";

contract BatchRegistration {
    address public owner;
    uint public batchCount;
    uint public productCode;
    mapping(uint => Batch) public batches;

    struct Batch {
        string materialBatchNumber;
        address batchManager;
        uint timestamp;
        address tucAddress;
    }

    event BatchAdded(
        uint batchNumber,
        string materialBatchNumber,
        address sender,
        uint timestamp,
        address tucAddr
    );

    constructor(uint _productCode) {
        owner = msg.sender;
        productCode = _productCode;
        batchCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addBatch(string memory materialBatchNumber) public onlyAuthorized {
        batchCount++;
        batches[batchCount] = Batch(
            materialBatchNumber,
            msg.sender,
            block.timestamp,
            address(0)
        ); // Initialize tucAddress to 0x0
        TransactionUpdate newTUC = new TransactionUpdate(materialBatchNumber);
        batches[batchCount].tucAddress = address(newTUC);

        emit BatchAdded(
            batchCount,
            materialBatchNumber,
            msg.sender,
            block.timestamp,
            address(newTUC)
        );
    }
}

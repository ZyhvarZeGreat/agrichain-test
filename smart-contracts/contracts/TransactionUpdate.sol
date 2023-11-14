// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionUpdate {
    address public owner;
    uint256 batchCode;
    uint public transactionCount;
    mapping(bytes32 => bool) transactions;
    mapping(bytes32 => address) batchTransfers;
    mapping(address => address[]) transfersByUser;
    mapping(bytes32 => Transaction) public transactionData;

    struct Transaction {
        address sender;
        address receiver;
        uint timestamp;
        bytes32 previousTr;
    }

    event TransactionAdded(
        address sender,
        address receiver,
        uint timestamp,
        bytes32 previousTr,
        bytes32 currentTr
    );
    event CustodyTransferred(address newCustodian, bytes32 transactionHash);
    event BatchTransferred(bytes32 transactionHash, address currentCustodian);

    constructor(uint256 _batchCode) {
        owner = msg.sender;
        batchCode = _batchCode;
        transactionCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addTransaction(
        address receiver,
        bytes32 productCode,
        bytes32 batchNumber,
        bytes32 previousTr
    ) public onlyAuthorized {
        bytes32 transactionHash = keccak256(
            abi.encodePacked(
                msg.sender,
                receiver,
                block.timestamp,
                productCode,
                batchNumber,
                previousTr
            )
        );

        // Check if the product is transferred for the first time or not
        if (!transactions[previousTr]) {
            // If it's the first transfer, check that the product code and batch number are valid
            require(productCode != bytes32(0), "Invalid product code");
            require(batchNumber != bytes32(0), "Invalid batch number");
        } else {
            // If not the first transfer, reference the hash of the previous transaction
            require(transactions[previousTr], "Previous transaction does not exist");
        }

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = receiver;
        transfersByUser[msg.sender].push(receiver);

        // Add the transaction data to the list
        transactionData[transactionHash] = Transaction({
            sender: msg.sender,
            receiver: receiver,
            timestamp: block.timestamp,
            previousTr: previousTr
        });

        emit TransactionAdded(
            msg.sender,
            receiver,
            block.timestamp,
            previousTr,
            transactionHash
        );
    }

    function transferCustody(
        address newCustodian,
        uint256 _batchCode
    ) public onlyAuthorized {
        bytes32 transactionHash = generateTransactionHash(batchCode);

        require(!transactions[transactionHash], "Transaction already added");
        require(
            transactions[transactionData[generateTransactionHash(_batchCode)].previousTr],
            "Previous transaction does not exist"
        );

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = newCustodian;
        transfersByUser[msg.sender].push(newCustodian);

        emit CustodyTransferred(newCustodian, transactionHash);
        emit BatchTransferred(transactionHash, newCustodian);
    }

    function transferCustody(
        address newCustodian,
        bytes32 transactionHash
    ) public onlyAuthorized {
        require(!transactions[transactionHash], "Transaction already added");
        require(
            transactions[transactionData[transactionHash].previousTr],
            "Previous transaction does not exist"
        );

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = newCustodian;
        transfersByUser[msg.sender].push(newCustodian);

        emit CustodyTransferred(newCustodian, transactionHash);
        emit BatchTransferred(transactionHash, newCustodian);
    }

    // Helper function to generate transaction hash from batch code
    function generateTransactionHash(uint256 _batchCode) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_batchCode));
    }

    // ... (existing code)
}

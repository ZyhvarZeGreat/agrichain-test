// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionUpdate {
    address public owner;
    string public materialBatchNumber;
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

    constructor(string memory _materialBatchNumber) {
        owner = msg.sender;
        materialBatchNumber = _materialBatchNumber;
        transactionCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addTransaction(
        address receiver,
        bytes32 previousTr,
        bytes32 currentTr
    ) public onlyAuthorized {
        bytes32 transactionHash = keccak256(
            abi.encodePacked(
                msg.sender,
                receiver,
                block.timestamp,
                previousTr,
                currentTr
            )
        );

        require(!transactions[transactionHash], "Transaction already added");
        require(
            transactions[previousTr],
            "Previous transaction does not exist"
        );

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = receiver;
        transfersByUser[msg.sender].push(receiver);

        emit TransactionAdded(
            msg.sender,
            receiver,
            block.timestamp,
            previousTr,
            currentTr
        );
    }

    function transferCustody(
        address newCustodian,
        bytes32 previousTr
    ) public onlyAuthorized {
        bytes32 transactionHash = keccak256(
            abi.encodePacked(
                msg.sender,
                newCustodian,
                block.timestamp,
                previousTr
            )
        );

        require(!transactions[transactionHash], "Transaction already added");
        require(
            transactions[previousTr],
            "Previous transaction does not exist"
        );

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = newCustodian;
        transfersByUser[msg.sender].push(newCustodian);

        emit CustodyTransferred(newCustodian, transactionHash);
        emit BatchTransferred(transactionHash, newCustodian);
    }

    function getBatchCustodian(
        bytes32 transactionHash
    ) public view returns (address) {
        return batchTransfers[transactionHash];
    }

    function getUserTransfers(
        address user
    ) public view returns (address[] memory) {
        return transfersByUser[user];
    }

    function getTransactionData(
        bytes32 transactionHash
    )
        public
        view
        returns (
            address sender,
            address receiver,
            uint timestamp,
            bytes32 previousTr
        )
    {
        require(transactions[transactionHash], "Transaction does not exist");
        Transaction storage transaction = transactionData[transactionHash];
        return (
            transaction.sender,
            transaction.receiver,
            transaction.timestamp,
            transaction.previousTr
        );
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistration {
    address public owner;
    uint public productCount;
    mapping(uint => bool) productExists;

    struct Product {
        string productName;
        address owner;
        string rawMaterials;
        uint timestamp;
        address bacAddress;
    }

    mapping(uint => Product) public products;

    event ProductRegistered(uint productCode, string productName, address sender, string rawMaterials, uint timestamp, address bacAddr);

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function register(uint productCode, string memory productName, string memory rawMaterials, address bacAddr) public onlyAuthorized {
        require(!productExists[productCode], "Product already registered");

        products[productCode] = Product(productName, msg.sender, rawMaterials, block.timestamp, bacAddr);
        productExists[productCode] = true;
        productCount++;

        emit ProductRegistered(productCode, productName, msg.sender, rawMaterials, block.timestamp, bacAddr);
    }

    function getProductData(uint productCode) public view returns (string memory productName, address sender, string memory rawMaterials, uint timestamp, address bacAddr) {
        require(productExists[productCode], "Product does not exist");
        Product storage product = products[productCode];
        return (product.productName, product.owner, product.rawMaterials, product.timestamp, product.bacAddress);
    }
}

contract BatchRegistration {
    address public owner;
    uint public batchCount;
    mapping(uint => bool) batchExists;

    struct Batch {
        string materialBatchNumber;
        address owner;
        uint timestamp;
        address tucAddress;
    }

    mapping(uint => Batch) public batches;

    event BatchAdded(uint batchNumber, string materialBatchNumber, address sender, uint timestamp, address tucAddr);

    constructor() {
        owner = msg.sender;
        batchCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addBatch(uint batchNumber, string memory materialBatchNumber, address tucAddr) public onlyAuthorized {
        require(!batchExists[batchNumber], "Batch already added");

        batches[batchNumber] = Batch(materialBatchNumber, msg.sender, block.timestamp, tucAddr);
        batchExists[batchNumber] = true;
        batchCount++;

        emit BatchAdded(batchNumber, materialBatchNumber, msg.sender, block.timestamp, tucAddr);
    }

    function getBatchData(uint batchNumber) public view returns (string memory materialBatchNumber, address sender, uint timestamp, address tucAddr) {
        require(batchExists[batchNumber], "Batch does not exist");
        Batch storage batch = batches[batchNumber];
        return (batch.materialBatchNumber, batch.owner, batch.timestamp, batch.tucAddress);
    }
}

contract TransactionRegistration {
    address public owner;
    uint public trCount;
    mapping(bytes32 => bool) transactions;

    struct Transaction {
        address sender;
        address receiver;
        uint timestamp;
        bytes32 previousTr;
    }

    mapping(bytes32 => Transaction) public transactionData;

    event TransactionAdded(address sender, address receiver, uint timestamp, bytes32 previousTr, bytes32 currentTr);

    constructor() {
        owner = msg.sender;
        trCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addTransaction(address receiver, bytes32 previousTr, bytes32 currentTr) public onlyAuthorized {
        bytes32 transactionHash = keccak256(abi.encodePacked(msg.sender, receiver, block.timestamp, previousTr, currentTr));

        require(!transactions[transactionHash], "Transaction already added");

        transactionData[transactionHash] = Transaction(msg.sender, receiver, block.timestamp, previousTr);
        transactions[transactionHash] = true;
        trCount++;

        emit TransactionAdded(msg.sender, receiver, block.timestamp, previousTr, currentTr);
    }

    function getTransactionData(bytes32 transactionHash) public view returns (address sender, address receiver, uint timestamp, bytes32 previousTr) {
        require(transactions[transactionHash], "Transaction does not exist");
        Transaction storage transaction = transactionData[transactionHash];
        return (transaction.sender, transaction.receiver, transaction.timestamp, transaction.previousTr);
    }
}

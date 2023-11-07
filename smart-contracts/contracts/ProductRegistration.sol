// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import './BatchRegistration.sol';

contract ProductRegistration {
    address public owner;
    uint public productCount;
    mapping(uint => Product) public products;
    
    struct Product {
        uint productCode;
        string productName;
        address owner;
        string rawMaterials;
        address bacAddress;
    }

    // Define an array to store product details
    Product[] public productArray;

    event ProductRegistered(uint productCode, string productName, address sender, string rawMaterials, address bacAddr);

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function register(uint productCode, string memory productName, string memory rawMaterials) public onlyAuthorized {
        productCount++;
        Product storage newProduct = products[productCode];
        newProduct.productCode = productCode;
        newProduct.productName = productName;
        newProduct.owner = msg.sender;
        newProduct.rawMaterials = rawMaterials;

        // Deploy a new BAC contract and store its address
        BatchRegistration newBAC = new BatchRegistration(productCode);
        newProduct.bacAddress = address(newBAC);

        // Add the product to the array
        productArray.push(newProduct);

        emit ProductRegistered(productCode, productName, msg.sender, rawMaterials, address(newBAC));
    }

    // Function to get all product data from the array
    function getAllProductData() public view returns (Product[] memory) {
           return productArray;
    }
}

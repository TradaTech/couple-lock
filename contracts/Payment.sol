pragma solidity ^0.4.24;

contract Payment {

    address transferFrom;
    address transferTo;
    uint paymentAmount;

    constructor() public {
        transferFrom = msg.sender;
    }

    event TransferFund( address _transferTo, address _transferFrom,uint amount);

    function tranferFund(address _transferTo) public payable returns (bool){
        transferTo = _transferTo;
        transferTo.transfer(msg.value);

        emit TransferFund(transferTo , transferFrom, msg.value);

        return true;
    }

    function getBalanceOfCurrentAccount() public returns (uint){
        return transferFrom.balance;
    }

}
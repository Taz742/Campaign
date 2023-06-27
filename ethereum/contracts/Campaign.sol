// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint _minimumContribution) public {
    address newCampaign = address(
      new Campaign(_minimumContribution, msg.sender)
    );
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[] memory) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount;
  }

  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  Request[] public requests;
  mapping(uint => mapping(address => bool)) approvals;
  uint public approversCount;

  constructor(uint _minimumContribution, address creator) {
    manager = creator;
    minimumContribution = _minimumContribution;
  }

  modifier mustBeManager() {
    require(
      msg.sender == manager,
      'Only the manager can access to this function'
    );
    _;
  }

  function contribute() public payable {
    require(
      msg.value > minimumContribution,
      'The value you provided is less than minimum contribution'
    );

    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(
    string memory _description,
    uint _value,
    address _recipient
  ) public mustBeManager {
    Request memory newRequest = Request({
      description: _description,
      value: _value,
      recipient: payable(_recipient),
      complete: false,
      approvalCount: 0
    });

    requests.push(newRequest);
  }

  function approveRequest(uint index) public {
    require(approvers[msg.sender], 'Caller is not a approver');
    require(
      !approvals[index][msg.sender],
      'Caller has already approved this request'
    );

    requests[index].approvalCount++;
    approvals[index][msg.sender] = true;
  }

  function finalizeRequest(uint index) public mustBeManager {
    Request storage request = requests[index];

    require(!request.complete, 'Request is already completed');
    require(request.approvalCount > (approversCount / 2));

    request.recipient.transfer(request.value);
    request.complete = true;
  }

  function getSummary() public view returns (uint, uint, uint, uint, address) {
    return (
      minimumContribution,
      address(this).balance,
      requests.length,
      approversCount,
      manager
    );
  }

  function getRequestsCount() public view returns (uint) {
    return requests.length;
  }

  function getContractBalance() public view mustBeManager returns (uint) {
    return address(this).balance;
  }
}

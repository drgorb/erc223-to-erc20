pragma solidity 0.6.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title Contract that will work with ERC223 tokens.
 */
abstract contract ERC223ReceivingContract {
    /**
     * @dev Standard ERC223 function that will handle incoming token transfers.
     *
     * @param src  Token sender address.
     * @param wad  Amount of tokens.
     * @param _data  Transaction metadata.
     */
    function tokenFallback(address src, uint wad, bytes memory _data) public virtual;
}

contract Erc223 is ERC20 {

    constructor (string memory name, string memory symbol) public ERC20(name, symbol){}

    function _transfer(address sender, address recipient, uint256 amount) override internal virtual {
        ERC20._transfer(sender, recipient, amount);
        uint256 codeLength;
        /* solium-disable-next-line */
        assembly {
        // Retrieve the size of the code on target address, this needs assembly .
            codeLength := extcodesize(recipient)
        }
        if (codeLength > 0) {
            ERC223ReceivingContract receiver = ERC223ReceivingContract(recipient);
            bytes memory empty;
            receiver.tokenFallback(msg.sender, amount, empty);
        }
    }

    function mint(address recipient, uint256 amount) public {
        _mint(recipient, amount);
    }
}
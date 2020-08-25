pragma solidity 0.6.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Erc223Wrapper is ERC20 {
    ERC20 public wrapped;

    constructor (string memory name, string memory symbol, address wrap) public ERC20(name, symbol){
        wrapped = ERC20(wrap);
    }

    function tokenFallback(address src, uint wad, bytes memory _data) public {
        require(msg.sender == address(wrapped), "only the wrapped tokens can be sent");
        _mint(src, wad);
    }

    function _transfer(address sender, address recipient, uint256 amount) override internal virtual {
        if (recipient == sender) {
            _burn(recipient, amount);
            // we want to avoid that the tokens be burned while the transfer fails
            require(wrapped.transfer(recipient, amount), "revert if the token transfer fails");
        } else {
            ERC20._transfer(sender, recipient, amount);
        }
    }
}
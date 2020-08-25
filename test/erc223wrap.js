const Erc223Wrapper = artifacts.require('Erc223Wrapper')
const Erc223 = artifacts.require('Erc223')
const assert = require("chai").assert
const truffleAssert = require('truffle-assertions')
const BigNumber = require('bignumber.js')

contract('Erc223Wrapper', function (accounts) {
  const toBN = (num) => new BigNumber(num)
  let wrapper
  let erc223

  before(async () => {
    erc223 = await Erc223.new('test token', 'TST')
    // mint 100 tokens
    await erc223.mint(accounts[0], '100000000000000000000')
    wrapper = await Erc223Wrapper.new('wrapped test token', 'TSTW', erc223.address)
  })

  it('increases the balance of the sender upon receiving the wrapped token', async () => {
    assert.equal((await wrapper.totalSupply()).toString(), '0')
    await erc223.transfer(wrapper.address, '1000000000000000000')
    assert.equal((await erc223.balanceOf(wrapper.address)).toString(), '1000000000000000000')
    assert.equal((await wrapper.totalSupply()).toString(), '1000000000000000000')
  })

  it('allows to send the wrapped token to another address', async () => {
    await wrapper.transfer(accounts[1], '100000000000000000')
    await wrapper.transfer(accounts[2], '100000000000000000')
    assert.equal((await wrapper.balanceOf(accounts[1])).toString(), '100000000000000000')
    assert.equal((await wrapper.balanceOf(accounts[2])).toString(), '100000000000000000')
    assert.equal((await wrapper.totalSupply()).toString(), '1000000000000000000')
  })

  it('allows to send the wrapped token back to erc223', async () => {
    await wrapper.transfer(accounts[1], '50000000000000000', {from: accounts[1]})
    assert.equal((await erc223.balanceOf(accounts[1])).toString(), '50000000000000000')
    assert.equal((await wrapper.balanceOf(accounts[1])).toString(), '50000000000000000')
    assert.equal((await wrapper.totalSupply()).toString(), toBN('1000000000000000000').minus('50000000000000000').toString())
  })

  it('the balance does not change when the transaction is reverted', async () => {
    try {
      await wrapper.transfer(accounts[1], '50000000000000000', {from: accounts[1], gas: '50000'})
      assert.fail('an exception should be thrown')
    } catch (e) {
      assert.equal(e.message, 'Returned error: VM Exception while processing transaction: revert')
    }
    assert.equal((await erc223.balanceOf(accounts[1])).toString(), '50000000000000000')
    assert.equal((await wrapper.balanceOf(accounts[1])).toString(), '50000000000000000')
    assert.equal((await wrapper.totalSupply()).toString(), toBN('1000000000000000000').minus('50000000000000000').toString())
  })

  it('allows to send the wrapped token back to erc223 on behalf of someone', async () => {
    await wrapper.approve(accounts[1], '50000000000000000', {from: accounts[2]})
    assert.equal((await wrapper.allowance(accounts[2], accounts[1])).toString(), '50000000000000000')
    await wrapper.transferFrom(accounts[2], accounts[2], '50000000000000000', {from: accounts[1]})
    assert.equal((await erc223.balanceOf(accounts[2])).toString(), '50000000000000000')
    assert.equal((await wrapper.balanceOf(accounts[2])).toString(), '50000000000000000')
    assert.equal((await wrapper.totalSupply()).toString(), toBN('1000000000000000000').minus('100000000000000000').toString())
  })

})
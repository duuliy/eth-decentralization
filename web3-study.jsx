import { useEffect } from 'react'
const Web3 = require('web3')

const EthTest = () => {

  // web3.setProvider('ws://localhost:8546')
  // or
  // web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'))

  //我的节点的所有账户
  const getAccounts = (web3)=>{
    const accounts = web3.eth.accounts
    console.log(accounts)
  }

  //编译合约
  const compileSolidity = (web3)=>{
    const source = "pragma solidity ^0.4.0;contract Calc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() returns (uint){    return count;  }}";
    // const calc = web3.eth.compile.solidity(source)  //换一种方法变异
    console.log(web3.eth.compile)
  }

  // 发布合约
  const releaseSolidity = (web3) => {
    let calcContract = web3.eth.contract(abiArray) //一到多个描述合约的函数，事件的ABI对象

    let myContractReturned = calcContract.new({
      data: '', //编译后的合约
      from: '' //编译后的合约
    }, function (err, myContract) {
      if (!err) {
        // 注意：这个回调会触发两次
        //一次是合约的交易哈希属性完成
        //另一次是在某个地址上完成部署

        // 通过判断是否有地址，来确认是第一次调用，还是第二次调用。
        if (!myContract.address) {
          console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值

          // 合约发布成功
        } else {
        }
      }
      })
  }

  // 调用合约
  const callSolidity=web3=>{
    // compiled solidity source code using https://chriseth.github.io/cpp-ethereum/
    var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3"
    web3.eth.sendTransaction({ data: code }, function (err, address) {
      if (!err)
        console.log(address); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    });

  }

  useEffect(()=>{
    let web3 = new Web3('ws://localhost:8888') //通过RPC 调用与本地节点通信
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   // set the provider you want from Web3.providers
    //   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8888"))
    // }
    console.log(web3.eth)
    getAccounts(web3)
    compileSolidity(web3)

  },[])

  return (
    123
  )
}


export default EthTest
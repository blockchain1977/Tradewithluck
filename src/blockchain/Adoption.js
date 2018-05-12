// import TruffleContract from 'truffle-contract';

// import contractData from './adoption.json';
import '../../global';

export default class Adoption {
  constructor() {
    // const contract = require('truffle-contract');
    this.contract = new global.web3.eth.contract(`[
        {
          constant: true,
          inputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          name: 'adopters',
          outputs: [
            {
              name: '',
              type: 'address'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        },
        {
          constant: false,
          inputs: [
            {
              name: 'petId',
              type: 'uint256'
            }
          ],
          name: 'adopt',
          outputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'getAdopters',
          outputs: [
            {
              name: '',
              type: 'address[16]'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]`);
    // this.contract = contract({
    //   contractName: 'Adoption',
    //   abi: [
    //     {
    //       constant: true,
    //       inputs: [
    //         {
    //           name: '',
    //           type: 'uint256'
    //         }
    //       ],
    //       name: 'adopters',
    //       outputs: [
    //         {
    //           name: '',
    //           type: 'address'
    //         }
    //       ],
    //       payable: false,
    //       stateMutability: 'view',
    //       type: 'function'
    //     },
    //     {
    //       constant: false,
    //       inputs: [
    //         {
    //           name: 'petId',
    //           type: 'uint256'
    //         }
    //       ],
    //       name: 'adopt',
    //       outputs: [
    //         {
    //           name: '',
    //           type: 'uint256'
    //         }
    //       ],
    //       payable: false,
    //       stateMutability: 'nonpayable',
    //       type: 'function'
    //     },
    //     {
    //       constant: true,
    //       inputs: [],
    //       name: 'getAdopters',
    //       outputs: [
    //         {
    //           name: '',
    //           type: 'address[16]'
    //         }
    //       ],
    //       payable: false,
    //       stateMutability: 'view',
    //       type: 'function'
    //     }
    //   ],
    //   bytecode:
    //     '0x6060604052341561000f57600080fd5b6102dd8061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633de4eb171461005c57806343ae80d3146100ad5780638588b2c514610110575b600080fd5b341561006757600080fd5b61006f610147565b6040518082601060200280838360005b8381101561009a57808201518184015260208101905061007f565b5050505090500191505060405180910390f35b34156100b857600080fd5b6100ce60048080359060200190919050506101c8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011b57600080fd5b61013160048080359060200190919050506101fd565b6040518082815260200191505060405180910390f35b61014f610272565b60006010806020026040519081016040528092919082601080156101be576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610174575b5050505050905090565b6000816010811015156101d757fe5b016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008082101580156102105750600f8211155b151561021b57600080fd5b3360008360108110151561022b57fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550819050919050565b610200604051908101604052806010905b600073ffffffffffffffffffffffffffffffffffffffff1681526020019060019003908161028357905050905600a165627a7a723058203b146a4b7bfbe6637192f29928fbe4e79376e314930136bbc758bec25eb94f270029',
    //   deployedBytecode:
    //     '0x606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633de4eb171461005c57806343ae80d3146100ad5780638588b2c514610110575b600080fd5b341561006757600080fd5b61006f610147565b6040518082601060200280838360005b8381101561009a57808201518184015260208101905061007f565b5050505090500191505060405180910390f35b34156100b857600080fd5b6100ce60048080359060200190919050506101c8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011b57600080fd5b61013160048080359060200190919050506101fd565b6040518082815260200191505060405180910390f35b61014f610272565b60006010806020026040519081016040528092919082601080156101be576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610174575b5050505050905090565b6000816010811015156101d757fe5b016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008082101580156102105750600f8211155b151561021b57600080fd5b3360008360108110151561022b57fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550819050919050565b610200604051908101604052806010905b600073ffffffffffffffffffffffffffffffffffffffff1681526020019060019003908161028357905050905600a165627a7a723058203b146a4b7bfbe6637192f29928fbe4e79376e314930136bbc758bec25eb94f270029'
    // });
    // this.contract = TruffleContract(contractData);
    // this.contract.Adoption.setProvider(global.web3Provider);
  }

  // Need use below method to retrive the adopt status and set state of Adopt button

  //   markAdopted(adopters, account) {
  // let adoptionInstance;

  // this.contracts.Adoption.deployed()
  //   .then(instance => {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   })
  //   .then(adopters => {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet')
  //           .eq(i)
  //           .find('button')
  //           .text('Success')
  //           .attr('disabled', true);
  //       }
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  //   }

  handleAdopt(pet) {
    const petId = parseInt(pet.id, 10);

    let adoptionInstance;

    // will set to actual account after wallet function implimented
    const account = '0xb7863a205a04b83b59d9eb59d1c2342f11eb0930';

    return Promise.resolve(
      this.contracts.Adoption.deployed()
        .then(instance => {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, { from: account });
        })
        .then(result => {
          console.log(result);
          return true;
        })
        .catch(err => {
          console.log(err.message);
          return false;
        })
    );
  }
}

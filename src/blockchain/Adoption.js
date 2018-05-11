import TruffleContract from 'truffle-contract'; 

import contractData from './adoption.json'; 
import '../../global'; 

export default class Adoption {
  constructor() {
    this.contract = TruffleContract(contractData); 
    this.contract.Adoption.setProvider(global.web3.web3Provider); 
  }

    checkallAdoptedStatus() {
  let adoptionInstance;

  return Promise.resolve(
  this.contracts.Adoption.deployed()
    .then(instance => {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    })
    .then(adopters => {
      const adoptionIndexs = [];
      for (let i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          adoptionIndexs.push(i);
        }
      }

      return adoptionIndexs;
    })
  )
    }

  handleAdopt(pet) {
    const petId = parseInt(pet.id, 10); 

    let adoptionInstance; 

    // will set to actual account after wallet function implimented
    const account = '0xb7863a205a04b83b59d9eb59d1c2342f11eb0930'; 

    return Promise.resolve(
    this.contracts.Adoption.deployed()
      .then(instance =>  {
        adoptionInstance = instance; 

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId,  {from:account }); 
      }))
  }
}

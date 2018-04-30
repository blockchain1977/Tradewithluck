import TruffleContract from 'truffle-contract';

import contractData from './adoption.json';

export default class Adoption {
  init(web3Provider) {
    this.contract = TruffleContract(contractData);
    this.contract.Adoption.setProvider(web3Provider);
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

  async handleAdopt(pet) {
    const petId = pet.id;

    let adoptionInstance;

    // will set to actual account after wallet function implimented
    const account = '0xb7863a205a04b83b59d9eb59d1c2342f11eb0930';

    this.contracts.Adoption.deployed()
      .then(instance => {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, { from: account });
      })
      .then(result => {
        console.log(result);
        return this.markAdopted();
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}

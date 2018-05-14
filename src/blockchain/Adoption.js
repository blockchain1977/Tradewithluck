class Adoption {
  constructor() {
    // const contract = require('truffle-contract');
    this.contract = new global.web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: 'getAdopters',
          outputs: [{ name: '', type: 'address[16]' }],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        },
        {
          constant: false,
          inputs: [{ name: 'petId', type: 'uint256' }],
          name: 'adopt',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      '0x8ffc5e04e738f4e5a7c4b122d02645dea11ea770',
      {
        from: '0xc6528cfd9e53ea608593223884f141ea1ed11689', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      }
    );
  }

  checkallAdoptedStatus() {
    // let adoptionInstance;
    return Promise.resolve(
      this.contract.methods
        .getAdopters()
        .call()
        .then(adopters => {
          const adoptionstatus = [];
          for (let i = 0; i < adopters.length; i += 1) {
            if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
              adoptionstatus.push(true);
            } else {
              adoptionstatus.push(false);
            }
          }

          return adoptionstatus;
        })
    );
  }

  handleAdopt(petId) {
    // will set to actual account after wallet function implimented
    const account = '0xc6528cfd9e53ea608593223884f141ea1ed11689';

    return Promise.resolve(
      this.contract.methods
        .adopt(petId)
        .send({ from: account })
        .then(result => result)
    );
  }
}

const adoption = new Adoption();
export default adoption;

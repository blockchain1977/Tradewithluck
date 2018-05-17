import '../../global';

const account = '0xe65e645d0ce0c15992907e9995945d6dd454aa09';
const contractAddress = '0x269af36b29ecaa1c18e6e37859e72a37cefae7ad';

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
      contractAddress,
      {
        from: account, // default from address
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

    return Promise.resolve(
      this.contract.methods
        .adopt(petId)
        .send({ from: account })
        .then(() => petId)
    );
  }
}

const adoption = new Adoption();
export default adoption;

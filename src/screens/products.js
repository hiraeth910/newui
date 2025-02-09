// src/data/products.js
import bear from '../assets/bearandaxe.jpg'
import donkey from '../assets/donkeyandmoney.jpg'
import superhero from '../assets/superchores.jpg'
import dodge from '../assets/dodgechallenger.jpg'
const products = [
  {
    id: "e42d1A",
    name: "Polar bear",
    image: bear,
    images:[bear],
    price: "$10",
    description: "Watch out for the angry bear",
    author: "Rockey",
  },
  {
    id: "asJ39q",
    name: "Modern donkey",
    image: donkey,
    images:[donkey],
    price: "$15",
    description: "Satire on modern living",
    author: "Manush Iyer",
  },
  {
    id: "e428dA",
    name: "Dodge",
    image: dodge,
    images:[dodge],
    price: "$10",
    description: "Morning with my dodge",
    author: "Ganesh",
  },
  {
    id: "asX39q",
    name: "Household",
    image: superhero,
    images:[superhero],
    price: "$15",
    description: "Even a superhero has chores",
    author: "Ramu",
  },
];

export default products;

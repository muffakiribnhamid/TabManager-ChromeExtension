// Maps

const cars = new Map();

cars.set('Brezza', 'Maruti');
cars.set('Creta', 'Hyundai');
cars.set('XUV', 'Mahindra');

for (const [key, value] of cars) {
  console.log(key, value);
}

//Sets

const names = new Set();

names.add('Rahul');
names.add('Rahul1');
names.add('Rahul2');
names.add('Rahul3');

let c = names.has('Rahul');
if (c) {
  console.log('Rahul is present');
}

for (const name of names) {
  console.log(`My Name is ${name}`);
}

// Sets to Arrays

const namesArray = Array.from(names);

console.log(namesArray[1]);

// OBJECTS

const muffakir = {
  name: 'Muffakir',
  age: 18,
  Occupation: 'Student',
  Hobbies: ['Coding', 'Gaming', 'Reading'],
  Address: {
    City: 'Kulgam',
    State: 'Kashmir',
    Country: 'India',
  },
};

//Conditionals

const age = 18;

if (age >= 18) {
  console.log('You are eligible to vote');
} else if (age < 18) {
  console.log('You are not eligible to vote');
}
//loops

for (let i = 0; i < 10; i++) {
  console.log(i);
}

let name1s = ['Muffakir', 'Rahul', 'Rahul1', 'Rahul2', 'Rahul3'];

let i = 0;

while (i <= 10) {
  console.log(`2 * ${i} = ${2 * i}`);
  i++;
}

function MoneyConverter(amount, converto) {
  if (converto == 'USD') {
    amount *= 74;
    console.log(`You have ${amount} in Rupees`);
  } else if (converto == 'EUR') {
    amount *= 85;
    console.log(`You have ${amount} in Rupees`);
  }
}

console.log(MoneyConverter(10, 'USD'));
console.log(MoneyConverter(10, 'EUR'));

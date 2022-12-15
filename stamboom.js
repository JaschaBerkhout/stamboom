let familie = []

const jascha = {
  name : 'Jascha',
  age : 27
}; 

console.log(jascha);

const dunja = {
  name : 'Dunja',
  age : 25
}; 

console.log(dunja);

const zoey = {
  name : 'Zoey',
  age : 20
}; 

console.log(zoey);

function addToFamilie(person){
  familie.push(person);
}
  
addToFamilie(jascha);
addToFamilie(dunja);
addToFamilie(zoey);

console.log(familie);

console.log(familie.length);

function ageTotal(){
  let ageTotal = 0
  for (let i= 0; i < familie.length; i++){
    ageTotal = ageTotal + familie[i].age
  }
  return ageTotal;
}

function ageAverage(){
	return ageTotal() / familie.length; 
}

console.log(ageTotal());
console.log(ageAverage());


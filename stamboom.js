let familie = []

// familie leden als object
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

const mama = {
  name : 'Marry',
  age : 53
};
console.log(mama);

// parameter wordt duidelijk gemaakt hieronder (objecten)
function addToFamilie(person){
  familie.push(person);
  sortAge()
}
  
// familie leden toevoegen
addToFamilie(jascha);
addToFamilie(dunja);
addToFamilie(zoey);
addToFamilie(mama);


console.log(familie);

console.log(familie.length);

// 2 manieren om age total te berekenen
function ageTotal(){
  let ageTotal = 0
  
  for (let i= 0; i < familie.length; i++){
    ageTotal = ageTotal + familie[i].age
  }
  
  return ageTotal;
}
console.log(ageTotal());


function ageTotal2(){
  let ageTotal = 0
  
  familie.forEach(familieLid => ageTotal += familieLid.age)
  
  
  return ageTotal;  
}
console.log(ageTotal2());


function ageAverage(){
	
  return ageTotal() / familie.length; 
}
console.log(ageAverage());

// selectie uit familie halen met slice functie uitgeschreven
function partOfFam(start, end){
    let partOfFam = []
    
    if(end > familie.length ){
        end = familie.length
    }
    
    for (let i=start; i < end; i++){
        partOfFam.push(familie[i])
    }
    
    return partOfFam
}
console.log(partOfFam(1,3));


function sortAge(){
  familie = familie.sort((a, b) => b.age - a.age)
}
console.log(familie);


function oudste(){
  return familie[0]
}
console.log(oudste());


function jongste(){
  return familie[familie.length - 1]
}
console.log(jongste());

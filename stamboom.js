let familie = []

// familie leden als object
const jascha = {
  fname : 'Jascha',
  lname: 'Berkhout',
  gender: 'v',
  birthday: '16-02-1995'
}; 
console.log(jascha);

const dunja = {
  fname : 'Dunja',
  lname: 'Berkhout',
  gender: 'v',
  birthday: '26-05-1997'
}; 
console.log(dunja);

const zoey = {
  name : 'Zoey',
  lname: 'Berkhout',
  gender: 'v',
  birthday: '27-08-2002'
}; 
console.log(zoey);

const mama = {
  name : 'Marry',
  lname: 'Berkhout',
  gender: 'v',
  birthday: '14-12-1696'
};
console.log(mama);

// parameter wordt duidelijk gemaakt hieronder (objecten)
function addToFamilie(person){
  familie.push(person);
  sortAge()
  updateSamenvatting()
}
  
// familie leden toevoegen
addToFamilie(jascha);
addToFamilie(dunja);
addToFamilie(zoey);
addToFamilie(mama);


console.log(familie);

console.log(familie.length);

function aantalPersonenInStamboom(){
  return familie.length
}

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



function updateSamenvatting() {
  const samenvatting = document.getElementById('samenvatting')
      
  console.log(samenvatting)

  let achternaam = 'Berkhout'
  let aantalPersonen = aantalPersonenInStamboom()

  let samenvattingTekst = () => {
  if (aantalPersonen === 1 ){
      return `De familie ${achternaam} bevat ${aantalPersonen} persoon.`
  } 
  else {
      return `De familie ${achternaam} bevat ${aantalPersonen} personen.`
  }
  }

  samenvatting.innerHTML = samenvattingTekst()
}
// const name = document.getElementById('fname').value + ' ' + document.getElementById('lname').value

function formInvullen(){
  const fname = document.getElementById('fname').value
  const lname = document.getElementById('lname').value
  const birthday = document.getElementById('bday').value
  if(document.querySelector('input[name="gender"]:checked') === null){
    return 
  }
  const gender = document.querySelector('input[name="gender"]:checked').value

  addToFamilie({  
    fname : fname,
    lname : lname,
    birthday: birthday,
    gender: gender
  })
}
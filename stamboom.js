let familie = []

class Persoon {
  constructor(fname, lname, gender, birthday){
    this.fname = fname
    this.lname = lname
    this.gender = gender
    this.birthday = birthday
  }
  bepaalLeeftijd(){
    const vandaag = new Date();
    const geboortedatum = new Date(this.birthday);
    let leeftijd = vandaag.getFullYear() - geboortedatum.getFullYear();
    const maand = vandaag.getMonth() - geboortedatum.getMonth();
    const dag = vandaag.getDate() - geboortedatum.getDate()
    if (maand < 0 || (maand === 0 && dag < 0)){
     return leeftijd - 1;
    } else {
      return leeftijd
    }
  }
  name(){
    return this.fname + ' ' + this.lname
  }
};

// const jascha = new Persoon('Jascha','Berkhout','v','1995-02-16');

// const dunja = new Persoon('Dunja','Berkhout','v','1997-05-26') 

// const zoey = new Persoon('Zoey','Berkhout','v','2002-08-27') 

// const mama = new Persoon('Marry','van de Ruit','v','1969-12-14')

function addToFamilie(person){
  familie.push(person);
  sortAge()
  updateSamenvatting()
};
  
// addToFamilie(jascha);
// addToFamilie(dunja);
// addToFamilie(zoey);
// addToFamilie(mama);

function aantalPersonenInStamboom(){
  return familie.length
};


function ageTotal2(){
  let ageTotal = 0
  
  familie.forEach(familieLid => ageTotal += familieLid.bepaalLeeftijd())
  
  
  return ageTotal;  
};


function ageAverage(){
	
  return ageTotal2() / familie.length; 
};

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
};
// console.log(partOfFam(1,3));


function sortAge(){
  familie = familie.sort((a, b) => b.age - a.age)
};


function oudste(){
  return familie[0]
};


function jongste(){
  return familie[familie.length - 1]
};


function updateSamenvatting() {
  const samenvatting = document.getElementById('samenvatting')
      
  console.log(samenvatting)

  let achternaam = ''
  let aantalPersonen = aantalPersonenInStamboom()

  let samenvattingTekst = () => {
  if (aantalPersonen === 1 ){
      return `De familie ${achternaam} bevat ${aantalPersonen} persoon.`
  } 
  else {
      return `De familie ${achternaam} bevat ${aantalPersonen} personen.`
  }
  }

  samenvatting.innerHTML = samenvattingTekst() + ' De gemiddelde leeftijd van de familie is ' + ageAverage() + ' jaar.'
}

const name = document.getElementById('fname').value + ' ' + document.getElementById('lname').value

function formInvullen(){
  const fname = document.getElementById('fname').value
  const lname = document.getElementById('lname').value
  const birthday = document.getElementById('bday').value
  if(document.querySelector('input[name="gender"]:checked') === null){
    return 
  }
  const gender = document.querySelector('input[name="gender"]:checked').value

  addToFamilie(new Persoon(fname,lname,gender,birthday))
};


function addToStorage(){
  window.localStorage.setItem('familie',JSON.stringify(familie))
};

function getFromStorage(){
  return JSON.parse(window.localStorage.getItem('familie'))
};

const readdToFam = () => {
  getFromStorage().forEach(persoon => addToFamilie(
    new Persoon(persoon.fname, persoon.lname, persoon.gender,persoon.birthday)))
};
readdToFam();
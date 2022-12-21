class Familie {
  constructor(){
    this.personen = []
  }

  addPersoon(persoon){
    persoon.id = this.aantalPersonen() + 1
    this.personen.push(persoon);
    this.sortAge()
    updateSamenvatting()
    addToStorage()
    updatenVanStamboomWeergave()
  }

  ageTotal(){
    let ageTotal = 0
    
    this.personen.forEach(persoon => ageTotal += persoon.bepaalLeeftijd())
        
    return ageTotal;  
  }

  aantalPersonen(){
    return this.personen.length
  }
  
  ageAverage(){
	  return this.ageTotal() / this.aantalPersonen(); 
  }

  sortAge(){
    this.personen = this.personen.sort((a, b) => b.bepaalLeeftijd() - a.bepaalLeeftijd())
  }
  
  oudste(){
    return this.personen[0]
  }
  
  jongste(){
    return this.personen[this.aantalPersonen() - 1]
  }
  
  partOfFam(start, end){
    let partOfFam = []
    
    if(end > this.aantalPersonen() ){
        end = this.aantalPersonen()
    }
    
    for (let i=start; i < end; i++){
        partOfFam.push(this.personen[i])
    }
    
    return partOfFam
  }
}

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
  mooiTekstje() {
    return "<div class='"+ (this.gender === 'm' ? 'man' : 'vrouw')+ " persoon'>"+this.name() +
     ' <br> '+ this.bepaalLeeftijd()+
     ' jaar' +
     ' <br>' +
     this.mooieVerjaardag() +
     '</div>';
  }
  mooieVerjaardag() {
    const geboortedatum = new Date(this.birthday)
    return geboortedatum.toLocaleDateString('nl-nl');
  }
};

function updateSamenvatting() {
  const samenvatting = document.getElementById('samenvatting')
      
  console.log(samenvatting)

  let voornaam = DeFamilie.oudste().fname
  let achternaam = DeFamilie.oudste().lname
  const aantalPersonen = DeFamilie.aantalPersonen()

  let samenvattingTekst = () => {
    if (aantalPersonen === 1 ){
      return `De familie ${achternaam} bevat nu ${aantalPersonen} persoon.`
    } 
    else {
      return `De familie ${achternaam} bevat nu ${aantalPersonen} personen.`
    }
  }
  
  samenvatting.innerHTML = samenvattingTekst() + ' De gemiddelde leeftijd van de familie is ' + DeFamilie.ageAverage().toFixed(2) + ' jaar.'
}

function meldingWeghalen(){  
  setTimeout(() => document.getElementById('melding').innerHTML = '', 3000);
} 

// generieke/algemene melding
function algemeneMelding(tekst){
  const meldingElement = document.getElementById('melding')
  meldingElement.innerHTML = tekst
  meldingWeghalen()
}


function meldingNieuwPersoon(persoon) {
 algemeneMelding(`${persoon.fname} is toegevoegd aan de familie ${persoon.lname}.`);
  
}

const name = document.getElementById('fname').value + ' ' + document.getElementById('lname').value

function nieuwPersoonToevoegen(){
  
  const fnameElement = document.getElementById('fname');
  const lnameElement = document.getElementById('lname');
  const genderElement = document.querySelector('input[name="gender"]:checked');
  const bdayElement = document.getElementById('bday');
  
  const fname = fnameElement.value;
  const lname = lnameElement.value;
  const birthday = bdayElement.value;
  
  if(genderElement === null || fname === '' || lname === '' || birthday === ''){
    algemeneMelding('Leeg invulveld.')
    return;
  }
  
  const gender = genderElement.value;
  const persoon = new Persoon(fname,lname,gender,birthday)
  DeFamilie.addPersoon(persoon);
  
  fnameElement.value = '';
  lnameElement.value = '';
  bdayElement.value = '';
  genderElement.checked = false;

  meldingNieuwPersoon(persoon);

};

function addToStorage(){
  window.localStorage.setItem('personen',JSON.stringify(DeFamilie.personen))
};

function getFromStorage(){
  return JSON.parse(window.localStorage.getItem('personen'))
};

const bouwFamilieVanStorage = () => {
  
  const personenUitStorage = getFromStorage()
  if(personenUitStorage === null) {
    return;
  }
  
  personenUitStorage.forEach(persoon => DeFamilie.addPersoon(
    new Persoon(persoon.fname, persoon.lname, persoon.gender,persoon.birthday))
  )
};

// begin van de stamboom website
const DeFamilie = new Familie();
bouwFamilieVanStorage();
updatenVanStamboomWeergave();

function updatenVanStamboomWeergave(){
  const personenElement = document.getElementById('personen')
  personenElement.innerHTML = allesVanDeFamilie();
}

function allesVanDeFamilie() {
  let result = '';
  DeFamilie.personen.forEach(persoon => result += persoon.mooiTekstje())
  return result;
}
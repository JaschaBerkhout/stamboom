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
    
    this.personen.forEach(persoon => ageTotal += persoon.bepaalLeeftijdVanPersoon())
        
    return ageTotal;  
  }

  aantalPersonen(){
    return this.personen.length
  }
  
  ageAverage(){
	  return this.ageTotal() / this.aantalPersonen(); 
  }

  sortAge(){
    this.personen = this.personen.sort((a, b) => b.bepaalLeeftijdVanPersoon() - a.bepaalLeeftijdVanPersoon())
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
  constructor(fname, lname, gender, birthday, deathday){
    this.fname = fname
    this.lname = lname
    this.gender = gender
    this.birthday = birthday
    this.deathday = deathday
  }
  
  bepaalLeeftijdVanPersoon(){
     const geboortedatum = new Date(this.birthday);

    if (!this.isOverleden()){
      const vandaag = new Date();
        return bepaalLeeftijd(geboortedatum,vandaag);        
    }   
    const overlijdensdatum = new Date(this.deathday)
    return bepaalLeeftijd(geboortedatum,overlijdensdatum);
}

  name(){
    return this.fname + ' ' + this.lname
  }
  mooiTekstje() {
    return "<div class='"+ (this.gender === 'm' ? 'man' : 'vrouw')+ " persoon'>"+this.name() +
     ' <br> '+ this.bepaalLeeftijdVanPersoon()+
     ' jaar' +
     ' <br>' +
     this.mooieDatum(this.birthday) +
     ' <br>' +
     (this.isOverleden() ? '✝ ' + this.mooieDatum(this.deathday) : '' ) +
     '</div>';
  }

  mooieDatum(datum) {
    return new Date(datum).toLocaleDateString('nl-nl');
  }

  isOverleden(){
    return this.deathday !== undefined
  }
};

function bepaalLeeftijd(datumStart, datumEind){
  let leeftijd = datumEind.getFullYear() - datumStart.getFullYear();
  const maand = datumEind.getMonth() - datumStart.getMonth();
  const dag = datumEind.getDate() - datumStart.getDate()
  if (maand < 0 || (maand === 0 && dag < 0)){
  return leeftijd - 1;
  } 
  return leeftijd
}

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
  const ddayElement = document.getElementById('dday');
  
  const fname = fnameElement.value;
  const lname = lnameElement.value;
  const birthday = bdayElement.value;
  const deathday = ddayElement.value;
  
  if(genderElement === null || fname === '' || lname === '' || birthday === ''){
    algemeneMelding('Leeg invulveld.')
    return;
  }
  
  const gender = genderElement.value;
  const persoon = new Persoon(fname,lname,gender,birthday,deathday)
  DeFamilie.addPersoon(persoon);
  
  fnameElement.value = '';
  lnameElement.value = '';
  bdayElement.value = '';
  ddayElement.value = '';
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
    new Persoon(persoon.fname, persoon.lname, persoon.gender,persoon.birthday,persoon.deathday))
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


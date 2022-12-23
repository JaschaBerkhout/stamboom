class Familie {
  constructor(personenUitStorage){
    this.personen = []
    if(personenUitStorage === null) {
      return;
    }
      personenUitStorage.forEach(persoon => {
        if(persoon === null) {
          return;
    } 
      this.addPersoon(
      new Persoon(persoon.fname, persoon.lname, persoon.gender,persoon.birthday,persoon.deathday))
    })
  }

  addPersoon(persoon){
    persoon.id = this.aantalPersonen() + 1
    this.personen[persoon.id] = persoon;
    updateSamenvatting(this.aantalPersonen())
    updatenVanStamboomWeergave()
  }

  aantalPersonen(){
    return this.personen.length
  }

  sortAge(){
    return this.personen.sort((jong, oud) => jong.birthday - oud.birthday)
  }
  
  oudste(){
    return this.sortAge()[0]
  }
  
  jongste(){
    return this.sortAge()[this.aantalPersonen() - 1]
  }
};

class Persoon {
  constructor(fname, lname, gender, birthday, deathday){
    this.fname = fname
    this.lname = lname
    this.gender = gender
    this.birthday = birthday
    this.deathday = deathday
  }

  name(){
    return this.fname + ' ' + this.lname
  }

  bepaalLeeftijd(datumStart, datumEind){
    let leeftijd = datumEind.getFullYear() - datumStart.getFullYear();
    const maand = datumEind.getMonth() - datumStart.getMonth();
    const dag = datumEind.getDate() - datumStart.getDate()
    if (maand < 0 || (maand === 0 && dag < 0)){
    return leeftijd - 1;
    }
    return leeftijd
  }

  bepaalLeeftijdVanPersoon(){
     const geboortedatum = new Date(this.birthday);

    if (!this.isOverleden()){
      const vandaag = new Date();
        return this.bepaalLeeftijd(geboortedatum,vandaag);       
    }
    const overlijdensdatum = new Date(this.deathday);
    return this.bepaalLeeftijd(geboortedatum,overlijdensdatum);
  }

  personCard() {
    return "<div class='"+ (this.gender === 'm' ? 'man' : 'vrouw')+ " persoon'>"+this.name() +
     ' <br> '+ this.bepaalLeeftijdVanPersoon()+
     ' jaar' +
     ' <br>* ' +
     this.mooieDatum(this.birthday) +
     ' <br>' +
     (this.isOverleden() ? '✝ ' + this.mooieDatum(this.deathday) : '') +
     '</div>';
  }

  mooieDatum(datum) {
    return new Date(datum).toLocaleDateString('nl-nl');
  }

  isOverleden(){
    return this.deathday !== ''
  }  
};

class Database {
  constructor(){}

  storeAllPersons(){
    //DeFamilie.personen.forEach(persoon => window.localStorage.setItem('persoon['+persoon.id+']', JSON.stringify(persoon)))
    window.localStorage.setItem('personen', JSON.stringify(DeFamilie.personen))
  }
  
  getAllPersons(){
    return JSON.parse(window.localStorage.getItem('personen'))
  }
 };

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

function updateSamenvatting(aantalPersonen) {
  const samenvatting = document.getElementById('samenvatting')

  let samenvattingTekst = () => {
    if (aantalPersonen === 1 ){
      return `De familie bevat nu ${aantalPersonen} persoon.`
    } 
    else {
      return `De familie bevat nu ${aantalPersonen} personen.`
    }
  }
  samenvatting.innerHTML = samenvattingTekst()
};

function algemeneMelding(tekst){
  const meldingElement = document.getElementById('melding')
  meldingElement.innerHTML = tekst
  meldingWeghalen()
};

function meldingWeghalen(){  
  setTimeout(() => document.getElementById('melding').innerHTML = '', 5000);
};

function meldingNieuwPersoon(persoon) {
 algemeneMelding(`${persoon.fname} is toegevoegd aan de familie ${persoon.lname}.`);
};

function allesVanDeFamilie() {
  let result = '';
  DeFamilie.personen.forEach(persoon => result += persoon.personCard())
  return result;
};

function updatenVanStamboomWeergave(){
  const personenElement = document.getElementById('personen');
  personenElement.innerHTML = allesVanDeFamilie();
};

// begin van de stamboom website
let DeDatabase = new Database();
let personenUitStorage = DeDatabase.getAllPersons()
let DeFamilie = new Familie(personenUitStorage);
updatenVanStamboomWeergave();


DeDatabase.storeAllPersons();
function ageAverage(){
    return this.ageTotal() / this.aantalPersonen(); 
}


function ageTotal(){
    let ageTotal = 0
    
    this.personen.forEach(persoon => ageTotal += persoon.bepaalLeeftijdVanPersoon())
        
    return ageTotal;  
  }

  function partOfFam(start, end){
    let partOfFam = []
    
    if(end > this.aantalPersonen() ){
        end = this.aantalPersonen()
    }
    
    for (let i=start; i < end; i++){
        partOfFam.push(this.personen[i])
    }
    
    return partOfFam
  }
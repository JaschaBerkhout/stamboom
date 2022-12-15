const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

function partOfSomething(start, end){
    let partOfSomething = []
    if(end > animals.length ){
        end = animals.length
    }
    for (let i=start; i < end; i++){
        partOfSomething.push(animals[i])
    }
    return partOfSomething
}
console.log(partOfSomething(2,4));
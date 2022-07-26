// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];

  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(number, dnaBases) {
  const pAequor = {
    _specimenNum: number,
    _dna: dnaBases,
    mutate() {
      let generatedBase = returnRandBase();
      let random = Math.floor(Math.random() * dnaBases.length);
      while (this._dna[random] === generatedBase) {
        generatedBase = returnRandBase();
      }
      //console.log(random)
      //console.log(generatedBase);
      this._dna[random] = generatedBase;
    },
    compareDNA(pAeq) {
      let identicalCount = 0;
      (this._dna).forEach(function(base, i){
        if (base === pAeq[i]) {
          identicalCount ++;
        }
      });
      //console.log(identicalCount);
      //console.log(`specimen #1 and specimen #2 have ${Math.floor((identicalCount / (this._dna).length).toFixed(2) * 100)}% DNA in common.`);
      return (Math.floor((identicalCount / (this._dna).length).toFixed(2) * 100));
    },
    willLikelySurvive() {
      let survivingBase = (this._dna).filter(base => base === 'C' || base === 'G');
      //console.log((survivingBase.length / (this._dna).length) * 100);
      if (((survivingBase.length / (this._dna).length) * 100) >= 60) {
        return true;
      }
      return false;
    },
    complementStrand() {
      return (this._dna).map(base => {
        switch (base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
        }
      });
    },
    get specimenNum(){
      return this._specimenNum;
    },
    set specimenNum(specNumber){
      if (Number.isInteger(specNumber)) {
        this._specimenNum = specNumber;
      }
      else {
        console.log('Invalid input.');
      }
    },
    get dna(){
      return this._dna;
    },
    set dna(dnaArray){
      if (dnaArray.every(base => typeof base === 'string')) {
        this._dna = dnaArray;
      }
      else {
        console.log('Invalid input.');
      }
    }
  }
  return pAequor;
}


/*
const testDna = mockUpStrand();
const pAeq = pAequorFactory(5, testDna);

pAeq.mutate();

pAeq.compareDNA(mockUpStrand());
console.log(pAeq.dna);
console.log(pAeq.complementStrand());
*/

let testStrains = [];
let i = 1;
while (testStrains.length < 30) {
  let sample = pAequorFactory(i, mockUpStrand());
  if (sample.willLikelySurvive()) {
    testStrains.push(sample);
  }
  i++;
}
console.log('Samples added.');
let mostSimilar = 0;
let similarStrains = [];
for (let i = 0; i < testStrains.length; i++) {
  let j = testStrains.length - 1;
  while (i < j) {
    if ((testStrains[i].compareDNA(testStrains[j].dna)) > mostSimilar) {
      similarStrains = [];
      mostSimilar = (testStrains[i].compareDNA(testStrains[j].dna));
      similarStrains.push(testStrains[i].dna);
      similarStrains.push(testStrains[j].dna);
    } 
    j--;
  }
  i++;
}
//console.log(mostSimilar);
for (let similarStrain of similarStrains) {
  console.log(`The 2 strains that have the most in common (${mostSimilar}%) are ${similarStrain}.`)
}
/*
for (const strain of testStrains) {
  console.log(strain.dna);
  console.log(strain.specimenNum);
  strain.dna = mockUpStrand();
  console.log(strain.willLikelySurvive());
}
*/

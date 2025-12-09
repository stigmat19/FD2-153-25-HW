//ForEach
let vowelsCountForEach = (str) => {
    const vowels = 'аеёиоуэюяы';
    const strArr = str.toLowerCase().split('');
    let count = 0;
    
    strArr.forEach(char => {
        if (vowels.includes(char)){
            count++;
        }
    });
    return count;
 }

//Fitler
let vowelsCountFilter = (str) => {
    const vowels = 'аеёиоуэюяы';
    const strArr = str.toLowerCase().split('');

    return strArr.filter(char => vowels.includes(char)).length;
}

//Reduce
let vowelsCountReduce = (str) => {
    const vowels = 'аеёиоуэюяы';
    const strArr = str.toLowerCase().split('');

    return strArr.reduce((acc, char) => acc + (vowels.includes(char) ? 1 : 0), 0);
}
 const userInput = prompt("Введите вашу фамилию на русском");

 const count1 = vowelsCountForEach(userInput);
 const count2 = vowelsCountFilter(userInput);
 const count3 = vowelsCountReduce(userInput);

 alert(`В вашей фамилии ${count1} гласных`);
 console.log(`В вашей фамилии ${count2} гласных`);
 console.log(`В вашей фамилии ${count3} гласных`);
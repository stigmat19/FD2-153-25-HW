function vowelsCount(surname) {

  const vowels = "аеёиоуыэюя";
  let count = 0;
  const lowerCase = surname.toLowerCase();

  for (let c = 0; c < lowerCase.length; c++) {

    const char = lowerCase[c];
    let isVowel = false;

    for (let i = 0; i < vowels.length; i++) {
      if (char === vowels[i]) {
        isVowel = true;
        break;
      }
    }
    if (isVowel) {
      count++;
    }
  }
  return count;
}

const userInput = prompt("Введите вашу фамилию:");
console.log("Количество гласных:", vowelsCount(userInput));
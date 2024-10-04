const readline = require("readline");

function isPalindromeSimple(str) {
  // sanitize string to remove non alfanumeric character
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  //   reverse string
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
}

function isPalindromeLoop(str) {
  // sanitize string to remove non alfanumeric character
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  //   check from end to end
  for (let i = 0; i < cleanedStr.length / 2; i++) {
    if (cleanedStr[i] !== cleanedStr[cleanedStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question('Masukkan kata atau kalimat untuk dicek apakah palindrom (ketik "exit" untuk keluar): ', (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Terima kasih telah menggunakan program ini!");
      rl.close();
      return;
    }

    console.log(isPalindromeSimple(input));
    console.log(isPalindromeLoop(input));

    promptUser();
  });
}

promptUser();

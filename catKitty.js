const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const multipleRules = [
  { number: 3, text: "cat" },
  { number: 5, text: "kitty" },
];

const exactRules = {};

function addRule(angka, output) {
  if (typeof angka !== "number" || typeof output !== "string") {
    console.log("Invalid input. 'angka' harus berupa number dan 'output' harus berupa string.");
    return;
  }
  exactRules[angka] = output;
  console.log(`Aturan baru ditambahkan: ${angka} -> "${output}"`);
}

function printNumbers(n) {
  if (typeof n !== "number" || n <= 0) {
    console.log("Invalid input. 'n' harus berupa number dan lebih besar dari 0.");
    return;
  }

  const output = [];

  for (let x = 1; x <= n; x++) {
    if (exactRules.hasOwnProperty(x)) {
      output.push(exactRules[x]);
      continue;
    }

    let replacedText = "";

    multipleRules.forEach((rule) => {
      if (x % rule.number === 0) {
        replacedText += rule.text;
      }
    });

    if (replacedText !== "") {
      output.push(replacedText);
    } else {
      output.push(x.toString());
    }
  }

  console.log(output.join(", "));
}

function promptUserDynamic() {
  rl.question('Masukkan angka n untuk menampilkan angka dari 1 hingga n (ketik "exit" untuk keluar): ', (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Terima kasih telah menggunakan program ini!");
      rl.close();
      return;
    }

    const n = parseInt(input, 10);

    if (isNaN(n) || n <= 0) {
      console.log("Input tidak valid. Harap masukkan angka bulat yang lebih besar dari 0.\n");
      promptUserDynamic(); // Meminta input lagi
      return;
    }

    console.log("\nOutput awal:");
    printNumbers(n);

    rl.question("Apakah Anda ingin menambahkan aturan baru? (y/n): ", (response) => {
      if (response.toLowerCase() === "y") {
        rl.question("Masukkan angka yang ingin diganti: ", (angkaInput) => {
          const angka = parseInt(angkaInput, 10);
          if (isNaN(angka) || angka <= 0) {
            console.log("Input tidak valid. Harap masukkan angka bulat yang lebih besar dari 0.\n");
            rl.close();
            return;
          }

          rl.question("Masukkan output pengganti: ", (output) => {
            addRule(angka, output);
            console.log("Output setelah menambahkan aturan baru:");
            printNumbers(n);
            console.log("Terima kasih telah menggunakan program ini!");
            rl.close();
          });
        });
      } else {
        console.log("Terima kasih telah menggunakan program ini!");
        rl.close();
      }
    });
  });
}

// Memulai prompt dinamis kepada pengguna
promptUserDynamic();

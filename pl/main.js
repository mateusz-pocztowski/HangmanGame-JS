window.onload = () => {

  let startTimer = new Date();

  const proverbs = ['Bez pracy nie ma kołaczy', 'Darowanemu koniowi w zęby się nie zagląda', 'Fortuna kołem się toczy', 'Nie chwal dnia przed zachodem słońca', 'Lepszy wróbel w garści niż gołąb na dachu', 'Apetyt rośnie w miarę jedzenia', 'Co ma wisieć nie utonie', 'Dzieci i ryby głosu nie mają', 'Najlepszą obroną jest atak', 'Raz na wozie raz pod wozem'];

  const actors = ['Robert De Niro', 'Morgan Freeman', 'Kevin Spacey', 'Clint Eastwood', 'Tom Hanks', 'Brad Pitt', 'Mel Gibson', 'Johnny Depp', 'Nicolas Cage', 'Jack Nicholson'];

  const actresses = ['Angelina Jolie', 'Emma Watson', 'Jodie Foster', 'Julia Roberts', 'Jennifer Lawrence', 'Cameron Diaz', 'Jennifer Aniston', 'Salma Hayek', 'Mila Kunis', 'Margot Robbie'];

  const movies = ['Forrest Gump', 'Joker', 'El Camino A Breaking Bad Movie', 'The Shawshank Redemption', 'The Green Mile', 'Intouchables', 'Pulp fiction', 'Fight Club', 'Inception', 'Gran Torino'];

  const categories = [proverbs, actors, actresses, movies];
  const category = Math.floor(Math.random() * categories.length);
  const index = Math.floor(Math.random() * categories[category].length);
  const categoryName = ['PRZYSŁOWIA', 'AKTORZY', 'AKTORKI', 'FILMY'];

  const alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWYZŹŻ'.split("");
  const password = categories[category][index].toUpperCase().split('');
  document.querySelector('.category').textContent = categoryName[category];

  const string = document.querySelector('.string');
  const image = document.querySelector('img');

  for (let i = 0; i < password.length; i++) {
    (password[i] == " ") ? string.textContent += " ": string.textContent += "_";
  }

  alphabet.forEach(letter => {
    const newLetter = document.createElement('li');
    newLetter.textContent = letter;
    document.querySelector('ul').appendChild(newLetter);
    newLetter.addEventListener('click', letterCheck);
  })

  String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }

  let counter = 0;

  function letterCheck(e) {
    let check = false;
    letter = e.target.textContent;

    alphabet.forEach((item, index) => {
      if (letter === password[index]) {
        string.textContent = string.textContent.replaceAt(index, letter);
        check = true;
      }
    })
    if (check === true) {
      e.target.classList.add('clicked');
    } else if (check === false && e.target.className != 'clicked') {
      counter++;
      e.target.classList.add('clicked');
      image.src = `../img/s${counter}.png`;
    }

    if (string.textContent == password.join('')) {
      image.src = `../img/s8.png`;
      let stopTimer = new Date();

      let seconds = (stopTimer - startTimer) / 1000;
      let minutes = parseInt(seconds / 60);
      seconds = parseInt(seconds % 60);

      document.querySelector('ul').innerHTML = `Wygrałeś, gratulacje! Twój czas to: <span class="time">${minutes}min ${seconds}s</span>.
    <div class="reset">LOSUJ NOWE!<br/>
    <img class="tryAgain" src="../img/spin.png"/></div>`;
      document.querySelector('.tryAgain').addEventListener('click', () => {
        window.location.reload();
      })

    } else if (counter >= 7) {
      document.querySelector('ul').innerHTML = `Przegrałeś, wisisz! Prawidłowe hasło to: <span style='color:red'>${password.join('')}</span>
    <div class="reset">JESZCZE RAZ?<br/>
    <img class="tryAgain" src="../img/spin.png"/></div>`;
      document.querySelector('.tryAgain').addEventListener('click', () => {
        window.location.reload();
      })
    }
  }
  document.querySelector('.reroll').addEventListener('click', () => window.location.reload())
}
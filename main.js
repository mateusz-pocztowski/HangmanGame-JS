window.onload = () => {

  let startTimer = new Date();

  const proverbs = ['The squeaky wheel gets the grease', 'Better safe than sorry', 'Great minds think alike', 'Haste makes waste', 'Look before you leap', 'Measure twice cut one', 'Misery loves company', 'Better late than never', 'Mind your own business', 'Time is money', 'No man is an island', 'Fortune favors the bold', 'Hope for the best but prepare for the worst', 'A picture is worth a thousand words', 'Discretion is the greater part of valor'];

  const actors = ['Robert De Niro', 'Morgan Freeman', 'Kevin Spacey', 'Clint Eastwood', 'Tom Hanks', 'Brad Pitt', 'Mel Gibson', 'Johnny Depp', 'Nicolas Cage', 'Jack Nicholson', 'Chris Evans', 'Channing Tatum', 'George Clooney', 'Jared Leto', 'Ryan Reynolds'];

  const actresses = ['Angelina Jolie', 'Emma Watson', 'Jodie Foster', 'Julia Roberts', 'Jennifer Lawrence', 'Cameron Diaz', 'Jennifer Aniston', 'Salma Hayek', 'Mila Kunis', 'Margot Robbie', 'Scarlett Johansson', 'Emma Stone', 'Cara Delevingne', 'Melissa Mccarthy', 'Charlize Theron'];

  const movies = ['Forrest Gump', 'Joker', 'El Camino A Breaking Bad Movie', 'The Shawshank Redemption', 'The Green Mile', 'Intouchables', 'Pulp fiction', 'Fight Club', 'Inception', 'Gran Torino', 'Titanic', 'Seven Pounds', 'Inglourious Basterds', 'A Beautiful Mind', 'Cast Away', 'Django Unchained'];

  const categories = [proverbs, actors, actresses, movies];
  const category = Math.floor(Math.random() * categories.length);
  const index = Math.floor(Math.random() * categories[category].length);
  const categoryName = ['PROVERBS', 'ACTORS', 'ACTRESSES', 'MOVIES'];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
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
      image.src = `img/s${counter}.png`;
    }

    if (string.textContent == password.join('')) {
      image.src = `img/s8.png`;
      let stopTimer = new Date();

      let seconds = (stopTimer - startTimer) / 1000;
      let minutes = parseInt(seconds / 60);
      seconds = parseInt(seconds % 60);

      document.querySelector('ul').innerHTML = `You won, congratulations! Your time: <span class="time">${minutes}min ${seconds}s</span>.
    <div class="reset">ANOTHER ONE?<br/>
    <img class="tryAgain" src="img/spin.png"/></div>`;
      document.querySelector('.tryAgain').addEventListener('click', () => {
        window.location.reload();
      })

    } else if (counter >= 7) {
      document.querySelector('ul').innerHTML = `You're dead! The password is: <span style='color:red'>${password.join('')}</span>
    <div class="reset">Try again!<br/>
    <img class="tryAgain" src="img/spin.png"/></div>`;
      document.querySelector('.tryAgain').addEventListener('click', () => {
        window.location.reload();
      })
    }
  }
  document.querySelector('.reroll').addEventListener('click', () => window.location.reload())
}

class Game {
  constructor (element) {
    this.element = element;
    this.board = ['','','','','','','','',''];
    this.simbol = {
      options: ['x', 'o'],
      player: 0,
      change() {
        this.player = (this.player == 0) ? 1 : 0;
      },
    };
    this.gameover = false;
    this.winning_sequence = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
  };

  check_winning_sequence(simbol) {
    for ( let i in this.winning_sequence) {
      if (this.board[ this.winning_sequence[i][0] ] === simbol &&
          this.board[ this.winning_sequence[i][1] ] === simbol &&
          this.board[ this.winning_sequence[i][2] ] === simbol ) {
            console.log(`sequencia Vencedora - ${i}`);
            return true;
          }
    }
  }

  make_play(position) {
    if (this.gameover) return false;

    if (this.board[position] === '') {
      this.board[position] = this.simbol.options[ this.simbol.player ];

      this.draw() 

      if (this.check_winning_sequence(this.simbol.options[ this.simbol.player ])) {
        this.finish_game();
      } else {
        this.simbol.change();
      };
    }
  }

  draw() {
    let content = '';
    for (let i in this.board) {
      content += `<div onclick='game.make_play(${ i })'>${ this.board[i] }</div> `;
    };

    this.element.innerHTML = content;
  }

  finish_game() {
    this.gameover = true;
  }

  init() {
    this.draw();
    return this;
  }
}
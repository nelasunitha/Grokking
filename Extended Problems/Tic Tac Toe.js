class TicTacToe {
  constructor(n) {
      this.dimension = n
      this.rows = new Array(n).fill(0)
      this.cols = new Array(n).fill(0)
      this.diagonal = 0
      this.antiDiagonal = 0
  }
  move(row, col, player) {
      const score = player === 1 ? 1 : -1
      this.rows[row] += score
      this.cols[col] += score
      if (row == col) this.antiDiagonal += score
      if (row + col === this.dimension - 1) this.diagonal += score
      if (Math.abs(this.rows[row]) === this.dimension ||
          Math.abs(this.cols[col]) === this.dimension ||
          Math.abs(this.diagonal) === this.dimension ||
          Math.abs(this.antiDiagonal) === this.dimension
         ) return player
      return 0
  }
}
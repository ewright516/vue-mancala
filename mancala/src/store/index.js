import { createStore } from "vuex";

const store = createStore({
  state: {
    board: {
      pocket: {
        1: 4,
        2: 4,
        3: 4,
        4: 4,
        5: 4,
        6: 4,
        7: 0,
        8: 4,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 0,
      },
      bottomTurn: true,
      gameOver: false,
    },
  },
  mutations: {
    makeMove(state, start) {
      // TODO: captures
      let stones = state.board.pocket[start];
      let finalPocket = start + state.board.pocket[start];
      while (finalPocket > 14) {
        finalPocket = finalPocket - 14;
      }
      if (state.board.bottomTurn && finalPocket === 14) {
        finalPocket = 1;
      } else if (!state.board.bottomTurn && finalPocket === 7) {
        finalPocket = 8;
      }
      console.log("Final: " + finalPocket);
      for (let i = 1; i <= stones; i++) {
        let newPocket = start + i;
        if (state.board.bottomTurn && newPocket == 14) {
          stones = stones + 1;
          continue;
        }
        if (newPocket > 14) {
          console.log("overflow");
          newPocket = newPocket - 14;
          state.board.pocket[newPocket] = state.board.pocket[newPocket] + 1;
        } else {
          state.board.pocket[newPocket] = state.board.pocket[newPocket] + 1;
        }
      }
      console.log(stones);
      if (state.board.bottomTurn && finalPocket === 7) {
        console.log();
      } else if (!state.board.bottomTurn && finalPocket === 14) {
      } else {
        const oppositePocket = Math.abs(14 - finalPocket);
        if (
          state.board.bottomTurn &&
          finalPocket < 7 &&
          state.board.pocket[finalPocket] === 1
        ) {
          state.board.pocket[7] =
            state.board.pocket[7] + state.board.pocket[oppositePocket] + 1;
          state.board.pocket[finalPocket] = 0;
          state.board.pocket[oppositePocket] = 0;
          console.log("switch");
          state.board.bottomTurn = !state.board.bottomTurn;
        } else if (
          !state.board.bottomTurn &&
          finalPocket > 7 &&
          state.board.pocket[finalPocket] === 1
        ) {
          state.board.pocket[14] =
            state.board.pocket[14] + state.board.pocket[oppositePocket] + 1;
          state.board.pocket[finalPocket] = 0;
          state.board.pocket[oppositePocket] = 0;
          console.log("switch");
          state.board.bottomTurn = !state.board.bottomTurn;
        } else {
          console.log("switch");
          state.board.bottomTurn = !state.board.bottomTurn;
        }
      }
      state.board.pocket[start] = 0;
    },
    gameEnd(state, { top, bottom }) {
      state.board.pocket[7] = state.board.pocket[7] + bottom;
      state.board.pocket[14] = state.board.pocket[14] + top;
      for (let x = 1; x < 14; x++) {
        if (x === 7 || x === 14) {
          continue;
        }
        state.board.pocket[x] = 0;
      }
      state.board.gameOver = true;
      console.log("game over");
    },
  },
  actions: {
    async callMakeMove(context, start) {
      context.commit("makeMove", start);
    },
  },
});

export default store;

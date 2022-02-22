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
    },
  },
  mutations: {
    makeMove(state, start) {
      // TODO: captures
      let stones = state.board.pocket[start];
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
      if (state.board.bottomTurn && start + state.board.pocket[start] === 7) {
        console.log();
      } else if (
        !state.board.bottomTurn &&
        start + state.board.pocket[start] === 14
      ) {
      } else {
        console.log("switch");
        state.board.bottomTurn = !state.board.bottomTurn;
      }
      state.board.pocket[start] = 0;
    },
  },
  actions: {
    async callMakeMove(context, start) {
      context.commit("makeMove", start);
    },
  },
});

export default store;

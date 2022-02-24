<template>
    <div class="board">
        <div v-for="index in 6" :key="index" @click="handleClick(index, bottomTurn)" class="pocket bottom" :class="`p${index}`">{{pockets[index]}}</div>
        <div class="pocket p7 mancala">{{pockets[7]}}</div>
        <div v-for="index in 6" :key="index" @click="handleClick(index + 7, bottomTurn)" class="pocket top" :class="`p${index+7}`">{{pockets[index + 7]}}</div>
        <div class="pocket p14 mancala">{{pockets[14]}}</div>
    </div>
</template>

<script setup>
import { computed, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const bottomTurn = computed(() => store.state.board.bottomTurn)
const pockets = store.state.board.pocket
const handleClick = (pocket, turn) => {
    if((turn && pocket < 7)||(!turn && pocket > 7)){
        console.log("clicked")
        pocket = parseInt(pocket)
        store.commit('makeMove', pocket)
    } else {
        console.log("not you turn")
    }
}

onUpdated(() => {
    const gameOver = computed(() => store.state.board.gameOver)
    console.log("Game is over? " + gameOver.value)
    let bottomTotal = 0
    let topTotal = 0
    for(let i=1; i<7; i++){
        bottomTotal = bottomTotal + pockets[i]
    }
    for(let i=8; i<14; i++){
        topTotal = topTotal + pockets[i]
    }
    if(!gameOver.value){
        console.log("game not over yet")
        if(topTotal === 0 || bottomTotal === 0){
            store.commit("gameEnd", { top: topTotal, bottom: bottomTotal })
            console.log("Top: " + topTotal + " | Bottom: " + bottomTotal)
        }
        
    }
})
</script>

<style scoped>
    .board{
        display: grid;
        grid-template-columns: repeat(8, minmax(50px, 1fr));
        grid-template-rows: repeat(2, minmax(100px, 1fr));
        grid-gap: 20px;
        background-color: rgb(177, 143, 81);
        padding: 20px 20px;
        outline: thick solid rgb(116, 94, 53);
    }
    .pocket {
        background-color: wheat;
        display: grid;
        justify-items: center;
        align-items: center;
        outline: medium solid rgb(116, 94, 53);
    }
    .mancala {
    }
    .p7 {
        grid-column: 8;
        grid-row: 1 / span 2
    }
    .p14 {
        grid-column: 1;
        grid-row: 1 / span 2
    }
    .p1, .p2, .p3, .p4, .p5, .p6 {
        grid-row: 2
    }
    .p8 {
        grid-column: 7;
        grid-row: 1
    }
    .p9 {
        grid-column: 6;
        grid-row: 1
    }
    .p10 {
        grid-column: 5;
        grid-row: 1
    }
    .p11 {
        grid-column: 4;
        grid-row: 1
    }
    .p12 {
        grid-column: 3;
        grid-row: 1
    }
    .p13 {
        grid-column: 2;
        grid-row: 1
    }
</style>
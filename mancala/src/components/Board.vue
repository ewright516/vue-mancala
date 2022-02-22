<template>
    <div class="board">
        <div v-for="index in 6" :key="index" @click="handleClick(index, bottomTurn)" class="pocket bottom" :class="`p${index}`">{{pockets[index]}}</div>
        <div class="pocket p7 mancala">{{pockets[7]}}</div>
        <div v-for="index in 6" :key="index" @click="handleClick(index + 7, bottomTurn)" class="pocket top" :class="`p${index+7}`">{{pockets[index + 7]}}</div>
        <div class="pocket p14 mancala">{{pockets[14]}}</div>
    </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
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
</script>

<style scoped>
    .board{
        display: grid;
        grid-template-columns: repeat(8, minmax(50px, 1fr));
        grid-template-rows: repeat(2, minmax(100px, 1fr));
        grid-gap: 20px
    }
    .pocket {
        background-color: red;
    }
    .mancala {
        background-color: wheat !important;
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

<template>

<Header />
<div class="sort-root">
    <ControlPanel class="control-panel" :buttons="buttons"/>
    <TransitionGroup class="list-of-lists" name="listOfLists" tag="ul">
        <template v-for="(list, index) in sort.lists.slice(0, -1)" :key="index">
            <div :style="{'grid-column': 1, 'grid-row': index+1}" class="list-item">{{index+1}}</div>
            <div style="grid-column: 2" class="list">
                <div class="list-item" v-for="item in list" :key="item.id" :style="{background: item.highlight.fill_colour.rgb_hex_string}">
                    {{ item.value }}
                </div>
            </div>
        </template>

        <div :style="{'grid-column': 1, 'grid-row': sort.lists.length}" class="list-item list-number">{{sort.list_idx+1}}</div>
        <TransitionGroup :style="{'grid-column': 2, 'grid-row': sort.lists.length}" name="list" class="list list-current" tag="template">
            <ToolTip :tooltip="item.tooltip" class="list-item" v-for="item in sort.list" :key="item.id" :style="{background: item.highlight.fill_colour.rgb_hex_string}">
            <span>
            {{ item.value }}
            </span>
            </ToolTip>
        </TransitionGroup>
        <div v-if="true" class="finished-banner" :style="{'grid-column': '1 / span 2', 'grid-row': sort.lists.length+1}" >
        Algorithm complete
        </div>

    </TransitionGroup>
</div>
</template>

<script>
import { BubbleSort } from '@/algorithms';
import { Level } from '@/lib';
import ControlPanel from './control/ControlPanel.vue';
import ToolTip from './ui/ToolTip.vue';
import Header from './ui/Header.vue';

export default {
    data() {
        return {
            /**
            @type {BubbleSort}
            */
            sort: new BubbleSort(true),
            animating: false,
            currentList: [],
        };
    },
    computed: {
          buttons() {
              return [
                 {
                     func: this.step,
                     label: "step",
                     bind: {
                         disabled: this.complete,
                     },
                 },
                 {
                     func: this.iteration,
                     label: "iteration",
                     bind: {
                         disabled: this.complete,
                     },
                 },
                 {
                     func: this.setList,
                     label: "reset",
                     bind: {
                     },
                 },
            ]
          },
          complete() {
              return this.sort.complete;
          }
    },
    methods: {
        setList() {
            this.sort = new BubbleSort(true);
            this.sort.inputContainer.data[0] = [6, 7, 2, 1, 5];
            this.sort.setup();
            this.currentList = this.sort.list;
        },
        step() {
            this.sort.step(Level.CALCULATION);
        },
        iteration() {
            this.sort.step(Level.ITERATION);
        }
    },
    mounted() {
        this.setList();
    },
    components: { ControlPanel, ToolTip, Header }
}
</script>

<style scoped>

.list-container { 
    display: block;
}

.list-move {
    transition: all 1s;
}
.list {
    display: grid;
    grid-auto-columns: auto;
    border: .1rem solid lightblue;
    margin: .5rem;
    transition: all 1s;
    grid-column: 2;
}
.list-current {
    border: .1rem solid blue;
}

.list-item {
    /* grid-column: auto; */
    grid-row: 1;
    padding: 0px 1rem 0px 1rem;
    margin: .5rem;
    border: .1rem solid red;
    transition: .5s;
    text-align: center;
}

.listOfLists-enter-active {
    transition: all 1s;
    overflow: hidden;
}

.list-leave-active {
    transition: all 0s;
}

.sort-root {
    display: grid;
    grid-template-columns: 20% auto;
    /* position: fixed; */
    left: 1rem;
    right: 1rem;
    top: 1rem;
    min-height: 75vh
}
.list-of-lists {
    display: grid;
    grid-template-columns: 5% auto;
    grid-template-rows: repeat(auto-fill, 120px);
}
.control-panel {
    grid-column: 1;
    grid-row: 1 / -1;
}

@media only screen and (max-width: 450px) {
    .sort-root {
        grid-template-columns: 100%;
        grid-template-rows: 30% auto;
    }
}
.finished-banner {
    text-align: center;
    border: 1px solid green;
}


</style>

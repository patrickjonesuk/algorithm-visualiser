<template>
  <algorithm-layout :buttons="buttons">
    <TransitionGroup
      :style="heightCss"
      class="list-of-lists"
      name="listOfLists"
      tag="ul"
    >
      <template v-for="(list, index) in sort.lists.slice(0, -1)" :key="index">
        <div
          :style="{ 'grid-column': 1, 'grid-row': index + 1 }"
          class="list-item list-number centre-content"
        >
          {{ index + 1 }}
        </div>
        <div
          style="grid-column: 2"
          :style="{ 'grid-row': index + 1 }"
          class="list"
        >
          <div
            class="list-item centre-content"
            v-for="item in list"
            :key="item.id"
            :style="{
              background: item.highlight.fill_colour.rgb_hex_string,
              border: item.highlight.border.css_string,
            }"
          >
            <NumberDisplay :number="item.value" />
          </div>
        </div>
      </template>

      <div
        :style="{ 'grid-column': 1, 'grid-row': sort.lists.length }"
        class="list-item list-number centre-content"
        key="curent-number"
      >
        {{ sort.list_idx + 1 }}
      </div>
      <TransitionGroup
        :style="{ 'grid-column': 2, 'grid-row': sort.lists.length }"
        name="list"
        class="list list-current"
        tag="div"
        key="current"
      >
        <ToolTip
          class="list-item centre-content"
          :tooltip="item.tooltip"
          v-for="item in sort.list"
          :key="item.id"
          :style="{
            background: item.highlight.fill_colour.rgb_hex_string,
            border: item.highlight.border.css_string,
          }"
        >
          <NumberDisplay :number="item.value" />
        </ToolTip>
      </TransitionGroup>
      <div
        v-if="complete"
        class="finished-banner centre-content"
        :style="{
          'grid-column': '1 / span 2',
          'grid-row': sort.lists.length + 1,
        }"
        key="complete-banner"
      >
        {{ sort.end_message }}
      </div>
    </TransitionGroup>
    <!--</div>-->
  </algorithm-layout>
</template>

<script>
import { Level, ListAlgorithm } from "@/lib";
import ControlPanel from "./control/ControlPanel.vue";
import ToolTip from "./ui/ToolTip.vue";
import NumberDisplay from "./ui/NumberDisplay.vue";
import AlgorithmLayout from "./ui/AlgorithmLayout.vue";

export default {
  props: ["numbers", "direction", "sortclass"],
  data() {
    return {
      /**
        @type {ListAlgorithm}
       */
      sort: new this.sortclass(this.direction),
    };
  },
  computed: {
    heightCss() {
      return {
        height: `${(this.sort.lists.length + 1) * 120}px`,
      };
    },
    buttons() {
      return [
        {
          func: () => this.sort.step(Level.OPERATION),
          label: "step",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: () => this.sort.step(Level.ITERATION),
          label: "iteration",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: () => this.sort.step(Level.ALGORITHM),
          label: "complete",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: this.setList,
          label: "reset",
          bind: {},
        },
        {
          func: () => this.$emit("new"),
          label: "new",
          bind: {},
        },
      ];
    },
    complete() {
      return this.sort.complete;
    },
  },
  methods: {
    setList() {
      this.sort = new this.sortclass(this.direction);
      this.sort.data(this.numbers);
    },
  },
  mounted() {
    this.setList();
  },
  components: { ControlPanel, ToolTip, NumberDisplay, AlgorithmLayout },
};
</script>

<style scoped>
.list-move {
  transition: all 0.5s;
}
.list {
  display: grid;
  grid-auto-columns: auto;
  border: 0.1rem solid lightblue;
  margin: 0.5rem;
  transition: all 0.5s;
  grid-column: 2;
}

.listOfLists-leave-active,
.list-leave-active {
  transition: none;
  display: none !important;
}

.list {
  border: 0.1rem solid var(--rgbLine);
}
.list-current {
  border-color: var(--rgbForeground);
}

.list-item {
  /* grid-column: auto; */
  grid-row: 1;
  padding: 0px 1rem 0px 1rem;
  margin: 0.5rem;
  border: 0.1rem solid var(--rgbLine);
  transition: 0.5s;
  text-align: center;
  min-width: 4rem;
}

.listOfLists-enter-active {
  transition: all 1s;
  overflow: hidden;
}
.listOfLists-enter-from.finished-banner {
  transform: translateY(-100%);
}

.list-leave-active {
  transition: all 0s;
}

.sort-root {
  padding-right: 2rem;
  display: grid;
  grid-template-columns: minmax(150px, max-content) auto;

  inset: 2vh;
  min-height: 86vh;
}
.list-of-lists {
  display: grid;
  grid-template-columns: max(5rem, 5%) auto;
  grid-template-rows: repeat(auto-fit, 120px);
  padding-left: 0;
}
.control-panel {
  grid-column: 1;
  grid-row: 1 / -1;
  min-height: 100%;
}

.centre-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 450px) {
  .sort-root {
    grid-template-columns: 100%;
    grid-template-rows: 30% auto;
  }
  .list-of-lists {
    padding-left: 0;
  }
}
.finished-banner {
  text-align: center;
  margin: 0.5rem;
  border: 0.1rem solid var(--rgbGreen);
  transition: all 0.5s;
}
</style>

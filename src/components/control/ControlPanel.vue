
<template>
  
<div class="panel-root">
    <div class="buttons">
        <button v-bind="btn.bind" class="btn" @click="btn.func()" v-for="(btn, idx) in buttons" :key="idx">
            {{ btn.label }}
        </button>
    </div>
</div>
</template>

<script>
export default {
    props: ['buttons'],
}
</script>

<style>

.panel-root {
    background-color: blue;
    display: grid;
    padding: 1rem;
    grid-template-rows: 3rem auto;
}
.buttons {
    display: grid;
    width: 50%;
}
.btn {
    margin-top: .5rem;
}
.buttons>:first-child {
    margin-top: 0;
}

</style>

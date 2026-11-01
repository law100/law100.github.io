<script setup>
import {ref,onMounted,watch,nextTick} from 'vue';
import {useData} from 'vitepress';
const props=defineProps({code:String});const box=ref();const error=ref('');const {isDark}=useData();let mounted=false;let sequence=0;
async function draw(){if(!mounted)return;const current=++sequence;try{const {default:mermaid}=await import('mermaid');mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:isDark.value?'dark':'default',fontFamily:'system-ui, sans-serif'});const id='hub-diagram-'+Math.random().toString(36).slice(2);const {svg}=await mermaid.render(id,props.code);if(current===sequence&&box.value){box.value.innerHTML=svg;error.value='';}}catch{error.value='图示暂未加载，请刷新页面。';}}
onMounted(()=>{mounted=true;draw();});watch(()=>[props.code,isDark.value],async()=>{await nextTick();draw();});
</script>
<template><div class="hub-diagram" ref="box" aria-label="架构或流程图"></div><p v-if="error">{{error}}</p></template>

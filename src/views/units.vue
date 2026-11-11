<script setup>
import { ref, onMounted } from 'vue'

const characters = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/characters')
    const data = await response.json()
    characters.value = data
  } catch (error) {
    console.error('Fout bij het ophalen van karakters:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div style="padding: 20px;">
    <h1>Dokkan Battle Characters</h1>

    <!-- 1. Laden -->
    <p v-if="loading">Karakters laden...</p>

    <!-- 2. Karakters tonen als ze er zijn -->
    <div v-else-if="characters.length > 0" style="display: flex; flex-wrap: wrap; gap: 20px;">

      <!-- We loopen nu over 'characters' en noemen elk item 'char' -->
      <div v-for="char in characters" :key="char.id" class="unit-card" style="border: 1px solid #ccc; padding: 10px; border-radius: 8px; width: 180px; text-align: center;">

        <!-- De router-link stuurt je naar /units/het-id -->
        <router-link :to="`/units/${char.id}`" style="text-decoration: none; color: inherit;">
          <img :src="char.imageURL" alt="Unit plaatje" style="width: 100px; height: auto;" />
          <h3 style="font-size: 1em; margin: 10px 0 5px 0;">{{ char.name }}</h3>
          <p style="font-size: 0.8em; color: #666; margin: 0;">{{ char.title }}</p>
        </router-link>

      </div>

    </div>

    <!-- 3. Geen karakters gevonden -->
    <p v-else>Geen karakters gevonden.</p>
  </div>
</template>

<style>
/* Optioneel: wat simpele styling voor de kaartjes */
.unit-card:hover {
  background-color: #f9f9f9;
  transform: translateY(-2px);
  transition: 0.2s;
}
</style>
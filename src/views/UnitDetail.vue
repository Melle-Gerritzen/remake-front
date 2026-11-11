<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const unitId = route.params.id

const unit = ref(null)
const loading = ref(true)

// Status voor owned en favorite
const isOwned = ref(false)
const isFavorite = ref(false)

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/characters/${unitId}`)
    const data = await response.json()
    unit.value = data

    // Laad de opgeslagen status uit localStorage (uniek per unit ID)
    isOwned.value = localStorage.getItem(`owned_${unitId}`) === 'true'
    isFavorite.value = localStorage.getItem(`favorite_${unitId}`) === 'true'
  } catch (error) {
    console.error('Fout bij het ophalen van de unit:', error)
  } finally {
    loading.value = false
  }
})//finally wordt altijd uitgevoerd — ongeacht of het ophalen is gelukt of is mislukt

// Functies om te toggelen en op te slaan
const toggleOwned = () => {
  isOwned.value = !isOwned.value
  localStorage.setItem(`owned_${unitId}`, isOwned.value)
}
//isowned.value een ! maakt hij auto ja van dus als het false is word het true
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  localStorage.setItem(`favorite_${unitId}`, isFavorite.value)
}
</script>

<template>
  <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <router-link to="/units">← Terug naar alle units</router-link>

    <!-- 1. Aan het laden -->
    <div v-if="loading" style="margin-top: 20px;">
      <p>Unit gegevens ophalen...</p>
    </div>

    <!-- 2. Data is geladen -->
    <div v-else-if="unit" style="margin-top: 20px;">

      <!-- Header met Titel, Naam, Type & Plaatje -->
      <div style="display: flex; gap: 20px; align-items: center;">
        <img :src="unit.imageURL" :alt="unit.name" style="width: 120px; height: auto;" />
        <div>
          <span style="font-size: 0.9em; color: #666;">{{ unit.title }}</span>
          <h1 style="margin: 5px 0;">{{ unit.name }}</h1>
          <p>
            <strong>Rarity:</strong> {{ unit.rarity }} |
            <strong>Type:</strong> {{ unit.type }} |
            <strong>Class:</strong> {{ unit.class }} |
            <strong>Cost:</strong> {{ unit.cost }}
          </p>
        </div>
      </div>

      <hr style="margin: 20px 0;" />

      <!-- Skills Sectie -->
      <h3>Skills & Passives</h3>
      <p><strong>Leader Skill:</strong> {{ unit.leaderSkill }}</p>
      <p><strong>Super Attack:</strong> {{ unit.superAttack }}</p>
      <p v-if="unit.ultraSuperAttack"><strong>Ultra Super Attack:</strong> {{ unit.ultraSuperAttack }}</p>
      <p><strong>Passive:</strong> {{ unit.passive }}</p>

      <hr style="margin: 20px 0;" />

      <!-- Stats Tabel (Rainbow / Max / Base) -->
      <h3>Stats</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
        <tr style="background: #f4f4f4;">
          <th>Stat</th>
          <th>Base</th>
          <th>Max Level</th>
          <th>Free Dupe</th>
          <th>Rainbow (100%)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>HP</strong></td>
          <td>{{ unit.baseHP }}</td>
          <td>{{ unit.maxLevelHP }}</td>
          <td>{{ unit.freeDupeHP }}</td>
          <td>{{ unit.rainbowHP }}</td>
        </tr>
        <tr>
          <td><strong>ATK</strong></td>
          <td>{{ unit.baseAttack }}</td>
          <td>{{ unit.maxLevelAttack }}</td>
          <td>{{ unit.freeDupeAttack }}</td>
          <td>{{ unit.rainbowAttack }}</td>
        </tr>

        <tr>
          <td><strong>DEF</strong></td>
          <td>{{ unit.baseDefence }}</td>
          <td>{{ unit.maxDefence }}</td>
          <td>{{ unit.freeDupeDefence }}</td>
          <td>{{ unit.rainbowDefence }}</td>
        </tr>
        </tbody>
      </table>
      <!-- Knoppen voor Owned & Favorite -->
      <div style="margin: 20px 0; display: flex; gap: 10px;">
        <button
            @click="toggleOwned"
            :style="{ padding: '10px 15px', backgroundColor: isOwned ? '#4CAF50' : '#ddd', color: isOwned ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }">
          {{ isOwned ? '✅ In bezit' : '➕ Toevoegen aan bezit' }}
        </button>

        <button
            @click="toggleFavorite"
            :style="{ padding: '10px 15px', backgroundColor: isFavorite ? '#ff4081' : '#ddd', color: isFavorite ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }">
          {{ isFavorite ? '❤️ Favoriet' : '🤍 Markeer als favoriet' }}
        </button>
      </div>
      <hr style="margin: 20px 0;" />

      <!-- Links & Categories (Arrays) -->
      <h3>Links</h3>
      <ul>
        <li v-for="link in unit.links" :key="link">{{ link }}</li>
      </ul>

      <h3>Categories</h3>
      <ul>
        <li v-for="category in unit.categories" :key="category">{{ category }}</li>
      </ul>

    </div>

    <!-- 3. Foutmelding als ID niet bestaat -->
    <div v-else style="margin-top: 20px;">
      <p>Kon deze unit helaas niet vinden!</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from './supabase'

const user = ref(null)
const router = useRouter()
//onmounted is een check of je bent ingelogged niet pagina blijft ja pagina vernieuwt met nieuwe data
onMounted(async () => {
  // 1. Check direct bij het laden of er al een actieve sessie is
  const { data } = await supabase.auth.getSession()
  user.value = data.session?.user || null

  // 2. Luister live naar inlog- en uitlogacties
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
})

// Uitlog-functie
const handleSignOut = async () => {
  await supabase.auth.signOut()
  user.value = null
  router.push('/login') // Stuur de gebruiker terug naar de login pagina
}
</script>

<template>
  <header>
    <nav style="display: flex; gap: 15px; align-items: center; padding: 10px; background: #f4f4f4;">
      <router-link to="/">Home</router-link>
      <router-link to="/units">Units</router-link>

      <!-- Als de gebruiker NIET is ingelogd -->
      <template v-if="!user">
        <router-link to="/login">Login</router-link>
      </template>

      <!-- Als de gebruiker WEL is ingelogd -->
      <template v-else>
        <span>Ingelogd als: <strong>{{ user.email }}</strong></span>
        <button @click="handleSignOut">Uitloggen</button>
      </template>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>


<style>
/* Globale achtergrond - Diepe donkere gaming-tint */
body {
  background-color: #121824; /* Diepe, chique donkere achtergrond */
  color: #e2e8f0;            /* Hoge leesbaarheid, zacht-witte tekst */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;         /* Hou alle teksten en blokken netjes gecentreerd */
}

/* Header en Navigatiebalk perfect passend bij de donkere stijl */
nav, header {
  background-color: #1a2234 !important;
  color: #f1f5f9 !important;
  padding: 15px 30px;
  border-bottom: 2px solid #2e3d59;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  border-radius: 0 0 12px 12px;
}

/* De links (Home, Units) */
nav a {
  color: #38bdf8 !important;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

nav a:hover {
  color: #7dd3fc !important;
  text-decoration: underline;
}

/* De ingelogd-tekst */
nav span, header span {
  color: #94a3b8 !important;
}

/* De Uitloggen knop in dezelfde stijl */
nav button, header button {
  background-color: #2e3d59 !important;
  color: #f1f5f9 !important;
  border: 1px solid #475569 !important;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

nav button:hover, header button:hover {
  background-color: #ef4444 !important; /* Maak hem subtiel rood bij hover voor uitloggen */
  border-color: #f87171 !important;
  color: #ffffff !important;
}
nav a:hover {
  color: #7dd3fc;
  text-decoration: underline;
}

/* Container & grid altijd perfect in het midden */
.units-container, div[style*="flex"] {
  justify-content: center !important;
}

/* De Character Cards met diepte, afgeronde hoeken & schaduw */
.unit-card, [style*="border: 1px solid"] {
  background-color: #1a2234 !important; /* Donkerdere kaart achtergrond */
  border: 1px solid #2e3d59 !important; /* Subtiele blauw/grijze rand */
  border-radius: 14px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35) !important; /* Zwevend effect */
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 12px;
  padding: 15px;
  text-align: center !important;
  color: #f1f5f9 !important;
}

/* Hover-animatie wanneer je over een kaartje beweegt */
.unit-card:hover, [style*="border: 1px solid"]:hover {
  transform: translateY(-6px);
  border-color: #38bdf8 !important; /* Subtiele oplichtende rand op hover */
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5), 0 0 10px rgba(56, 189, 248, 0.2) !important;
}

/* Titels en subtitels op de kaartjes */
h1, h2, h3 {
  color: #ffffff !important;
}

p, span {
  color: #94a3b8;
}

/* Detailpagina Tabellen & Blocks */
table {
  margin: 25px auto; /* Perfect gecentreerd */
  background-color: #1a2234;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  max-width: 800px;
  width: 90%;
}

th, td {
  border: 1px solid #2e3d59 !important;
  padding: 12px 18px;
  text-align: center;
  color: #e2e8f0;
}

th {
  background-color: #0f172a !important;
  color: #38bdf8;
  font-weight: bold;
}
</style>
<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const message = ref('')

// Registreren
const handleSignUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) {
    message.value = 'Fout bij registratie: ' + error.message
  } else {
    message.value = 'Registratie gelukt! Je kunt nu inloggen.'
  }
}

// Inloggen
const handleSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    message.value = 'Inloggen mislukt: ' + error.message
  } else {
    message.value = 'Succesvol ingelogd! Welkom ' + data.user.email
    // Stuur de gebruiker direct door naar de Units-pagina!
    router.push('/units')
  }
}
</script>

<template>
  <div style="padding: 20px;">
    <h2>Inloggen / Registreren</h2>

    <input v-model="email" type="email" placeholder="E-mailadres" /><br/><br/>
    <input v-model="password" type="password" placeholder="Wachtwoord" /><br/><br/>

    <button @click="handleSignIn">Inloggen</button> &nbsp;
    <button @click="handleSignUp">Account aanmaken</button>

    <p>{{ message }}</p>
  </div>
</template>

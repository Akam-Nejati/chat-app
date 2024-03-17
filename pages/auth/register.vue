<script setup lang="ts">
definePageMeta({
  name: "Register"
})

const toast = useToast()
const userName = useState<string>()
const email = useState<string>()
const password = useState<string>()
const confirmPassword = useState<string>()
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const userNameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

const emailRules = [
  (value: string) => !!value || 'Required.',
  (value: string) => (emailRegex.test(value)) || 'Email invalid',
]

const userNameRules = [
  (value: string) => !!value || 'Required.',
  (value: string) => (userNameRegex.test(value)) || 'User name must be more than 8 characters and you can include - and numbers',
]

const passwordRules = [
  (value: string) => !!value || 'Required.',
  (value: string) => (passwordRegex.test(value)) || 'Password is not safe',
]

const confirmPasswordRules = [
  (value: string) => !!value || 'Required.',
  (value: string) => (value === password.value) || 'Password is same',
]

const registerForm = useState<HTMLFormElement>()
const registerErrorMessage = useState<string>()
async function register() {
  const isFormValid = await registerForm.value.validate()

  if (!isFormValid.valid) {
    return
  }


  const { data, error } = await useCustomFetch('register', {
    method: "POST",
    body: {
      userName: userName.value,
      password: password.value,
      email: email.value
    }
  })

  if (data.value) {
    registerForm.value.reset()
    toast.success("register successfuly", {
      position: "top-right"
    })
  } else {
    toast.error(error.value?.data.message, {
      position: "top-right"
    })
  }
}
</script>

<template>
  <AuthCard>
    <v-form ref="registerForm" class="flex flex-col justify-between h-full" @submit.prevent="register()">
      <div class="mt-5 h-3/4 flex flex-col justify-between">
        <div class="flex flex-col justify-between">
          <div class="flex flex-col">
            <span class="text-3xl font-bold text-[#D0BCFF]">Welcome to soot :)</span>
          </div>
          <div class="mt-5">
            <v-text-field v-model:model-value="userName" :rules="userNameRules" label="User Name *"></v-text-field>
            <v-text-field v-model:model-value="email" :rules="emailRules" label="Emai *"></v-text-field>
            <v-text-field v-model:model-value="password" :rules="passwordRules" label="Password *"></v-text-field>
            <v-text-field v-model:model-value="confirmPassword" :rules="confirmPasswordRules"
              label="Confirm Password *"></v-text-field>
          </div>
          <div>
            <nuxt-link :to="{ name: 'Login' }" class="text-[#D0BCFF]">Login to account</nuxt-link>
          </div>
        </div>
        <div>
          <div class="mt-4">
            <clientOnly>
              <font-awesome-icon :icon="['fab', 'google']" class="text-3xl text-[#B2B1FF] p-4 border rounded" />
            </clientOnly>
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-col sm:flex-row gap-4 mb-[2rem] sm:!mb-0">
        <v-btn type="submit" text="#381E72" color="#D0BCFF" rounded="xl" size="large" class="w-full sm:w-fit">
          Register
        </v-btn>
      </div>
    </v-form>
  </AuthCard>
</template>

<style>
.v-messages__message {
  @apply !text-red-300
}

.v-field--error:not(.v-field--disabled) .v-label.v-field-label {
  @apply !text-red-300
}

.v-field--error:not(.v-field--disabled) .v-field__outline {
  @apply !text-red-300
}
</style>

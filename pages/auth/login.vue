<script setup lang="ts">
definePageMeta({
    name: "Login"
})

const email = useState<string>()
const password = useState<string>()
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const emailRules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (emailRegex.test(value)) || 'Email invalid',
]

const PasswordRules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (value && value.length >= 3) || 'Min 3 characters',
]

const loginForm = useState<HTMLFormElement>()
const showSccessAlert = useState<boolean>()
const showErrorAlert = useState<boolean>()
const loginErrorMessage = useState<string>()
async function login() {
    const { data, error } = await useCustomFetch('login', {
        method: "POST",
        body: {
            password: password.value,
            email: email.value
        }
    })

    if (data.value) {
        console.log(data.value);
        
        loginForm.value.reset()
        showSccessAlert.value = true
    } else {
        showErrorAlert.value = true
        loginErrorMessage.value = error.value?.data.message
    }
}
</script>

<template>
    <AuthCard>
        <v-form ref="loginForm" class="flex flex-col justify-between h-full" @submit.prevent="login">
            <div class="mt-5 h-3/4 flex flex-col justify-between">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                        <span class="text-3xl font-bold text-[#D0BCFF]">Welcome back !</span>
                        <small class="text-xl text-[#D0BCFF] text-opacity-50">Enter Your Email and Password</small>
                    </div>
                    <v-alert v-if="showSccessAlert" class="mt-5" type="success" title="success" color="green-lighten-1"
                        text="register successfuly"></v-alert>
                    <v-alert v-if="showErrorAlert" class="mt-5" type="error" title="Error" color="red-lighten-1"
                        :text="loginErrorMessage"></v-alert>
                    <div class="mt-5">
                        <v-text-field v-model:model-value="email" :rules="emailRules" label="Emai *"></v-text-field>
                        <v-text-field v-model:model-value="password" :rules="PasswordRules"
                            label="Password *"></v-text-field>
                    </div>
                    <div>
                        <nuxt-link :to="{ name: 'Register' }" class="text-[#D0BCFF]">I dont have account</nuxt-link>
                    </div>
                </div>
                <div>
                    <div class="mt-4">
                        <clientOnly>
                            <font-awesome-icon :icon="['fab', 'google']"
                                class="text-3xl text-[#B2B1FF] p-4 border rounded" />
                        </clientOnly>
                    </div>
                </div>
            </div>
            <div class="mt-5 flex flex-col sm:flex-row gap-4 mb-[2rem] sm:!mb-0">
                <v-btn type="submit" text="#381E72" color="#D0BCFF" rounded="xl" size="large" class="w-full sm:w-fit">
                    Login
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
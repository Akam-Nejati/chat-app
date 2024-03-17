<script setup lang="ts">
definePageMeta({
    name: "Login"
})

const toast = useToast()
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
const loginErrorMessage = useState<string>()


interface LoginResponse {
    message: string,
    token: string
}
async function login() {
    const isFormValid = await loginForm.value.validate()
    console.log(await loginForm.value.validate().valid);


    if (!isFormValid.valid) {
        console.log("form is returned");

        return
    }

    const { data, error } = await useCustomFetch<LoginResponse>('login', {
        method: "POST",
        body: {
            password: password.value,
            email: email.value
        }
    })

    if (data.value) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const token = useCookie('token', { expires: nextMonth })
        token.value = data.value.token
        loginForm.value.reset()
        toast.success('Login successfuly', {
            position: "top-right"
        })
        loginErrorMessage.value = ""
    } else {
        toast.error(error.value?.data.message, {
            position: "top-right"
        })
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
                    <div class="mt-5">
                        <v-text-field v-model:model-value="email" :rules="emailRules" label="Emai *"></v-text-field>
                        <v-text-field v-model:model-value="password" :rules="PasswordRules"
                            label="Password *"></v-text-field>
                    </div>
                    <div class="grid gap-2">
                        <RouterLink :to="{ name: 'Register' }" class="text-[#D0BCFF]">I dont have account</RouterLink>
                        <RouterLink :to="{ name: 'Reset Password' }" class="text-[#D0BCFF]">Fotgot Password</RouterLink>
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
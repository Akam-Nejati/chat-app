<script setup lang="ts">
import { useToast } from 'vue-toast-notification';


definePageMeta({
    name: "change password",
    middleware: "checktoken"
})

const toast = useToast()
const password = useState<string>()
const confirmPassword = useState<string>()
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const passwordRules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (passwordRegex.test(value)) || 'Password is not safe',
]

const confirmPasswordRules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (value === password.value) || 'Password is same',
]

const userIdStore = useUserId()
const { userId } = toRefs(userIdStore)
const changePasswordForm = useState<HTMLFormElement>()
async function changePassword() {
    const isFormValidate = await changePasswordForm.value.validate()
    if (!isFormValidate.valid) {
        return
    }

    const { data, error } = await useCustomFetch<{ message: string }>("changepassword", {
        method: "POST",
        body: {
            password: password.value,
            userId: userId.value
        }
    })
    if (data.value) {
        toast.success(data.value.message, {
            position: "top-right"
        })
        navigateTo("/auth/login")
    } else if (error.value) {
        toast.error(error.value.message, {
            position: "top-right"
        })
    }
}
</script>

<template>
    <AuthCard>
        <v-form ref="changePasswordForm" class="flex flex-col justify-between h-full" @submit.prevent="changePassword">
            <div class="mt-6">
                <v-text-field v-model="password" :rules="passwordRules" label="Password *"></v-text-field>
                <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules"
                    label="Confirm password *"></v-text-field>
            </div>
            <v-btn type="submit" text="#381E72" color="#D0BCFF" rounded="xl" size="large" class="w-full sm:w-fit mt-4">
                change password
            </v-btn>
        </v-form>
    </AuthCard>
</template>

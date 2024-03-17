<script setup lang="ts">
import { useToast } from 'vue-toast-notification';


definePageMeta({
    name: "Reset Password"
})

const toast = useToast()
const resetPasswordForm = useState<HTMLFormElement>()
const email = useState<string>();
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const emailRules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (emailRegex.test(value)) || 'Email invalid',
];

async function sendEmail() {
    const isFormValid = await resetPasswordForm.value.validate()

    if (isFormValid.valid) {
        const { data, error } = await useCustomFetch<{ message: string }>('resetPassword', {
            method: "POST",
            params: {
                email: email
            }
        })
        if (data.value) {
            toast.success(data.value.message, {
                position: "top-right"
            })
        } else if (error.value) {
            toast.error(error.value.message, {
                position: "top-right"
            })
        }
    }
}

</script>

<template>
    <AuthCard>
        <v-form ref="resetPasswordForm" class="flex flex-col justify-between h-full" @submit.prevent="sendEmail">
            <div class="mt-6">
                <v-text-field v-model="email" :rules="emailRules" label="Email *"></v-text-field>
            </div>
            <v-btn type="submit" text="#381E72" color="#D0BCFF" rounded="xl" size="large" class="w-full sm:w-fit mt-4">
                send email
            </v-btn>
        </v-form>
    </AuthCard>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const { errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
        }),
    ),
});

const [email] = defineField('email');
const [password] = defineField('password');
</script>

<template>
    <input v-model="email" />{{ email }}
    <div>{{ errors.email }}</div>

    <input v-model="password" />
    <div>{{ errors.password }}</div>
</template>
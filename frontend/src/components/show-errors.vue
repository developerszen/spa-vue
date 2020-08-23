<template lang="pug">
    v-alert(type="error")
        ul
            li.body-2(v-for="(error, index) in errors" :key="index")
                span(v-for="(message, index) in error" :key="index")
                    | {{ message }}
</template>

<script lang="ts">
    export default {
        props: {
            errors: {
                required: true,
            }
        }
    }
</script>

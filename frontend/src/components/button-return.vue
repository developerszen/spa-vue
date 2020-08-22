<template lang="pug">
    v-btn(@click="toReturn()" depressed) {{ $t('general.return') }}
</template>

<script lang="ts">
    export default {
        methods: {
            toReturn() {
                this.$router.back();
            },
        },
    }
</script>

<template lang="pug">
    v-row.mt-3
        v-col.primary.text-center.rounded-lg(cols="12")
            div.mb-2.white--text {{ $t('general.loader') }}
            v-progress-circular(color="secondary" indeterminate)
</template>

<script lang="ts">
    export default {
    }
</script>

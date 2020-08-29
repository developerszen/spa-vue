<template lang="pug">
    validation-observer(v-slot="{ invalid }")
        v-row
            //- Name
            v-col.py-0(cols="12")
                validation-provider(
                    :name="$t('admin.author.fields.name')"
                    :rules="'required|max:80|alpha_custom'"
                    v-slot="{ errors }"
                )
                    v-text-field(
                        v-model="payload.name"
                        counter="80"
                        prepend-icon="fas fa-pen-nib"
                        :label="`${$t('admin.author.fields.name')}*`"
                        :error-messages="errors"
                        dense outlined dark
                    )
            //- Actions
            v-col.py-0.text-center(cols="12")
                v-btn(
                    color="secondary"
                    :loading="loading"
                    :disabled="invalid || loading"
                    @click="save()"
                ) {{ $t(edit ? 'general.update' : 'general.store') }}

                button-return.ml-2
</template>

<script lang="ts">
    export default {
        props: {
            payload: {
                type: Object,
                required: true,
            },
            loading: {
                type: Boolean,
                required: true,
            },
            edit: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            save() {
                this.$emit("save");
            }
        }
    }
</script>

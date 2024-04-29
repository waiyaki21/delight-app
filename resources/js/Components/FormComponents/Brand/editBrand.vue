<template>
    <form @submit.prevent="submit">
        <flash ref="childComponentRef"></flash>
        <div class="row my-2">
            <!-- name -->
            <div class="col-md-12">
                <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Brand Name <i
                        :class="[formInfo.iconreloadclass]"></i></label>
                <label for="name" v-else :class="[formInfo.labelclass]">Brand Name <i v-if="formsuccess"
                        :class="[formInfo.iconreloadclass]"></i></label>
                <input type="text" id="name" name="name" v-model="brand.name" :class="[formInfo.inputclass]"
                    :placeholder="'Edit ' + brand.name" required>
                <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]"><b>{{
                    errors.name[0] }}</b></p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">
                    <b>Success</b>
                </p>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="block w-full flex items-center py-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button type="button" :class="['title', formInfo.bluebtnClass]" @click="submit">
                {{ formInfo.buttoninfo }}
                <i :class="['mx-2', formInfo.buttoninfoIcon]"></i>
            </button>
        </div>
    </form>
</template>

<script>
    import utilities    from '../utilities.js';
    import flash        from '../../AlertComponents/flash-simple.vue';

    export default {
        props: [
            'brand'
        ],

        data() {
            return {
                fields: {},
                errors: {},
                flashMessage: "",

                // form settings
                //classess
                formInfo: [],
                id: ''
            }
        },

        components: {
            flash
        },

        created() {
            this.formFields();
        },

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

        methods: {
            submit() {
                // submit the fields first
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.put('/brand/edit/' + this.$props.brand.id, this.fields)
                    .then(response => {
                        this.flashEditor();
                        this.$refs.childComponentRef.flash([this.flashMessage, 'alert-success']);
                        this.$emit('updated', this.flashMessage);
                        this.fields = {};
                        this.formFields();
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 1000);
                    })
                // .catch(error => {
                //     this.errors = error.response.data.errors || {};
                //     this.formInfo = utilities.failed(this);
                // });
            },

            formFields() {
                this.fields.name = this.brand.name;
                this.errors = {};
            },

            flashEditor() {
                return this.flashMessage = 'The Brand has been Editted!';
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },
        }
    }	
</script>
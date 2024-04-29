<template>
    <form @submit.prevent="submit">
        <flash ref="childComponentRef"></flash>
        <div class="row my-2">
            <!-- name -->
            <div class="col-md-12">
                <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Catergory Name <i
                        :class="[formInfo.iconreloadclass]"></i></label>
                <label for="name" v-else :class="[formInfo.labelclass]">Catergory Name <i v-if="formsuccess"
                        :class="[formInfo.iconreloadclass]"></i></label>
                <input type="text" id="name" name="name" v-model="fields.name" :class="[formInfo.inputclass]"
                    placeholder="Enter Catergory Name" required="true">
                <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]">{{ errors.name[0]
                }}</p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success
                </p>
            </div>

            <!-- banner file -->
            <div class="col-md-12 pt-2">
                <label for="banner" v-if="errors && errors.banner" :class="[formInfo.labelErrorclass]">
                    Upload Catergory Banner File 
                    <i :class="[formInfo.iconreloadclass]"></i>
                </label>
                <label for="banner" v-else :class="[formInfo.labelclass]">
                    Upload Banner File 
                    <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i>
                </label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="banner" name="banner" type="file" ref="banner" @change="onChangebanner" required>
                <p id="helper-text-explanation" v-if="errors && errors.banner" :class="[formInfo.infoText]">{{
                    errors.banner[0] }}</p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success
                </p>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="w-full flex items-center py-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button type="button" :class="['title', formInfo.bluebtnClass]" @click="submit">
                {{ formInfo.buttoninfo }}
                <i :class="['mx-2', formInfo.buttoninfoIcon]"></i>
            </button>
        </div>
    </form>
</template>

<script>
    // export test 
    import utilities from '../utilities.js';
    import flash from '../../AlertComponents/flash-simple.vue';

    export default {
        data() {
            return {
                fields: {},
                errors: {},
                flashMessage: "The Catergory has been added",

                // form settings
                //classess
                formInfo: [],
                banner_file: '',
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
                axios.post('/catergory/add', this.fields)
                    .then(response => {
                        let info = response.data[2];
                        this.submitBanner([response.data[3], this.$refs.childComponentRef, this.$emit, info]);
                        this.flashEditor();
                        this.formFields();
                        setTimeout(this.reload, 1500);
                    })
                    .catch(error => {
                        this.errors     = error.response.data.errors;
                        this.formInfo   = utilities.failed(this);
                    });
            },

            // on banner change 
            onChangebanner(event) {
                this.fileSelected = event.target.files.length;
                this.banner_file = this.$refs.banner.files;
                // this.disabledBtn = "";
                // this.disabled = false;
                // console.log('Uploaded banner', this.banner_file, this.$refs.banner.files[0]);
            },

            // submit product banner
            submitBanner([id, alert, emit, info]) {
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                let file = this.$refs.banner.files[0];

                // get file name
                let fileName = file.name;
                // get file size
                let fileSize = Number(file.size / 1000000).toFixed(2);
                let fileData = file;
                let data = new FormData();
                data
                    .append('banner', fileData);
                axios
                    .post('/catergory/banner/add/' + id, data, config)
                    .then(function (res) {
                        let message = 'banner: ' + fileName + ' ( ' + fileSize + ' MB ) has been uploaded Successfully!';
                        alert.flash([message, 'bg-green-100 dark:bg-green-900']);
                        let flash = 'The New Catergory has been Created!';
                        emit('created', flash, info);
                    })
                    .catch(function (err) {
                        let message = fileName + ' ( ' + fileSize + ' MB ) File Upload Failure!';
                        alert.flash([message, 'bg-red-100 dark:bg-red-900']);
                        existingObj.output = err;
                    });
            },

            formFields() {
                this.fields.name = "";
                this.fields.banner = "";
                this.errors = {};
            },

            flashEditor() {
                return this.flashMessage = 'The New Catergory has been Created!';
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },
        }
    }	
</script>
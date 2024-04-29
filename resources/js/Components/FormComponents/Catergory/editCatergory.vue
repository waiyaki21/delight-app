<template>
    <form @submit.prevent="submit">
        <flash ref="childComponentRef"></flash>
        <div class="row my-1">
            <!-- name -->
            <div class="col-md-12" v-if="banner">
                <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Catergory Name <i
                        :class="[formInfo.iconreloadclass]"></i></label>
                <label for="name" v-else :class="[formInfo.labelclass]">Catergory Name <i v-if="formsuccess"
                        :class="[formInfo.iconreloadclass]"></i></label>
                <input type="text" id="name" name="name" v-model="this.fields.name" :class="[formInfo.inputclass]"
                    :placeholder="'Edit ' + this.catergory.name" required>
                <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]"><b>{{
                    errors.name[0] }}</b></p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">
                    <b>Success</b></p>
            </div>

            <!-- banner file -->
            <div class="col-md-12 pt-1" v-else>
                <label for="banner" v-if="errors && errors.banner" :class="[formInfo.labelErrorclass]">Upload Catergory
                    Banner File <i :class="[formInfo.iconreloadclass]"></i></label>
                <label for="banner" v-else :class="[formInfo.labelclass]">Upload Catergory Banner File <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="banner" name="banner" type="file" ref="banner" :placeholder="this.fields.banner_name" @change="onChangebanner">
                <p id="helper-text-explanation" v-if="errors && errors.banner" :class="[formInfo.infoText]">{{
                    errors.banner[0] }}</p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success
                </p>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="block w-full flex items-center py-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button type="button" :class="['title', formInfo.bluebtnClass]" v-if="!banner" @click="submitBanner([this.$props.catergory.id, this.$refs.childComponentRef, this.success])">
                {{ formInfo.buttoninfo }} Banner
                <i :class="['mx-2', formInfo.buttoninfoIcon]"></i>
            </button>
            <button type="button" :class="['title', formInfo.bluebtnClass]" v-else @click="submit">
                {{ formInfo.buttoninfo }}
                <i :class="['mx-2', formInfo.buttoninfoIcon]"></i>
            </button>
        </div>
    </form>
</template>

<script>
    import utilities from '../utilities.js';
    import flash from '../../AlertComponents/flash-simple.vue';

    export default {
        props: [
            'catergory',
            'banner'
        ],

        data() {
            return {
                fields: {},
                errors: {},
                flashMessage: "",

                // form settings
                formInfo: [],
                banner_file: '',
                id: ''
            }
        },

        components: {
            flash
        },

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

        created() {
            this.formFields();
        },

        methods: {
            submit() {
                console.log(this.$props.catergory.id);
                // submit the fields first
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.put('/catergory/edit/' + this.$props.catergory.id, this.fields)
                    .then(response => {
                        // banner options 
                        if(this.$props.banner == true) {
                            this.submitBanner([response.data[2], this.$refs.childComponentRef]);
                        }
                        // all options 
                        this.success(response.data[3]);
                    })
                // .catch(error => {
                //     this.errors = error.response.data.errors || {};
                //     this.formInfo = utilities.failed(this);
                // });
            },

            // on banner change 
            onChangebanner(event) {
                this.fileSelected   = event.target.files.length;
                this.banner_file    = this.$refs.banner.files;
                // this.disabledBtn = "";
                // this.disabled = false;
                console.log('Uploaded banner', this.banner_file);
            },

            // submit product banner
            submitBanner([id, show, success]) {
                if (this.banner_file == '') {
                    let message = 'Select a catergory banner, this is a high quality picture that can be displayed on the homepage!';
                    show.flash([message, 'bg-green-100 dark:bg-green-900']);
                } else {
                    this.formInfo   = utilities.loading(this);
                    let existingObj = this;
                    const config    = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }

                    Array.prototype.forEach.call(this.$refs.banner.files, function (file) {
                        // get file name
                        let fileName = file.name;
                        // get file size
                        let fileSize = Number(file.size / 1000000).toFixed(2);
                        let fileData = file;
                        let data = new FormData();
                        data
                            .append('banner', fileData);
                        axios
                            .post('/catergory/banner/edit/' + id, data, config)
                            .then(function (res) {
                                let message = 'banner: ' + fileName + ' ( ' + fileSize + ' MB ) has been uploaded Successfully!';
                                show.flash([message, 'bg-green-100 dark:bg-green-900']);
                                success(res.data[3]);
                                // setTimeout(load, 10000);
                            })
                            .catch(function (err) {
                                let message = fileName + ' ( ' + fileSize + ' MB ) File Upload Failure!';
                                alert.flash([message, 'bg-red-100 dark:bg-red-900']);
                                existingObj.output = err;
                            });
                    });
                }
            },

            formFields() {
                this.fields.name    = this.catergory.name;
                this.fields.banner  = this.catergory.banner_name;
                this.errors = {};
            },

            flashEditor() {
                return this.flashMessage = 'The Catergory has been Editted!';
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },

            success(res) {
                // all options 
                this.flashEditor();
                this.$refs.childComponentRef.flash([this.flashMessage, 'alert-success']);
                this.$emit('updated', this.flashMessage);
                this.fields.name        = res.name;
                this.fields.banner_name = res.banner_name;
                this.formInfo           = utilities.success(this);
                setTimeout(this.reload, 500);
            }
        }
    }	
</script>
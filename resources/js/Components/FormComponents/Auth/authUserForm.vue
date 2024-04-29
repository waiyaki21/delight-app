<template>
    <div class="container">
        <div class="dark:border-gray-700 dark:bg-gray-700">
            <div class="dark:bg-gray-700">
                <flash 
                    ref="childComponentRef"
                ></flash>
                <!-- <ul class="flex flex-wrap -mb-px text-sm font-medium text-center dark:bg-gray-700" id="myTab" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', , 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.loginBtn]" id="login-tab" data-tabs-target="#login" type="button" aria-controls="login" @click="showLoginDetails">Login.</button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.signUpBtn]" data-tooltip-target="signUpDetailsTooltip" type="button" @click="showSignUpDetails">
                            Sign In.
                        </button>
                        <div id="signUpDetailsTooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-800">
                            Click to create an account
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </li>
                </ul> -->
            </div>
            <div id="authUser" :key="formKey">
                <!-- login panel -->
                <div v-show="loginDetails" class="p-4 bg-white dark:bg-gray-700">
                    <form @submit.prevent="submit">
                        <div class="row">
                            <!-- user email  -->
                            <div class="col-md-6 mt-2">
                                <label for="email" v-if="errors && errors.email" :class="[this.labelErrorclass]">Enter Email <i :class="[this.iconreloadclass]"></i></label>
                                <label for="email" v-else :class="[this.labelclass]">Enter Email <i v-if="formsuccess" :class="[this.iconreloadclass]"></i></label>
                                <input type="email" id="email" name="email" v-model="fields.email" :class="[this.inputclass]" placeholder="Enter Email" required>
                                <p id="helper-text-explanation" v-if="errors && errors.email" :class="[this.infoText]">{{ errors.email[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[this.infoText, 'text-success']">Success</p>
                            </div>

                            <!-- password  -->
                            <div class="col-md-6 mt-2">
                                <label for="password" v-if="errors && errors.password" :class="[this.labelErrorclass]">Enter Password <i :class="[this.iconreloadclass]"></i></label>
                                <label for="password" v-else :class="[this.labelclass]">Enter Password <i v-if="formsuccess" :class="[this.iconreloadclass]"></i></label>
                                <input type="password" id="password" name="password" v-model="fields.password" :class="[this.inputclass]" placeholder="Enter Password" required>
                                <p id="helper-text-explanation" v-if="errors && errors.password" :class="[this.infoText]">{{ errors.password[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[this.infoText, 'text-success']">Success</p>
                            </div>

                            <!-- remember me  -->
                            <div class="col-md-12 mt-2 inline-flex">
                                <input id="remember" name="remember" v-model="fields.remember" class="w-4.92 h-4.92 ease-soft -ml-6.92 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['fas fa-check'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" value="" checked />
                                <label class="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" for="remember">
                                    <a href="javascript:;" class="text-slate-700">Remember Me?</a>
                                </label>
                            </div>

                            <!-- buttons -->
                            <div class="col-md-6 mt-2">
                                <button type="submit" :class="['uppercase', this.bluebtnClass]" @click="loginUser">
                                    Login
                                </button>
                            </div>
                            <div class="col-md-6 mt-2">
                                <a href="/register" :class="['uppercase', this.bluebtnClass]">
                                    Dont Have An Account?
                                </a>
                            </div>
                        </div>      
                    </form>
                </div>
                <!-- sign up panel -->
                <div v-show="signUpDetails" class="p-4 bg-white dark:bg-gray-700">
                </div>           
            </div>
        </div>
    </div>
</template>

<script>
    import flash            from '../../AlertComponents/flash-simple.vue';

	export default{
		props:[
		],

        components: {
            flash,
        },

		data() {
			return {
				// tabs settings
                formKey: true,
				loginDetails: true,
				signUpDetails: false,
				loginBtn: "",
				signUpBtn: "",
                disabledBtn: "cursor-not-allowed",
                bluebtnClass: "w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow",
                disabled: true,
                infoText: "mt-2 text-sm text-gray-500 dark:text-gray-400",

					// form settings
				//classess
                labelErrorclass: "",
				labelclass: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",
				iconreloadclass: '',
                inputclass: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                buttoninfo: 'Finish',
                buttoninfoIcon: 'fas fa-paper-plane fa-1x',

				//form
				fields: {},
                errors: {},

                // form submission
                formsuccess: false,
                flashMessage: "",
			}
		},

		created() {
			this.showLoginDetails();
			this.formFields();
		},

		methods: {
            // login user
            loginUser() {
                // submit the fields first
                this.errors = {};
                this.isloading();
                axios.post('/loginJS', this.fields)
                    .then(response => {
                        this.fields = {};
                        this.formFields();
                        this.loadcomplete();
                        let message = 'Logged in Successfully!';
                        this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900']);
                        this.$emit('reloadUser');
                        this.formKey += 1;
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                        this.formfailure();
                    });
            }, 

            // register user
            registerUser() {
                // submit the fields first
                this.errors = {};
                this.isloading();
                axios.post('/loginModal', this.fieldsRegister)
                    .then(response => {
                        console.log(response);
                        this.getProduct();
                        this.fieldsRegister = {};
                        this.formFields();
                        let message = 'Logged in Successfully!';
                        this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900']);
                        this.loadcomplete();
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formfailure();
                        this.errorsRegister = error.response.data.errors || {};
                        alert('Please fill in all the inputs!');
                    }
                });
            }, 

            // get form fields
            formFields() {
                this.fields.email               = "";
                this.fields.password            = "";
                this.fields.remember            = "";
            },

			// tabs controls settings
			showLoginDetails() {
				this.loginDetails = true;
				this.signUpDetails = false;
				this.paymentDetails = false;
				this.loginBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.signUpBtn = "";
			},

			showSignUpDetails() {
				this.loginDetails = false;
				this.signUpDetails = true;
				this.paymentDetails = false;
				this.signUpBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.loginBtn = "";
			},

            isloading() {
                this.labelclass = 'block mb-2 text-sm font-medium text-teal-500 uppercase title underline';
                this.buttoninfo = 'Loading';
                this.buttoninfoIcon = 'fas fa-spinner fa-spin fa-15x';
                this.bluebtnClass = 'w-full block text-center uppercase text-white bg-teal-700 border border-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow';
                this.infoText = "mt-2 text-sm text-teal-500 uppercase";
                this.iconreloadclass = 'fas fa-spinner fa-spin';
                this.inputclass = 'border text-teal-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-teal-600 dark:placeholder-teal-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-warning-alt';
            },

            loadcomplete() {
                this.labelclass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400  text-success uppercase title underline';
                this.formsuccess = true;
                this.buttoninfo = 'Success';
                this.buttoninfoIcon = 'fas fa-check fa-1x';
                this.bluebtnClass = 'w-full block focus:outline-none text-white bg-green-800 hover:bg-green-800  font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 uppercase';
                this.iconreloadclass = 'fas fa-check';
                this.infoText = "mt-2 text-sm text-success uppercase";
                this.inputclass = 'border text-success text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-success dark:focus:ring-green-500 dark:focus:border-green-500 form-success';
                setTimeout(this.resetformclasses, 10000);
            },

            resetformclasses() {
                this.labelclass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400  uppercase title underline';
                this.formsuccess = false;
                this.buttoninfo = 'Finish';
                this.buttoninfoIcon = 'fas fa-paper-plane fa-1x';
                this.bluebtnClass = 'w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow';
                this.infoText = "mt-2 text-sm text-gray-900 uppercase";
                this.iconreloadclass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
                this.inputclass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
            },

            formfailure() {
                this.labelErrorclass = 'block mb-2 text-sm font-medium text-danger uppercase title underline';
                this.buttoninfo = 'Resubmit';
                this.buttoninfoIcon = 'fas fa-times fa-1x';
                this.bluebtnClass = 'w-full block text-center uppercase text-white bg-red-700 border border-red-300 hover:bg-red-800 hover:text-white font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700 cursor-pointer shadow hover:shadow-md';
                this.iconreloadclass = 'fas fa-times';
                this.inputclass = 'border text-danger text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 placeholder-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 form-danger';
                this.infoText = "mt-2 text-sm text-danger uppercase";
            },
		}
	}
</script>
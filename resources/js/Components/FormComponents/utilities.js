export default{
    loaded: function(app){
        this.formInfo = [
            {  
                headerClass:    'text-lg text-gray-900 dark:text-white underline title uppercase text-center', 
                disabledBtn:    "cursor-not-allowed",
                bluebtnClass:   "w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow",
                disabled:       true,
                infoText:       "mt-2 text-base text-gray-500 dark:text-gray-400",
                labelErrorclass:"",
				labelclass:     "block mb-2 text-base font-normal text-gray-900 dark:text-gray-400 uppercase",
				iconreloadclass:'',
                inputclass:     "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                inputUpload:    "block w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                buttoninfo:     'Submit',
                buttoninfoIcon: 'fas fa-paper-plane fa-1x',
                svgSize: 'w-5 h-5 md:w-6 md:h-6',
                svgIcon: '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6"><path stroke-linecap="round" stroke-linejoin="round"d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>'
            },
        ]
        return this.formInfo[0];
    },

    loading: function(app){
        this.formInfo = [
            {
                headerClass:    'text-lg text-teal-900 dark:text-white underline title uppercase text-center',   
                labelclass : 'block mb-2 text-base font-normal text-teal-500 uppercase underline',
                buttoninfo : 'Loading',
                buttoninfoIcon : 'fas fa-spinner fa-spin fa-15x',
                bluebtnClass : 'w-full block text-center uppercase text-white bg-teal-700 border border-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow',
                infoText : "mt-2 text-base text-teal-500 uppercase",
                iconreloadclass : 'fas fa-spinner fa-spin',
                inputclass : 'border text-teal-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-teal-600 dark:placeholder-teal-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-warning-alt',
                inputUpload:    "block w-full text-base text-teal-900 border border-teal-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-teal-400",
                svgSize: 'w-5 h-5 md:w-6 md:h-6',
                svgIcon: '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6 animate-spin"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>',
            },
        ]
        return this.formInfo[0];
    },

    failed: function(app){
        this.formInfo = [
            {  
                headerClass:    'text-lg text-red-600 dark:text-white underline title uppercase text-center', 
                labelErrorclass: 'block mb-2 text-base font-normal text-red-900 dark:text-red-400 uppercase',
                buttoninfo : 'Resubmit',
                buttoninfoIcon : 'fas fa-times fa-1x',
                bluebtnClass : 'w-full block text-center uppercase text-white bg-red-700 border border-red-300 hover:bg-red-800 hover:text-white font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700 cursor-pointer shadow hover:shadow-md',
                iconreloadclass : 'fas fa-times',
                inputclass : 'border text-red-700 text-base rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 placeholder-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 form-danger',
                inputUpload:    "block text-red-700 w-full text-base text-red-900 border border-red-500 rounded-lg cursor-pointer bg-red-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-red-400",
                infoText : "mt-2 text-base text-red-700 uppercase",
                svgSize: 'w-5 h-5 md:w-6 md:h-6',
                svgIcon: '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"class="w-5 h-5 md:w-6 md:h-6"><path stroke-linecap="round" stroke-linejoin="round"d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>',
            },
        ]
        return this.formInfo[0];
    },

    success: function(app){
        this.formInfo = [
            { 
                headerClass:    'text-lg text-green-700 dark:text-white underline title uppercase text-center',  
                labelclass : 'block mb-2 text-base font-normal text-green-700 uppercase underline',
                formsuccess : true,
                buttoninfo : 'Success',
                buttoninfoIcon : 'fas fa-check fa-1x',
                bluebtnClass : 'w-full block focus:outline-none text-white bg-green-800 hover:bg-green-800  font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 uppercase',
                iconreloadclass : 'fas fa-check',
                infoText : 'mt-2 text-base text-green-700 uppercase',
                inputclass : 'border text-green-700 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-green-700 dark:focus:ring-green-500 dark:focus:border-green-500 form-success',
                inputUpload:    "block text-green-700 w-full text-base text-green-900 border border-green-500 rounded-lg cursor-pointer bg-green-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-green-400",
            },
        ]
        return this.formInfo[0];
    },

    delete: function (app) {
        this.formInfo = [
            {
                headerClass: 'text-lg text-red-600 dark:text-white underline title uppercase text-center',
                labelErrorclass: 'block mb-2 text-base font-normal text-red-700 uppercase title underline',
                // buttoninfo: 'Delete',
                buttoninfoIcon: 'fas fa-times fa-1x',
                bluebtnClass: 'w-full block text-center uppercase text-white bg-red-700 border border-red-300 hover:bg-red-800 hover:text-white font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700 cursor-pointer shadow hover:shadow-md',
                iconreloadclass: 'fas fa-times',
                inputclass: 'border text-red-700 text-base rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 placeholder-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 form-danger',
                inputUpload: "block text-red-700 w-full text-base text-red-900 border border-red-500 rounded-lg cursor-pointer bg-red-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-red-400",
                infoText: "mt-2 text-base text-red-700 uppercase",
                svgSize: 'w-5 h-5 md:w-6 md:h-6',
                svgIcon: '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"class="w-5 h-5 md:w-6 md:h-6"><path stroke-linecap="round" stroke-linejoin="round"d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>',
            },
        ]
        return this.formInfo[0];
    },
}
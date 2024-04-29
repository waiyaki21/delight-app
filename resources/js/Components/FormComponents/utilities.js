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
            },
        ]
        return this.formInfo[0];
    },

    failed: function(app){
        this.formInfo = [
            {  
                headerClass:    'text-lg text-red-600 dark:text-white underline title uppercase text-center', 
                labelErrorclass : 'block mb-2 text-base font-normal text-danger uppercase title underline',
                buttoninfo : 'Resubmit',
                buttoninfoIcon : 'fas fa-times fa-1x',
                bluebtnClass : 'w-full block text-center uppercase text-white bg-red-700 border border-red-300 hover:bg-red-800 hover:text-white font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700 cursor-pointer shadow hover:shadow-md',
                iconreloadclass : 'fas fa-times',
                inputclass : 'border text-danger text-base rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 placeholder-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 form-danger',
                inputUpload:    "block text-danger w-full text-base text-red-900 border border-red-500 rounded-lg cursor-pointer bg-red-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-red-400",
                infoText : "mt-2 text-base text-danger uppercase"
            },
        ]
        return this.formInfo[0];
    },

    success: function(app){
        this.formInfo = [
            { 
                headerClass:    'text-lg text-success dark:text-white underline title uppercase text-center',  
                labelclass : 'block mb-2 text-base font-normal text-gray-900 dark:text-gray-400  text-success uppercase underline',
                formsuccess : true,
                buttoninfo : 'Success',
                buttoninfoIcon : 'fas fa-check fa-1x',
                bluebtnClass : 'w-full block focus:outline-none text-white bg-green-800 hover:bg-green-800  font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 uppercase',
                iconreloadclass : 'fas fa-check',
                infoText : 'mt-2 text-base text-success uppercase',
                inputclass : 'border text-success text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-success dark:focus:ring-green-500 dark:focus:border-green-500 form-success',
                inputUpload:    "block text-success w-full text-base text-green-900 border border-green-500 rounded-lg cursor-pointer bg-green-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-green-400",
            },
        ]
        return this.formInfo[0];
    },

    delete: function (app) {
        this.formInfo = [
            {
                headerClass: 'text-lg text-red-600 dark:text-white underline title uppercase text-center',
                labelErrorclass: 'block mb-2 text-base font-normal text-danger uppercase title underline',
                // buttoninfo: 'Delete',
                buttoninfoIcon: 'fas fa-times fa-1x',
                bluebtnClass: 'w-full block text-center uppercase text-white bg-red-700 border border-red-300 hover:bg-red-800 hover:text-white font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700 cursor-pointer shadow hover:shadow-md',
                iconreloadclass: 'fas fa-times',
                inputclass: 'border text-danger text-base rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 placeholder-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 form-danger',
                inputUpload: "block text-danger w-full text-base text-red-900 border border-red-500 rounded-lg cursor-pointer bg-red-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-red-400",
                infoText: "mt-2 text-base text-danger uppercase"
            },
        ]
        return this.formInfo[0];
    },
}
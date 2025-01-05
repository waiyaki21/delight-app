// src/mixins/globalMixin.js

// utilities 
// import utilities        from '../Utilities/utilities.js';
// import modalUtilities   from '../Utilities/modal.js';

// flash 
// import  toast           from "../Components/AlertComponents/toast-simple.vue";

export default {
    methods: {
        generateTooltip(action, name) {
            let tooltip;
            if (name) {
                tooltip = `${action} ${name}`;
            } else {
                tooltip = `${action}`
            }
            return {
                content: tooltip,
                placement: 'bottom',
                trigger: 'hover',
                distance: '10',
                skidding: '0',
                popperClass: 'v-popper__theme-main animate__animated animate__fadeIn',
            };
        },

        generateTooltipNav(action, name) {
            let tooltip;
            if (name) {
                tooltip = `${action} ${name}`;
            } else {
                tooltip = `${action}`
            }
            return {
                content: tooltip,
                placement: 'right',
                trigger: 'hover',
                distance: '10',
                skidding: '0',
                popperClass: 'v-popper__theme-main animate__animated animate__fadeIn',
            };
        },

        linkClick(link) {
            const url = link;
            window.location.href = url;
        },

        routerClick(link) {
            const url = link;
            this.$router.push(url);
        },
        
        // successToggle() {
        //     // this.formFields();
        //     this.modalInfo  = modalUtilities.success(this);
        //     this.formInfo   = utilities.success(this);
        //     setTimeout(this.normalToggle, 5000);

        //     return [ this.modalInfo, this.formInfo ];
        // },

        // loadingToggle() {
        //     this.modalInfo  = modalUtilities.loading(this);
        //     this.formInfo   = utilities.loading(this);

        //     return [this.modalInfo, this.formInfo]
        // },

        // failureToggle() {
        //     this.formInfo   = utilities.failed(this);
        //     this.modalInfo  = modalUtilities.failed(this);

        //     return [ this.modalInfo, this.formInfo ]
        // },

        // normalToggle() {
        //     this.modalInfo  = modalUtilities.loaded(this);
        //     this.formInfo   = utilities.loaded(this);

        //     return [ this.modalInfo, this.formInfo ]
        // },

        // deleteToggle() {
        //     this.formInfo   = utilities.failed(this);
        //     this.modalInfo  = modalUtilities.delete(this);

        //     return [ this.modalInfo, this.formInfo ]
        // },
    },
};

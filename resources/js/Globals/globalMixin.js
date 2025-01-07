// src/mixins/globalMixin.js

// utilities 
// import utilities        from '../Utilities/utilities.js';
// import modalUtilities   from '../Utilities/modal.js';

// flash 
// import  toast           from "../Components/AlertComponents/toast-simple.vue";

// export default {
//     methods: {
//         generateTooltip(action, name) {
//             let tooltip;
//             if (name) {
//                 tooltip = `${action} ${name}`;
//             } else {
//                 tooltip = `${action}`
//             }
//             return {
//                 content: tooltip,
//                 placement: 'bottom',
//                 trigger: 'hover',
//                 distance: '10',
//                 skidding: '0',
//                 popperClass: 'v-popper__theme-main animate__animated animate__fadeIn',
//             };
//         },

//         generateTooltipNav(action, name) {
//             let tooltip;
//             if (name) {
//                 tooltip = `${action} ${name}`;
//             } else {
//                 tooltip = `${action}`
//             }
//             return {
//                 content: tooltip,
//                 placement: 'right',
//                 trigger: 'hover',
//                 distance: '10',
//                 skidding: '0',
//                 popperClass: 'v-popper__theme-main animate__animated animate__fadeIn',
//             };
//         },

//         linkClick(link) {
//             const url = link;
//             window.location.href = url;
//         },

//         routerClick(link) {
//             const url = link;
//             this.$router.push(url);
//         }
//     },
// };

export default {
    install(app) {
        // Global goTo function using Inertia router
        // app.config.globalProperties.$goTo = (url) => {
        //     app.config.globalProperties.$inertia.visit(url, { method: 'get', preserveScroll: true });
        // };

        // Global tooltip function
        app.config.globalProperties.$tooltip = (content, placement = 'top', customClass = '') => {
            const basePopperClass = 'v-popper__theme-main animate__animated animate__fadeIn text-sm';
            return {
                content: content,
                placement: placement,
                trigger: 'hover',
                distance: '10',
                skidding: '0',
                popperClass: `${basePopperClass} ${customClass}`.trim(), // Combine base and custom class
            };
        };
    }
};
<template>
    <div
        :id="id"
        role="tooltip"
        :class="this.tooltipClass2">
            {{ info }}
            <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script>
    export default {
        name: 'Tooltip',
        props: {
            id: {
                type: String,
                required: true,
            },
            info: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                tooltipClass: 'inline-block absolute invisible z-10 p-2 w-auto text-sm font-normal text-yellow-300 bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700 whitespace-nowrap border border-yellow-300 uppercase',
                tooltipClass2: 'absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase'
            }
        }
    };
</script>

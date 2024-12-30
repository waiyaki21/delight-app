<template>
    <div :id="'tooltip-' + id" role="tooltip"
        :class="this.tooltipClass">
        {{ content }}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: String, required: true },
        content: { type: String, required: true },
    },

    data() {
        return {
            tooltipClass: 'inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-normal text-yellow-300 bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700 whitespace-nowrap border border-yellow-300'
        }
    }
};
</script>

<template>
    <div>
        <button v-if="isButton" type="button" :data-tooltip-target="'tooltip-' + id" data-tooltip-placement="left"
            :class="btndropClass" @click="onClick">
            <component :is="icon.name" class="h-6 w-6"></component>
            <span class="sr-only">{{ label }}</span>
        </button>
        <router-link v-else :to="link" type="button" :data-tooltip-target="'tooltip-' + id"
            data-tooltip-placement="left" :class="btndropClass">
            <component :is="icon.name" class="h-6 w-6"></component>
            <span class="sr-only">{{ label }}</span>
        </router-link>
        <tooltipInfo
            :id = "id"
            :content = "tooltip"
        ></tooltipInfo>
    </div>
</template>

<script>
    import tooltipInfo from "../Tooltips/tooltipInfo.vue";

    export default {
        props: {
            id: { type: String, required: true },
            icon: { type: Object, required: true },
            label: { type: String, required: true },
            tooltip: { type: String, required: true },
            btndropClass: { type: String, required: true },
            isButton: { type: Boolean, default: true },
            link: { type: String, default: '' },
            onClick: { type: Function, default: null },
        },

        components: {
            tooltipInfo
        }
    };
</script>

<template>
    <div>
        <a class="inline-flex items-center justify-between w-full p-1 text-base uppercase cursor-pointer" :class="[
            baseColor,
            `hover:${hoverColor} dark:hover:${darkHoverColor} dark:${darkColor}`,
        ]" v-tooltip="$tooltip(this.fullName(id), 'top')" @click="onClick">
            <component :is="icon.name" class="md:h-5 md:w-5 h-4 w-4">
            </component>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: String, required: true },
        icon: { type: Object, required: true },
        tooltip: { type: String, required: true },
        baseColor: { type: String, required: true },
        hoverColor: { type: String, required: true },
        darkColor: { type: String, required: true },
        darkHoverColor: { type: String, required: true },
        onClick: { type: Function, required: true },
    },

    methods: {
        fullName(id) {
            let full = `${id}-tooltip`;
            return full;
        }
    }
};
</script>

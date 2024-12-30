<template>
    <div>
        <a class="inline-flex items-center justify-between w-full p-1 text-base uppercase cursor-pointer" :class="[
            baseColor,
            `hover:${hoverColor} dark:hover:${darkHoverColor} dark:${darkColor}`,
        ]" :data-tooltip-target="`${id}-tooltip`" @click="onClick">
            <component :is="icon.name" class="md:h-5 md:w-5 h-4 w-4">
            </component>
        </a>
        <div :id="`${id}-tooltip`" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
            {{ tooltip }}
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
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
};
</script>

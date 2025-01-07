<template>
    <figcaption class="absolute px-4 bottom-2 inline-flex justify-between w-full gap-2">
        <ActionButton :buttonClass="'purple'" :buttonText="`${banner.catergory.name}`"
            class="rounded-md hover:shadow-md w-fit text-lg" @handleClick="this.linkClick(`/catergory/${banner.catergory_id}`)" v-tooltip="$tooltip(`View ${banner.catergory.name}`, 'top')">
            <right-icon class="mx-2 w-4 h-4 md:w-5 md:h-5"></right-icon>
        </ActionButton>
        <div
            class="inline-flex justify-between shadow-sm bg-white border-2 border-gray-300 p-1 space-x hover:shadow-md rounded-lg"
            role="group"
            v-if="isAdmin"
        >
            <BannerButton
                id="edit"
                :icon="{ name: 'edit-icon' }"
                :tooltip="`Edit ${banner.catergory.name}`"
                baseColor="text-purple-700"
                hoverColor="text-purple-900"
                darkColor="text-purple-800"
                darkHoverColor="text-purple-800"
                :onClick="() => editCatergory(banner.catergory)"
            />

            <BannerButton
                id="banner"
                :icon="{ name: 'photo-icon' }"
                :tooltip="`Edit Banner ${banner.catergory.name}`"
                baseColor="text-teal-700"
                hoverColor="text-teal-900"
                darkColor="text-teal-800"
                darkHoverColor="text-teal-800"
                :onClick="() => editBanner(banner.catergory)"
            />

            <BannerButton
                id="delete"
                :icon="{ name: 'delete-icon' }"
                :tooltip="`Delete ${banner.catergory.name}`"
                baseColor="text-rose-700"
                hoverColor="text-rose-900"
                darkColor="text-rose-800"
                darkHoverColor="text-rose-800"
                :onClick="() => deleteCatergory(banner.catergory)"
            />
        </div>
    </figcaption>
</template>

<script>
    import BannerButton     from "../../../../Utilities/Buttons/BannerButtons.vue";
    export default {
        name: 'BannerActions',
        components: { BannerButton },
        props: {
            banner: {
                type: Object,
                required: true,
            },
            isAdmin: {
                type: Boolean,
                required: true,
            },
            editCatergory: {
                type: Function,
                required: true,
            },
            editBanner: {
                type: Function,
                required: true,
            },
            deleteCatergory: {
                type: Function,
                required: true,
            },
        },
        methods: {
            linkClick(url) {
                // Redirect to the URL
                window.location.href = url;
            },
        }
    };
</script>

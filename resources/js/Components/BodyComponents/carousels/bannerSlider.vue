<template>
    <figure class="relative max-w-sm transition-all duration-300 cursor-pointer img-shadow img-box m-2">
        <a :href="`/catergory/${banner.catergory_id}`">
            <img class="rounded-lg border-2 border-gray-500 hover:border-2 hover:border-gray-800 hover:shadow-md"
                :src="banner.path" :alt="banner.name" />
        </a>
        <figcaption class="absolute px-4 bottom-2 inline-flex justify-between w-full">
            <a class="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-base px-4 py-2 text-center mb-1 uppercase inline-flex justify-between border-2 border-blue-900 hover:border-green-900 mt-2"
                :href="`/catergory/${banner.catergory_id}`">
                {{ banner.catergory.name }}
                <bag-icon class="h-6 w-6 mx-1"></bag-icon>
            </a>
            <div class="inline-flex justify-between shadow-sm bg-white border-2 border-gray-300 p-1 space-x hover:shadow-md rounded-lg"
                role="group" v-if="isAdmin">
                <BannerButton id="edit" :icon="{ name: 'edit-icon' }" :tooltip="`Edit ${banner.catergory.name}`"
                    baseColor="text-purple-700" hoverColor="text-purple-900" darkColor="text-purple-800"
                    darkHoverColor="text-purple-800" :onClick="() => editCatergory(banner.catergory)" />

                <BannerButton id="banner" :icon="{ name: 'photo-icon' }"
                    :tooltip="`Edit Banner ${banner.catergory.name}`" baseColor="text-teal-700"
                    hoverColor="text-teal-900" darkColor="text-teal-800" darkHoverColor="text-teal-800"
                    :onClick="() => editBanner(banner.catergory)" />

                <BannerButton id="delete" :icon="{ name: 'delete-icon' }" :tooltip="`Delete ${banner.catergory.name}`"
                    baseColor="text-rose-700" hoverColor="text-rose-900" darkColor="text-rose-800"
                    darkHoverColor="text-rose-800" :onClick="() => deleteCatergory(banner.catergory)" />
            </div>
        </figcaption>
    </figure>
</template>

<script>
import BannerButton from "../../../Utilities/Buttons/BannerButtons.vue";

export default {
    components: { BannerButton },
    props: {
        banner: { type: Object, required: true },
        isAdmin: { type: Boolean, required: true },
        editCatergory: { type: Function, required: true },
        editBanner: { type: Function, required: true },
        deleteCatergory: { type: Function, required: true },
    },
};
</script>

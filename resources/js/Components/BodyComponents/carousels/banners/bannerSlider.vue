<template>
    <figure class="relative max-w-sm transition-all duration-300 cursor-pointer img-shadow img-box m-1">
        <a :href="`/catergory/${banner.catergory_id}`">
            <img class="rounded-lg border-2 border-gray-500 hover:border-2 hover:border-gray-800 hover:shadow-md"
                :src="banner.path" :alt="banner.name" />
        </a>
        <BannerActions
            :banner="banner"
            :isAdmin="isAdmin"
            :editCatergory="editCatergory"
            :editBanner="editBanner"
            :deleteCatergory="deleteCatergory"
        />
    </figure>
</template>

<script>
import BannerActions from "./bannerActions.vue";

export default {
    components: { BannerActions },
    props: {
        banner: { type: Object, required: true },
        isAdmin: { type: Boolean, required: true },
        editCatergory: { type: Function, required: true },
        editBanner: { type: Function, required: true },
        deleteCatergory: { type: Function, required: true },
    },
};
</script>

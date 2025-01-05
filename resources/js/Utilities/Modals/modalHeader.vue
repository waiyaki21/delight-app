<template>
    <!-- Modal header -->
    <div class="flex justify-between items-start p-2 rounded-t border-b dark:border-gray-600">
        <h3 class="text-3xl font-semibold text-gray-900 dark:text-white underline uppercase text-center">
            {{ name }}
        </h3>
        <button type="button" class="group text-gray-900 bg-transparent hover:text-red-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" @click="closeModal">
            <times-icon class="w-6 h-6"></times-icon>
        </button>
    </div>
</template>

<script>
	export default {
		props: [
			'name',
		],

		methods: {
			closeModal() {
				this.$emit('close');
			}
		}
	}
</script>
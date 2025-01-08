<template>  
    <div role="status" class="w-full group my-2 mx-1 bg-white rounded-lg p-2 inline-flex justify-start space-x-2 gap-2">
        <section>
            <div class="flex items-center justify-center h-[220px] w-[220px] mb-4 bg-gray-300 rounded" style="width: 220px;height: 220px;">
                <photo-icon class="w-10 h-10 text-gray-200"></photo-icon>
            </div>
        </section>
        <div class="w-full flex-col">
            <div class="h-8 bg-gray-200 rounded-full w-8/10 mb-4"></div>
            <div class="h-6 bg-gray-200 rounded-full w-3/4 mb-3"></div>
            <div class="h-6 bg-gray-200 rounded-full w-3/4 mb-3"></div>
            <div class="h-4 bg-gray-200 rounded-full w-1/2 mb-3"></div>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
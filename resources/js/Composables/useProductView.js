// composables/useProductView.js
import { ref } from 'vue';
import axios from 'axios';

export default function useProductView(apiEndpoint) {
    const isLoading = ref(true);
    const info = ref('');
    const products = ref([]);
    const gridClass = ref('');
    const btnClass = ref('');
    const showList = ref(true);
    const showBtn = ref(false);
    const toggleBtn = ref('mx-2 h-6 w-6 text-black hover:text-cyan-600 cursor-pointer');
    const windowWidth = ref(0);

    const getWindowWidth = () => {
        windowWidth.value = document.documentElement.clientWidth;
        if (windowWidth.value < 767) {
            updateLayout('grid grid-cols-1 gap-1', 'top-48', true, orderList);
        } else if (windowWidth.value < 900) {
            updateLayout('grid grid-cols-2 gap-2', 'top-48', true, orderList);
        } else if (windowWidth.value < 1200) {
            updateLayout('grid grid-cols-3 gap-2', '', false, orderCard);
        } else {
            updateLayout('grid grid-cols-4 gap-2', '', false, orderCard);
        }
    };

    const startLoading = () => {
        isLoading.value = true;
    };
    
    const endLoading = () => {
        setTimeout(() => {
            isLoading.value = false;
        }, 1000);
    };

    const updateLayout = (grid, btn, btnVisible, action) => {
        gridClass.value = grid;
        btnClass.value = btn;
        showBtn.value = btnVisible;
        action();
    };

    const orderList = () => {
        startLoading();
        showList.value = true;
        endLoading();
    };

    const orderCard = () => {
        startLoading();
        showList.value = false;
        endLoading();
    };

    const fetchProducts = (routeId) => {
        isLoading.value = true;
        axios.get(`${apiEndpoint}/${routeId}`).then(({ data }) => {
            info.value      = data[0];
            products.value  = data[1];
            getWindowWidth();
            endLoading();
        });
    };

    // const reloadProducts = (routeId, flashMessage) => {
    //     axios.get(`${apiEndpoint}/${routeId}`).then(({ data }) => {
    //         info.value = data[0];
    //         products.value = data[1];
    //         getWindowWidth();
    //         isLoading.value = false;
    //     });
    // };

    // Add is_favorited to each product
    const updatedProducts = (infos, user) => {
        if (!user) {
            return infos; // If user is not available, return items without modification
        }

        return infos.map(product => {
            const isFavorited = Array.isArray(product.favorites) &&
                product.favorites.some(favorite => String(favorite.user_id) === String(user.id));

            return {
                ...product,
                is_favorited: isFavorited,
            };
        });
    };

    const reloadProducts = async (message, routeId) => {
        try {
            isLoading.value = true;
            const response = await axios.get(`${apiEndpoint}/${routeId}`);
            const data = response.data;
            info.value = data[0] || [];
            products.value = data[1] || [];
            endLoading();
        } catch (error) {
            console.error('Error reloading products:', error);
        }
    };

    return {
        isLoading,
        info,
        products,
        gridClass,
        btnClass,
        showList,
        showBtn,
        toggleBtn,
        getWindowWidth,
        fetchProducts,
        reloadProducts,
        orderList,
        orderCard,
        updatedProducts
    };
}

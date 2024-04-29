require('./bootstrap');

import { createApp }    from 'vue';
import router           from './routes';

// Main Search
import searchMain       from './Pages/MainSearch.vue'

//nav
import mainNav          from './Components/NavComponents/mainNav.vue'

// plugin 
import mainPlugin       from './Components/PluginComponents/mainPlugin.vue'
import contactPlugin    from './components/PluginComponents/contactPlugin.vue'

// Loading Body
import loadingBody      from './Components/BodyComponents/LoadingBody.vue'

// content 
import searchBody       from './Components/SearchComponents/viewSearch.vue'

// footer Body
import footerBody       from './Components/BodyComponents/FooterBody.vue'

// import icons 
import { PencilSquareIcon, TrashIcon, ShoppingCartIcon, StopCircleIcon, PhotoIcon, CameraIcon, MagnifyingGlassIcon, Bars3Icon, PlusIcon, PhoneIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon , NoSymbolIcon, TruckIcon, ShoppingBagIcon, DevicePhoneMobileIcon, PuzzlePieceIcon, SparklesIcon, ListBulletIcon, Square2StackIcon, XMarkIcon, FunnelIcon, HandThumbUpIcon, BellIcon, HomeModernIcon, DocumentDuplicateIcon, UserCircleIcon }   from '@heroicons/vue/24/outline';

const app = createApp({})
app
        .component('main-search',   searchMain)
        .component('main-nav',      mainNav)
        .component('main-plugin',   mainPlugin)
        .component('contact-plugin',contactPlugin)
        .component('loading-body',  loadingBody)
        .component('search-body',   searchBody)
        .component('footer-body',   footerBody)
        // .component('view-product',  productBody)

        // icon components 
        .component('edit-icon',         PencilSquareIcon)
        .component('delete-icon',       TrashIcon)
        .component('shopping-icon',     ShoppingCartIcon)
        .component('stop-icon',         StopCircleIcon)
        .component('photo-icon',        PhotoIcon)
        .component('camera-icon',       CameraIcon)
        .component('search-icon',       MagnifyingGlassIcon)
        .component('bars-icon',         Bars3Icon)
        .component('plus-icon',         PlusIcon)
        .component('phone-icon',        PhoneIcon)
        .component('down-icon',         ChevronDownIcon)
        .component('left-icon',         ChevronLeftIcon)
        .component('right-icon',        ChevronRightIcon)
        .component('no-icon',           NoSymbolIcon)
        .component('truck-icon',        TruckIcon)
        .component('bag-icon',          ShoppingBagIcon)
        .component('phone-icon',        DevicePhoneMobileIcon)
        .component('puzzle-icon',       PuzzlePieceIcon)
        .component('stars-icon',        SparklesIcon)
        .component('list-icon',         ListBulletIcon)
        .component('cards-icon',        Square2StackIcon)
        .component('times-icon',        XMarkIcon)
        .component('filter-icon',       FunnelIcon)
        .component('thumbsUp-icon',     HandThumbUpIcon)
        .component('bell-icon',         BellIcon)
        .component('home-icon',         HomeModernIcon)
        .component('copy-icon',         DocumentDuplicateIcon)
        .component('user-icon',         UserCircleIcon)
        // end icon components 

        .use(router)
        .mount('#app');

require('./bootstrap');

import { createApp }    from 'vue';
import router           from './routes';
import VueViewer        from 'v-viewer';
import 'viewerjs/dist/viewer.css';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

// Main Body
import appBody          from './Pages/MainApp.vue'

// Main Search
import searchMain       from './Pages/MainSearch.vue'

// Main Navigation
import mainNav          from './Components/NavComponents/mainNav.vue'

// plugin 
import mainPlugin       from './Components/PluginComponents/mainPlugin.vue'
// import contactPlugin    from './components/PluginComponents/contactPlugin.vue'

// content 
// import contentBody      from './Components/BodyComponents/Homepage.vue'
// search content 
// import searchBody       from './Components/SearchComponents/viewSearch.vue'

// footer Body
import footerBody       from './Components/BodyComponents/FooterBody.vue'

// flash messages
import toast            from './Components/AlertComponents/new-flashSimple.vue'

// import icons 
import { PencilSquareIcon, TrashIcon, ShoppingCartIcon, StopCircleIcon, PhotoIcon, CameraIcon, MagnifyingGlassIcon, Bars3Icon, PlusIcon, PhoneIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon , NoSymbolIcon, TruckIcon, ShoppingBagIcon, DevicePhoneMobileIcon, PuzzlePieceIcon, SparklesIcon, ListBulletIcon, Square2StackIcon, XMarkIcon, FunnelIcon, HandThumbUpIcon, BellIcon, HomeModernIcon, DocumentDuplicateIcon, UserCircleIcon, HeartIcon, BellAlertIcon, ExclamationTriangleIcon, ClockIcon, CurrencyDollarIcon, CheckCircleIcon,BellSnoozeIcon,ArrowPathIcon, MinusIcon, CheckIcon, ShareIcon
 }   from '@heroicons/vue/24/outline';

// Utilities 
import favoriteSolid    from './Utilities/Icons/favoriteSolid-icon.vue';
import infoIcon         from "./Utilities/Icons/infoIcon.vue";
import NoProducts       from './Utilities/Products/NoProducts.vue';
import modalHeader      from './Utilities/Modals/modalHeader.vue';
import Tooltip          from './Utilities/Tooltips/tooltip.vue';

import actionButton     from './Utilities/Buttons/actionButton.vue';
import styleButton      from './Utilities/Buttons/styleButton.vue';
import globalMixin      from './Globals/globalMixin';

// loading Utils
import loading          from './Utilities/Loading/LoadingBody.vue';
import loadingTable     from './Utilities/Loading/LoadingTable.vue';
import loadingCard      from './Utilities/Loading/LoadingCard.vue';
import loadingRow       from './Utilities/Loading/LoadingRow.vue';
import hrClass          from './Utilities/hrClass.vue';

const app = createApp({})
app
        .component('main-body',     appBody)
        .component('main-search',   searchMain)
        .component('main-nav',      mainNav)
        .component('main-plugin',   mainPlugin)
        // .component('contact-plugin',contactPlugin)
        // .component('loading-body',  loadingBody)
        // .component('content-body',  contentBody)
        // .component('search-body',   searchBody)
        .component('footer-body',   footerBody)

        // assistants
        .component('flash-message',   toast)

        // icon components 
        .component('share-icon',        ShareIcon)
        .component('edit-icon',         PencilSquareIcon)
        .component('delete-icon',       TrashIcon)
        .component('shopping-icon',     ShoppingCartIcon)
        .component('stop-icon',         StopCircleIcon)
        .component('photo-icon',        PhotoIcon)
        .component('camera-icon',       CameraIcon)
        .component('search-icon',       MagnifyingGlassIcon)
        .component('bars-icon',         Bars3Icon)
        .component('plus-icon',         PlusIcon)
        .component('minus-icon',        MinusIcon)
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
        .component('favorite-icon',     HeartIcon)
        .component('favSolid-icon',     favoriteSolid)

        .component('bellring-icon',     BellAlertIcon)
        .component('info-icon',         infoIcon)
        .component('warning-icon',      ExclamationTriangleIcon)
        .component('newstop-icon',      NoSymbolIcon)
        .component('clock-icon',        ClockIcon)
        .component('money-icon',        CurrencyDollarIcon)
        .component('checkcircle-icon',  CheckCircleIcon)
        .component('check-icon',        CheckIcon)
        .component('snooze-icon',       BellSnoozeIcon)
        .component('star-icon',         SparklesIcon)
        .component('loading-icon',      ArrowPathIcon)
        // end icon components 

        // utilities 
        .component('no-products',       NoProducts)
        .component('modal-header',      modalHeader)
        .component('tooltip',           Tooltip)
        .component('loading-body',      loading)
        .component('loading-table',     loadingTable)
        .component('loading-card',      loadingCard)
        .component('loading-row',       loadingRow)
        .component('hr-line',           hrClass)

        // buttons
        .component('ActionButton',      actionButton)
        .component('StyleButton',       styleButton)

        .use(router)
        .use(FloatingVue)
        .use(VueViewer, {
                defaultOptions: {
                        toolbar: true,
                        navbar: true,
                        title: true,
                        button: false,
                        tooltip: true,
                        movable: false,
                        zoomable: true,
                        rotatable: false,
                        scalable: true,
                        transition: true,
                        fullscreen: true,
                        keyboard: true
                },
        })
        .use(globalMixin)
        .mount('#app');

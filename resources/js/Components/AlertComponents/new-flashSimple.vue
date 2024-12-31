<template>
    <section class="fixed top-[4rem] right-5 flex-col z-[141] boldened overflow-y-scroll hidescroll max-h-[80%]" ref="flashContainer" v-if="this.show">
        <TransitionGroup name="list" tag="div">
            <div v-for="flash in flashes" class="my-0.5 dark:bg-gradient-to-r dark:from-gray-800/30 dark:via-gray-800/20 dark:to-gray-800/10 pl-0.5 py-0.5 rounded-l-lg" :key="flash">
                <!-- Flash Notification -->
                <div :class="[flashClass(flash), { 'animate__animated animate__fadeInDown': !flash.isHiding, 'animate__animated animate__zoomOut': flash.isHiding }]" 
                    role="alert" 
                    v-if="flash.visible" 
                    @click="hide(flash.id)" 
                    @animationend="handleAnimationEnd">
                    
                    <!-- Header Section -->
                    <div v-if="flash.click" class="inline-flex w-full justify-start gap-2">
                        <!-- Icon -->
                        <component :is="flash.icon" :class="flash.iconClass" v-if="flash.icon"></component>
                        <span class="sr-only">Info</span>
                        <h3 class="text-sm md:text-md font-medium uppercase underline">{{ flash.header }}</h3>
                    </div>
                    
                    <!-- Body -->
                    <div :class="bodyClass(flash)" class="font-sans my-2 text-xs w-full text-left">
                        {{ flash.body }}
                    </div>
                    
                    <!-- Footer/Actions -->
                    <div v-if="flash.click" class="inline-flex w-full justify-between gap-1">
                        <ActionButton :buttonClass="'dark'" 
                                    :tooltipText="`Go to link`" 
                                    :buttonText="flash.button" 
                                    class="rounded-md shadow-md w-full" 
                                    @handleClick="flash.emit ? emitFlash(flash) : linkClick(flash.link)">
                            <right-icon class="mx-2 w-4 h-4 md:w-5 md:h-5 hover:rotate-180"></right-icon>
                        </ActionButton>
                        <StyleButton :buttonClass="'danger'" 
                                    :tooltipText="`Close Notification`" 
                                    :buttonText="`Close`" 
                                    class="rounded-md shadow-md flex-shrink-0" 
                                    @handleClick="hide(flash.id)">
                            <times-icon class="m-1 w-4 h-4 md:w-5 md:h-5"></times-icon>
                        </StyleButton>
                    </div>
                    
                    <!-- Close Button for Non-clickable Flash -->
                    <button v-else type="button" 
                            :class="closeButtonClass(flash)" 
                            @click="hide(flash.id)">
                        <svg class="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                        </svg>
                    </button>
                </div>

            </div>
        </TransitionGroup>
    </section>
</template>
       
<script>
    export default {
        props: [
            'message'
        ],

        data() {
            const baseConfig = (icon, color, variant, type) => ({
                icon,
                textClass: `bg-${color}-50 text-${color}-500 focus:ring-${color}-200 dark:bg-${color}-800 dark:text-${color}-200`,
                classType: `text-${variant}-800 border-${variant}-300 bg-${color}-50 dark:text-${color}-200 dark:bg-${color}-800 dark:border-${color}-800`,
                [type]: true
            });

            const yellowConfig = {
                textClass: `bg-yellow-50 text-yellow-900 focus:ring-yellow-200 dark:bg-transparent dark:text-gray-900`,
                classType: `text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-gray-900 dark:bg-yellow-400 dark:border-yellow-200`,
                warning: true
            };

            return {
                show        : false,
                body        : 'Test Sent successfully.',
                classType   : '',
                textClass   : '',
                type        : '',

                success     : false,
                info        : false,
                warning     : false,
                danger      : false,
                click       : false,

                flashes: [],  // Array to store flash messages
                nextFlashId: 1,

                flashButton: 'flex-col gap-1 items-center p-2 py-2 md:py-4 border rounded-md shadow-md cursor-pointer w-[17rem] md:w-[22.5rem]',
                flashNorm:   'flex items-center p-2 py-3 border-base rounded-md shadow-md cursor-pointer w-[17rem] md:w-[22.5rem]',

                classConfig: {
                    success:    baseConfig('bellring-icon', 'emerald', 'emerald', 'success'),
                    info:       baseConfig('info-icon', 'blue', 'blue', 'info'),
                    sky:        baseConfig('info-icon', 'sky', 'sky', 'info'),
                    danger:     baseConfig('warning-icon', 'rose', 'red', 'danger'),
                    warm:       baseConfig('stop-icon', 'orange', 'orange', 'danger'),
                    balance:    baseConfig('money-icon', 'rose', 'red', 'danger'),
                    reload:     { icon: 'clock-icon', ...yellowConfig },
                    warning:    { icon: 'stop-icon', ...yellowConfig },
                    asc:        { icon: 'up-arrow', ...yellowConfig },
                    desc:       { icon: 'down-arrow', ...yellowConfig },
                    loading:    {
                        icon:       'loading-icon',
                        textClass:  `bg-transparent text-yellow-900 focus:ring-yellow-200 dark:bg-transparent dark:text-gray-900`,
                        classType:  yellowConfig.classType,
                        warning:    true
                    }
                }
            }
        },

        methods: {
            flashClass(flash) {
                return [flash.click ? this.flashButton : this.flashNorm, flash.class];
            },
            
            bodyClass(flash) {
                return flash.click ? '' : `ms-1 md:ms-3 text-sm font-normal boldened pt-1 ${flash.text}`;
            },

            closeButtonClass(flash) {
                return `ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center w-5 h-5 md:w-8 md:h-8 ${flash.text}`;
            },

            state() {
                this.success    = false;
                this.info       = false;
                this.warning    = false;
                this.danger     = false;
            },

            scrollDown() {
                // Scroll to the bottom of the flash container
                this.$nextTick(() => {
                    const container = this.$refs.flashContainer;
                    if (container) {
                        container.scrollTop = container.scrollHeight; // Scroll to the bottom
                    }
                });
            },

            toastOn(message) {
                this.state();
                this.setClass(message[1], false);

                // Check if a flash with the same body already exists
                const isDuplicate = this.flashes.some(flash => flash.body === message[0]);

                if (isDuplicate) {
                    // Handle the case where a flash with the same body already exists
                    console.log('Flash with the same body already exists. Not adding a new flash.');
                } else {
                    const newFlash = {
                        id:          this.nextFlashId++,
                        body:        message[0],
                        class:       this.classType,
                        text:        this.textClass,
                        type:        message[1],
                        icon:        this.iconComponent(message[1]),
                        iconClass:   this.iconClass(message[1], this.textClass),
                        click:       false
                    };

                    // Add the new flash message to the flashes array
                    this.flashes.push(newFlash);
                    this.show = true;

                    this.scrollDown();

                    // Show the flash message for 10 seconds, then remove it
                    setTimeout(() => {
                        this.flashes = this.flashes.filter(flash => flash.id !== newFlash.id);
                    }, 10000);
                }
            },

            toastOnTime(message) {
                this.state();
                this.setClass(message[1], false);

                // Check if a flash with the same body already exists
                const isDuplicate = this.flashes.some(flash => flash.body === message[0]);

                if (isDuplicate) {
                    // Handle the case where a flash with the same body already exists
                    console.log('Flash with the same body already exists. Not adding a new flash.');
                } else {
                    const newFlash = {
                        id:         this.nextFlashId++,
                        body:       message[0],
                        class:      this.classType,
                        text:       this.textClass,
                        type:       message[1],
                        time:       message[2],
                        icon:       this.iconComponent(message[1]),
                        iconClass:  this.iconClass(message[1], this.textClass),
                        click:      false
                    };

                    // Add the new flash message to the flashes array
                    this.flashes.push(newFlash);
                    this.show = true;

                    this.scrollDown();

                    // Show the flash message for set time, then remove it
                    setTimeout(() => {
                        this.flashes = this.flashes.filter(flash => flash.id !== newFlash.id);
                    }, newFlash.time);
                }
            },

            toastClick(message) {
                this.state();

                this.setClass(message[1], true)

                // create new flash object 
                const newFlash = {
                    id:         this.nextFlashId++,
                    class:      this.classType,
                    text:       this.textClass,
                    body:       message[0],
                    type:       message[1],
                    header:     message[2],
                    link:       message[3],
                    button:     message[4],
                    duration:   message[5],
                    icon:       this.iconComponent(message[1]),
                    iconClass:  this.iconClass(message[1], this.textClass),
                    click:      true,
                    emit:       false
                };

                // Add the new flash message to the flashes array
                this.flashes.push(newFlash);

                // show the container 
                this.show       = true

                this.scrollDown();

                // Show the flash message for set time, then remove it
                setTimeout(() => {
                    this.flashes = this.flashes.filter(flash => flash.id !== newFlash.id);
                }, newFlash.duration);
            },

            toastEmit(message) {
                this.state();

                this.setClass(message[1], true)

                // create new flash object 
                const newFlash = {
                    id:         this.nextFlashId++,
                    class:      this.classType,
                    text:       this.textClass,
                    body:       message[0],
                    type:       message[1],
                    header:     message[2],
                    link:       message[3],
                    button:     message[4],
                    duration:   message[5],
                    icon:       this.iconComponent(message[1]),
                    iconClass:  this.iconClass(message[1], this.textClass),
                    click:      true,
                    emit:       true
                };

                // Add the new flash message to the flashes array
                this.flashes.push(newFlash);

                // show the container 
                this.show       = true

                this.scrollDown();

                // Show the flash message for set time, then remove it
                setTimeout(() => {
                    this.flashes = this.flashes.filter(flash => flash.id !== newFlash.id);
                }, newFlash.duration);
            },

            emitFlash(flash) {
                if (flash.emit) {
                    this.$emit('info');
                    setTimeout(() => {
                        this.hide(flash.id);                    
                    }, 1500);    
                }
            },

            setClass(info, value) {
                const config = this.classConfig[info];

                if (config) {
                    this.textClass  = config.textClass;
                    this.classType  = config.classType;
                    this.show       = true;
                    this.click      = value;
                    Object.assign(this, config);
                }
            },

            hide(id) {
                this.flashes = this.flashes.filter(flash => flash.id !== id);
                if (this.flashes.length == 0) {
                    this.show = false;    
                }
            },

            hide(flashId) {
                const flash = this.flashes.find(f => f.id === flashId);
                if (flash) {
                    flash.isHiding = true; // Set the flag to true to trigger the exit animation
                }
            },

            handleAnimationEnd() {
                // Remove the flash from the array after the fade-out animation completes
                this.flashes = this.flashes.filter(f => !f.isHiding);
            },

            allHide() {
                this.flashes = [];
                if (this.flashes.length == 0) {
                    this.show = false;    
                }
            }, 

            loadHide() {
                this.loadings = this.flashes.filter(flash => flash.type == 'loading');
                this.loadings.forEach(flash => {
                    this.hide(flash.id)
                });
            },

            iconComponent(type) {
                const config = this.classConfig[type];
                return config ? config.icon : null;
            },

            iconClass(type, text) {
                const baseClass = 'w-4 h-4 md:w-5 md:h-5 mx-0.5';

                if (type === 'reload' || type === 'loading') {
                    return [baseClass, 'animate-spin', text];
                } else if (type === 'success') {
                    return [baseClass, 'animate__animated animate__swing animate__infinite', text];
                } else {
                    return [baseClass, text];
                }
            }
        }
    }
</script>
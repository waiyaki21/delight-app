<template>
  <div class="flex items-center border rounded-md p-1 w-fit">
    <!-- Minus button -->
    <button 
      :class="[this.btnClass, this.minusBtnClass]" 
      @click="decrement"
      v-tooltip="$tooltip('Decrease No. of Items', 'top')"
    >
      -
    </button>

    <!-- Display value -->
    <span class="mx-2 text-lg font-medium text-gray-800">{{ value }}</span>

    <!-- Plus button -->
    <button 
      :class="[this.btnClass, this.addBtnClass]" 
      @click="increment"
      v-tooltip="$tooltip('Increase No. of Items', 'top')"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    // Initial value for the counter
    initialValue: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      value:    this.initialValue, // Bind to the initialValue prop
      userID:   this.id,
      stockNo:  this.stock,
      btnClass: 'p-1 text-sm font-normal text-gray-600 hover:text-black focus:outline-none',
      addBtnClass: '',
      minusBtnClass: ''
    };
  },
  methods: {
    increment() {
        if (this.value == this.stockNo ) {
            this.$emit('flash', 'Maximum No. of Stock Reached!','danger');
            this.addBtnClass = "cursor-not-allowed";
        } else {
            this.addBtnClass = "";
            this.value++;
            this.$emit('update:value', this.value, this.userID); // Emit event for parent
        }
    },
    decrement() {
        if (this.value == 1 ) {
            this.$emit('flash','Sorry, Cant go Below One!','danger');
            this.minusBtnClass = "cursor-not-allowed";
        } else {
            this.minusBtnClass = '';
            if (this.value > 0) this.value--; // Optional: Prevent negative values
            this.$emit('update:value', this.value, this.userID); // Emit event for parent
        }
    },
  },
};
</script>

<style scoped>
/* Optional styles for better appearance */
button {
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s;
}
button:hover {
  color: #000;
}
span {
  width: 2rem;
  text-align: center;
}
</style>

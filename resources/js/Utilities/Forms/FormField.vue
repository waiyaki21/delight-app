<template>
  <div :class="`col-span-${colSpan}`">
    <label :for="id" :class="[errors[id] ? formFailed.labelclass : formInfo.labelclass]">
      {{ label }}
    </label>
    <component :is="componentType" :id="id" :name="name" :value="modelValue" :class="[errors[id] ? formFailed.inputclass : formInfo.inputclass, componentType === 'select' || componentType === 'textarea' ? 'option-font h-[2.6rem]' : 'h-[2.6rem]']" :placeholder="placeholder" @input="handleInput" @keydown.enter="focusNext" v-bind="attrs">
      <slot></slot>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    label: String,
    modelValue: [String, Number],
    errors: Object,
    formFailed: Object,
    formInfo: Object,
    placeholder: String,
    colSpan: {
      type: Number,
      default: 1,
    },
    componentType: {
      type: String,
      default: 'input',
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('input', event);
    },
    focusNext() {
      this.$emit('keydown.enter');
    },
  },
};
</script>

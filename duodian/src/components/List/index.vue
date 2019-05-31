<template>
  <div>
    <div class="list-body" @click="selfClick">
      <div class="list-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="list-item-main" v-if="title || brief || $slots.default">
        <p class="list-item-main-title" v-if="title" v-text="title"></p>
        <p class="list-item-main-title bri" v-if="brief" v-text="brief"></p>
        <slot></slot>
      </div>
      <div class="list-item-right" v-if="$slots.right || addon || arrow || isSwitch">
        <slot name="right">
          {{ addon }}
        </slot>
        <switch-state v-if="isSwitch" v-model="isActive" @change='switchChange(isActive)'/>
        <SvgIcon v-if='arrow' iconClass='arrow' size='md'></SvgIcon>
      </div>
    </div>
    <div class="list-children" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    title: {
      type: String,
      default: ''
    },
    brief: {
      type: String,
      default: ''
    },
    addon: {
      type: String,
      default: ''
    },
    arrow: {
      type: Boolean,
      default: false
    },
    isSwitch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    selfClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
    switchChange (active) {
      this.$emit('change', active)
    }
  }
}
</script>

<style lang="scss">
  .list-body{
    display: flex;
    width: 100%;
    justify-content: space-between;
    .list-item-main{
      flex: 1;
      padding: 20px 0;
      .bri{
        margin-top: 30px;
      }
    }
    .list-item-right{
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>

<template>
  <svg :class="[svgClass, size]" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.md{
  width: 30px;
  height: 30px;
}
.sm{
  width: 14px;
  height: 14px;
}
.lg{
  width: 45px;
  height: 45px;
}
.xl{
  width: 30px;
  height: 30px;
}
</style>

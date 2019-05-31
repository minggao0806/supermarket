<template>
  <div class="loading">
    <div></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
  .loading {
    @include wh(100%, 100%);
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      @include wh(140px, 140px);
      background: url("https://img.dmallcdn.com//dshop/201903/40208262-8001-4c19-ad20-370a039ed243")
        no-repeat 0 0;
      animation: run4 1.5s steps(25) infinite;
    }
    @keyframes run4 {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -3500px 0;
      }
    }
  }
</style>

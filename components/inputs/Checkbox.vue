<template>
  <el-checkbox
    v-bind="$attrs"
    v-on="$listeners"
  ><slot/></el-checkbox>
</template>

<script>
  export default {
    name: 'Checkbox'
  }
</script>

<style lang="scss">
  .el-checkbox__inner {
    border-radius: 50%;
    height: $font-size * 1.5;
    width: $font-size * 1.5;

    &::after {
      height: $font-size;
      width: $font-size * 0.36;
      left: $font-size * 0.5;
      top: $font-size * 0.08;
      border-width: 3px;
    }
  }

  .el-checkbox__label {
    font-size: $font-size;
    transform: translateY(1px);
  }
</style>

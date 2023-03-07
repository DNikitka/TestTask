<template>
  <th @click="$emit('sort', sSort)">{{sSortName}} <span v-if="sCurrentSort === sSort"><v-icon :name="sCurrentItem"/></span></th>
</template>

<script>
export default {
  name: "v-head-item",
  props: {
    sCurrentSortDir:{
      type: String,
      default: ""
    },
    sCurrentSort: {
      type: String,
      default: ""
    },
    sSort: {
      type: String,
      default: ""
    },
    sSortName: {
      type: String,
      default: ""
    }
  },
  computed: {
    sCurrentItem(){
      return this.sCurrentSortDir === 'up' ? "co-sort-alpha-down" : "co-sort-alpha-up"
    }
  }
}
</script>

<style scoped>

</style>
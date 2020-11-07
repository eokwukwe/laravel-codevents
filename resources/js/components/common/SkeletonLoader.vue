<template>
  <v-skeleton-loader v-bind="attrs" :type="type"></v-skeleton-loader>
</template>

<script>
export default {
  name: "SkeletonLoader",

  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    attrs: {
      class: "mb-4",
      elevation: 2,
    },
  }),
};
</script>

<style scoped>
  .v-skeleton-loader__list-item-avatar-three-line.v-skeleton-loader__bone.v-skeleton-loader__avatar {
    height: 85px !important;
    width: 85px;
  }
</style>

<template>
  <v-card style="position: sticky; top: 70px"  tile>
    <v-list dense>
      <v-header class="primary--text pl-3 d-flex align-center">
        <v-icon large left color="primary">mdi-filter</v-icon>
        <span>Filters</span>
      </v-header>

      <v-divider class="mt-2"></v-divider>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "EventFilterStatus",

  data: () => ({
    selectedItem: 0,
    items: [
      { text: "All Events" },
      { text: "I'm Hosting" },
      { text: "I'm Attending" },
    ],
  }),
};
</script>

<style>
</style>

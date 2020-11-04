<template>
  <v-row align="center" justify="start" dense>
    <div v-if="!hasRelationships">No {{ name }}</div>
    <v-col
      sm="3"
      md="2"
      cols="6"
      :key="relationship.id"
      v-for="(relationship, idx) in relationships"
    >
      <v-card>
        <v-img
          height="150px"
          class="white--text align-end"
          :src="relationship.photoURL || '/images/user.png'"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-title class="text-capitalize name">
            {{ relationship.name }}
          </v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RelationshipTab",

  props: {
    name: {
      type: String,
    },
    relationships: {
      type: Array,
    },
  },

  computed: {
    hasRelationships() {
      return this.relationships.length > 0;
    },
  },
};
</script>

<style scoped>
.name {
  font-size: 0.8rem;
}
</style>

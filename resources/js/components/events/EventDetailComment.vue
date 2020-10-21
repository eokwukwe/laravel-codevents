<template>
  <v-card>
    <v-card-title class="primary white--text py-2">
      Comments about this event
    </v-card-title>

    <v-card-text class="py-0 mt-5">
      <v-form>
        <v-textarea
          rows="2"
          dense
          filled
          outlined
          label="Comment"
          placeholder="Enter your comment (Press Enter to submit, SHIFT + Enter for new line)"
          v-model="comment"
          auto-grow
          @keypress.enter="handleAddComment"
        ></v-textarea>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <span v-for="comment in comments" :key="comment.id">
      <v-card-text class="py-0">
        <div class="d-flex flex-no-wrap align-start">
          <v-avatar class="mt-4 mx-0" size="35">
            <img :src="comment.user.photoURL" alt="photo" />
          </v-avatar>

          <div>
            <v-card-subtitle class="pl-3 pr-1 pb-2">
              <router-link
                style="cursor: pointer"
                tag="span"
                class="text-capitalize primary--text"
                :to="{ name: 'ProfilePage', params: { id: comment.user.id } }"
              >
                {{ comment.user.name }}
              </router-link>

              <span> - </span>

              <small> about 1 month ago</small>

              <p class="mb-0">
                {{ comment.content }}
              </p>
            </v-card-subtitle>
          </div>
        </div>
      </v-card-text>
    </span>
  </v-card>
</template>

<script>
export default {
  name: "EventDetailComment",

  data: () => ({
    comment: null,
    comments: [],
    commentId: 0,
    userId: 0,
  }),

  methods: {
    handleAddComment(e) {
      e.preventDefault();

      if (e.key === "Enter" && e.shiftKey) {
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const cId = ++this.commentId;
        const uId = ++this.userId;

        const userComment = {
          id: cId,
          content: this.comment,
          user: {
            id: uId,
            name: "john doe",
            photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
          },
        };

        this.comment = null;
        this.comments.push(userComment);
      }
    },
  },
};
</script>

<style>
</style>

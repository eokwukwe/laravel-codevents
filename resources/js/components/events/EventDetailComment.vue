<template>
  <v-card class="pb-3">
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
          auto-grow
          label="Comment"
          placeholder="Enter your comment (Press Enter to submit, SHIFT + Enter for new line)"
          v-model="eventCommentData.comment"
          @keypress="handleAddComment"
        ></v-textarea>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <span v-for="comment in comments" :key="comment.id">
      <v-card-text class="py-0 mt-3 mb-4">
        <div class="d-flex flex-no-wrap align-start">
          <v-avatar class="mx-0" size="35">
            <img :src="comment.user.photoURL" alt="photo" />
          </v-avatar>

          <div class="grey lighten-3 comment--content ml-2">
            <v-card-subtitle class="px-2 py-1">
              <p class="mb-0">
                {{ comment.content }}
              </p>

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
            </v-card-subtitle>
          </div>
        </div>
      </v-card-text>
    </span>
  </v-card>
</template>

<script>
import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "EventDetailComment",

  data: () => ({
    eventCommentData: { comment: null },
    comments: [
      {
        id: 1,
        content: "this is a comment that comments a comment in the commnent for more comment in the comment",
        user: {
          id: 2,
          name: "john doe",
          photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
      },
    ],
    commentId: 0,
    userId: 0,
  }),

  methods: {
    handleAddComment(e) {
      if (e.key === "Enter" && e.shiftKey) {
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        if (!this.eventCommentData.comment) return;

        const cId = ++this.commentId;
        const uId = ++this.userId;

        const userComment = {
          id: cId,
          content: this.eventCommentData.comment,
          user: {
            id: uId,
            name: "john doe",
            photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
          },
        };

        this.comments.push(userComment);

        this.eventCommentData.comment = "";
      }
    },
  },
};
</script>

<style scoped>
  .comment--content {
    border-radius: 5px;
    width: 100%;
  }
</style>

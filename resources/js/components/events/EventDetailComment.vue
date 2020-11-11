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
          <v-avatar class="mx-0" size="30">
            <img
              alt="user photo"
              :src="comment.user.photoURL || '/images/user.png'"
            />
          </v-avatar>

          <div class="grey lighten-3 comment--content ml-2">
            <v-card-subtitle class="px-2 py-1">
              <p class="mb-0">
                {{ comment.content }}
              </p>

              <div class="d-flex justify-space-between mt-2">
                <span>
                  <router-link
                    style="cursor: pointer"
                    tag="span"
                    class="text-capitalize primary--text"
                    :to="{
                      name: 'ProfilePage',
                      params: { id: comment.user.id },
                    }"
                  >
                    {{ comment.user.name.split(" ")[0] }}
                  </router-link>

                  <span> - </span>

                  <small>{{ comment.createdAt.forHuman }}</small>
                </span>

                <span>
                  <v-btn @click="updateComment(comment.content)" x-small icon>
                    <v-icon color="success" small>mdi-pencil-circle</v-icon>
                  </v-btn>

                  <v-btn x-small icon class="ml-2">
                    <v-icon color="warning" small>mdi-delete</v-icon>
                  </v-btn>
                </span>
              </div>
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

  props: {
    event: {
      type: Object,
    },
  },

  data: () => ({
    eventCommentData: { comment: null },

    commentId: 0,
    userId: 0,
  }),

  computed: {
    comments() {
      return this.event.comments;
    },
  },

  methods: {
    handleAddComment(e) {
      if (e.key === "Enter" && e.shiftKey) {
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        if (!this.eventCommentData.comment) return;
        console.log(this.eventCommentData);
      }
    },

    updateComment(content) {
      this.eventCommentData = { comment: content };
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

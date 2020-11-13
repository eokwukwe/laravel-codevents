<template>
  <v-card class="pb-3">
    <v-card-title class="primary white--text py-2">
      Comments about this event
    </v-card-title>

    <v-card-text class="py-0 mt-5">
      <v-form>
        <v-textarea
          dense
          filled
          rows="2"
          outlined
          auto-grow
          label="Comment"
          :error-messages="eventServerValidationErrors['content']"
          placeholder="Enter your comment (Press Enter to submit, SHIFT + Enter for new line)"
          v-model="eventCommentData.content"
          @keypress="handleAddComment"
        ></v-textarea>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <span v-if="!commentLoading" v-for="comment in comments" :key="comment.id">
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

                <span v-if="comment.user.id === loggedInUser.id">
                  <v-btn @click="selectCommentToUpdate(comment)" x-small icon>
                    <v-icon color="success" small>mdi-pencil-circle</v-icon>
                  </v-btn>

                  <v-btn
                    icon
                    x-small
                    class="ml-2"
                    @click="deleteComment(comment.id)"
                  >
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
import { mapGetters, mapActions } from "vuex";

import helpers from "../../helpers";
import SkeletonLoader from "../../components/common/SkeletonLoader";

export default {
  name: "EventDetailComment",

  props: {
    event: {
      type: Object,
    },
    loggedInUser: {
      type: Object,
    },
  },

  components: { SkeletonLoader },

  data: () => ({
    commentId: "",
    isUpdating: false,
    eventCommentData: { content: null },
  }),

  computed: {
    ...mapGetters([
      "comments",
      "commentError",
      "commentLoading",
      "eventActionSuccess",
      "eventServerValidationErrors",
    ]),
  },

  created: function () {
    this.getEventComments(this.event.id);
  },

  methods: {
    ...mapActions([
      "getEventComments",
      "addEventComment",
      "updateEventComment",
      "deleteEventComment",
    ]),

    async handleAddComment(e) {
      if (e.key === "Enter" && e.shiftKey) {
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        if (!this.eventCommentData.content) return;

        if (!this.isUpdating) {
          const payload = {
            eventId: this.event.id,
            comment: {
              content: this.eventCommentData.content,
            },
          };

          await this.addEventComment(payload);
        } else {
          const payload = {
            eventId: this.event.id,
            commentId: this.commentId,
            comment: {
              content: this.eventCommentData.content,
            },
          };

          await this.updateEventComment(payload);
        }

        this.eventCommentData.content = null;

        await this.getEventComments(this.event.id);
      }
    },

    selectCommentToUpdate(comment) {
      this.isUpdating = true;

      this.commentId = comment.id;

      this.eventCommentData = { content: comment.content };
    },

    async deleteComment(commentId) {
      await this.deleteEventComment({
        eventId: this.event.id,
        commentId: commentId,
      });

      await this.getEventComments(this.event.id);
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

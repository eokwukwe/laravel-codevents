import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#311B92",
                success: "#43A047",
                info: "#1565C0",
                error: "#D84315",
                warning: "#E65100",
                background: colors.grey.lighten3
                // secondary: colors.white.lighten3
            },
            dark: {
                primary: colors.grey.lighten3,
                background: colors.grey.darken3
            }
        }
    }
};

export default new Vuetify(opts);

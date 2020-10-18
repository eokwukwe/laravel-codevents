import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#009688",
                success: "#3cd1c2",
                info: "#ffaa2c",
                error: "#f83e70",
                background: colors.grey.lighten5
            },
            dark: {
                primary: colors.blue.lighten3,
                background: colors.indigo.base
            }
        }
    }
};

export default new Vuetify(opts);

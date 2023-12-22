export default {
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition);
                } else {
                    resolve({ top: 0 });
                }
            }, 1000); // 1000ms = duration of page transition in app.vue
        });
    },
};

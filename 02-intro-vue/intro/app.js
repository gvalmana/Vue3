const { createApp, ref } = Vue;

const app = createApp({
    setup() {
        const message = ref('I am Batman');

        const autor = ref('I am Bruce Wayne');
        const changeQuote = () => {
            message.value = 'I am Goku';
            autor.value = 'I am Goku';
        };
        return { message, autor, changeQuote };
    },
});

app.mount('#myapp');
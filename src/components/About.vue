<template lang="pug">
div#main
    .content.about
        h2 About Me
        h3 {{aboutTitle}}
        div(v-html="aboutText")
</template>

<script>
import { Settings as settings } from '@/Settings';
import marked from 'marked';
export default {
    name: 'about',
    data() {
        return {
            aboutTitle: settings.aboutTitle,
            aboutText: marked(settings.aboutText)
        }
    }
}
</script>


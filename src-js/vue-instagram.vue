<template>
    <div :class="containerClass">
        <slot
            v-for="(feed, index) in feeds"
            :index="index"
            :feed="feed"
            name="feeds"
        />
        <slot
            :error="error"
            name="error"
        />
    </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
    name: 'VueInstagram',

    props: {
        /*
        * Instagram access token.
        */
        token: {
            type: String,
            required: true,
        },

        /*
        * Numbers of feed.
        */
        count: {
            type: Number,
            default: 3,
            required: false,
        },

        /*
        * Filter by media type, ex: video, image.
        */
        mediaType: {
            type: String,
            required: false,
            default: 'image',
        },

        /*
        * Filter by tags.
        */
        tags: {
            type: Array,
            default: () => [],
            required: false,
        },

        // class for container div
        containerClass: {
            type: String,
            default: '',
            required: false,
        },

    },

    data: () => ({
        error: '',
        feeds: [],
    }),

    mounted() {
        this.getUserFeed()
    },

    methods: {
        getUserFeed() {
            axios.get('https://api.instagram.com/v1/users/self/media/recent', {
                params: { access_token: this.token, count: this.count },
            }).then((response) => {
                if (response.data.meta.code === 400) this.error = response.data.meta
                if (response.data.meta.code === 200) {
                    if (response.data.meta.code === 200) {
                        let { data } = response.data
                        const types = ['image', 'video']

                        if (this.mediaType && types.indexOf(this.mediaType) > -1) {
                            data = _.filter(data, item => this.mediaType === item.type)
                        }

                        if (this.tags.length) {
                            data = _.filter(item => _.intersection(this.tags, item.tags).length)
                        }

                        this.feeds = _.slice(_.values(data), 0, this.count)
                    }
                }
            }).catch((error) => { throw error })
        },

    },

}
</script>

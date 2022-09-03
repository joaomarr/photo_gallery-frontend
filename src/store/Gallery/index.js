import { apolloClient } from '@/apollo'
import posts from '@/graphql/queries/posts'

const state = {
    photos: null
}

const mutations = {
    setPhotos(state, photos) {
        for (let photo in photos) {
            const url = process.env.VUE_APP_AWS_BUCKET_URL + photos[photo].node.file.file
            console.log("loop " + photo, url)
            photos[photo].node.file.file = url
        }
        state.photos = photos
    }
}

const actions = {
    async getPhotos({commit}) {
        const { data: { posts: { edges: photos } } } = await apolloClient.query({ query: posts });
        commit('setPhotos', photos)
    }
}

export default {
    state,
    actions,
    mutations,
}
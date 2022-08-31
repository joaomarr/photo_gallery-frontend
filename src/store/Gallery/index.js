import { apolloClient } from '@/apollo'
import posts from '@/graphql/queries/posts'

const state = {
    photos: null
}

const mutations = {
    setPhotos(state, photos) {
        console.log(photos)
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
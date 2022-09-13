import { apolloClient } from '@/apollo'
import commentPost from '@/graphql/mutations/commentPost'
import toggleLikePost from '@/graphql/mutations/toggleLikePost'
import posts from '@/graphql/queries/posts'

const state = {
    photos: null
}

const mutations = {
    setPhotos(state, photos) {
        for (let photo in photos) {
            const url = process.env.VUE_APP_AWS_BUCKET_URL + photos[photo].node.file.file
            photos[photo].node.file.file = url
        }
        state.photos = photos
    },
    setTempLike(state, postId) {
        state.photos.forEach(photo => { 
            if (photo.node.id === postId) { 
                const likesArr = photo.node.likes
                if (likesArr.length || !likesArr.includes(state.profile.pk)) {
                    likesArr.splice(likesArr.indexOf(state.profile.pk))
                    return
                } else {
                    likesArr.push(state.profile.pk)
                    photo.node.likes = likesArr;
                    return photo.node.likes;
                }
            } 
        })
    },
    setTempComment(state, comment) {
        state.photos.forEach(photo => {
            if (photo.node.id == comment.id) {
                return photo.node.commentSet.edges.push(comment)
            }
         })
    }
}

const actions = {
    async getPhotos({commit}) {
        const { data: { posts: { edges: photos } } } = await apolloClient.query({ query: posts });
        commit('setPhotos', photos)
    },
    async getPhoto(_, id) {
        const photo = this.state.photos.filter(photo => { return photo.node.id === id })
        return photo
    },
    async toggleLikePost({commit}, postId) {
        const { data } = await apolloClient.mutate({ mutation: toggleLikePost, variables: { postId: postId } })
        if (data.success) { commit('setTempLike', postId) }
        return data
    },
    async commentPost({commit}, comment) {
        const { data } = await apolloClient.mutate({ mutation: commentPost, variables: comment })
        if (data.success) { commit('setTempComment', comment) }
        return data
    }
}

export default {
    state,
    actions,
    mutations,
}
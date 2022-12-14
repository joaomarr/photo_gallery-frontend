import { apolloClient } from '@/apollo'
import commentPost from '@/graphql/mutations/commentPost'
import postApproval from '@/graphql/mutations/postApproval'
import toggleLikePost from '@/graphql/mutations/toggleLikePost'
import uploadPost from '@/graphql/mutations/uploadPost'
import posts from '@/graphql/queries/posts'

const state = {
    photos: null,
    toApprove: null,
}

const mutations = {
    setPhotos(state, photos) {
        for (let photo in photos) {
            const url = process.env.VUE_APP_AWS_BUCKET_URL + photos[photo].node.file.file
            photos[photo].node.file.file = url
        }
        state.photos = photos;
    },
    setToApprove(state, photos) { 
        for (let photo in photos) {
            const url = process.env.VUE_APP_AWS_BUCKET_URL + photos[photo].node.file.file
            photos[photo].node.file.file = url
        }
        state.toApprove = photos;
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
        const { data: { posts: { edges: photos } } } = await apolloClient.query({ query: posts, variables: { isApproved: true } });
        commit('setPhotos', photos)
    },
    async getToApprove({commit}) {
        const { data: { posts: { edges: photos } } } = await apolloClient.query({ query: posts, variables: { isApproved: false } });
        commit('setToApprove', photos)
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
    },
    async uploadPost(_, files) {
        let success = true
        for (let file of files) {
            console.log(file)
            const { data } = await apolloClient.mutate({ mutation: uploadPost, variables: { file: file } })
            if (!data.success) { success = false }
        }
        return success
    },
    async postApproval(_, variables) {
        const { data } = await apolloClient.mutate({ 
            mutation: postApproval,
            variables: variables
            })
        return data
    }
}

export default {
    state,
    actions,
    mutations,
}
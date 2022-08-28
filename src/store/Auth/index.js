import Cookies from 'js-cookie'
import { apolloClient, onLogout } from '@/apollo'
import { AUTH_TOKEN_COOKIE_NAME, AUTH_REFRESH_TOKEN_COOKIE_NAME } from '@/constants'

import register from '@/graphql/mutations/register.js'
import login from '@/graphql/mutations/login.js'
import meQuery from '@/graphql/queries/meQuery.js'
import refreshToken from '@/graphql/mutations/refreshToken'

const state = {
    isLoggedIn: !!Cookies.get(AUTH_TOKEN_COOKIE_NAME),
    profile: null
}
const mutations = {
    loginUser(state, userData) {
        state.profile = userData;
    },
    setTokens(state, tokens) {
      Cookies.set(AUTH_REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken)
      Cookies.set(AUTH_TOKEN_COOKIE_NAME, tokens.token)
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.profile = null;
    }
}
const actions = {
    async login(context, userData) {
        const resp = await apolloClient.mutate({
          mutation: login,
          variables: userData
        })
        const refreshToken = resp.data.tokenAuth.refreshToken
        const token = resp.data.tokenAuth.token
        context.commit('setTokens', {refreshToken: refreshToken, token: token})
        context.dispatch('getUser')
      },
      async logout({commit}) {
        await onLogout(apolloClient)
        commit('logout')
      },
      async register(context, userData) {
        userData.username = userData.firstName + ' ' + userData.lastName;
        const resp = await apolloClient.mutate({
          mutation: register,
          variables: userData
        })
        const token = resp.data.register.token;
        const refreshToken = resp.data.register.refreshToken;
        context.commit('setTokens', {refreshToken: refreshToken, token: token})
        context.dispatch('getUser')
      },
      async refreshToken({commit}) {
        const token = {refreshToken: Cookies.get(AUTH_REFRESH_TOKEN_COOKIE_NAME)}
        const resp = await apolloClient.mutate({
          mutation: refreshToken,
          variables: token,
        })
        if (resp.data.refreshToken.token !== null) {
          commit('setTokens', {
            refreshToken: resp.data.refreshToken.refreshToken,
            token: resp.data.refreshToken.token
          })
          return token
        } else {
          await onLogout(apolloClient)
          commit('logout')
          return false
        }   
      },
      async getUser({commit}) {
        const { data: { me }} = await apolloClient.query({ query: meQuery});
        commit("loginUser", me)
      },
}

export default {
    state,
    mutations,
    actions,
}
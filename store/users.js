import {Auth, GoogleAuthProvider, FacebookAuthProvider} from '~/plugins/firebase-client-init.js'
import firebase from 'firebase'
// import admin from 'firebase-admin'
import axios from 'axios'
import setUser from '../helpers/setUser'

function buildUserObject (authData) {
  let { email, displayName, uid, photoURL } = authData.user
  let user = {}
  user['email'] = email
  user['name'] = displayName
  user['uid'] = uid
  user['picture'] = photoURL
  user['isAdmin'] = authData.isAdmin
  return user
}

function buildUserObject (authData) {
  // let user = {}
  // user['email'] = authData.email
  // user['id'] = authData.id
  // user['status'] = 'user'
  // return user
  let user = {
    email: authData.email,
    id: authData.id,
    status: authData.status
  }
  return user
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


export const state = () => ({
	loadedUser: null,
    loadedAllUsers: []
})

export const mutations = {
    setUser (state, payload) {
        state.loadedUser = payload
    },
    setAllUsers (state, payload) {
        state.loadedAllUsers = payload
    }
}

export const actions = {
	// nuxtServerInit ({ commit }, { req }) {
	//     if (req.user) {
	//       	// commit('setUser', req.user)
	//       	commit('users/setUser', req.user, { root: true })
	//     }
 //  	},
    loadedAllUsers ({commit}) {
        try {
            firebase.database().ref('/users/').on('value', function (snapshot) {
                // console.log(snapshot.val())
                const usersArray = []
                for (const key in snapshot.val()) {
                    usersArray.push({ ...snapshot.val()[key]})
                }
                // console.log(postsArray)
                commit('setAllUsers', usersArray)
            })
        } catch(error) {
          console.log(error)
        }
    },
    async updateUserAccount ({commit, state, dispatch}, payload) {
        console.log('async updateUserAccount')
        try {
            // admin.auth().getUserByEmail('test3@test.com').then((user) => {
            //     admin.auth().setCustomUserClaims(user.uid, null)
            // })
            console.log(payload)
            const userEmail = payload.userEmail
            // const uid = payload.uid
            const action = payload.action

            // // this.$axios.$post('/setCustomClaims', {userEmail: userEmail})
            // // $.post('/setCustomClaims', {userEmail: userEmail}, (data, status) => {})
            // // this.$axios({ method: 'post', url: '/setCustomClaims', data: {firstName: 'Fred', lastName: 'Flintstone'}})
            // // await this.$axios.$post('/setCustomClaims', { userEmail: 'jm.kleger@gmail.com' })
            // await this.$axios.$post('/setCustomClaims', { userEmail: userEmail, action: action })
            // // dispatch('updateUser', {status: 'admin'})
            // console.log('successfully called setCustomClaims ' + action + ' method.')
            // console.log('called ' + action)
            // console.log(user2)
            // const userId = "-L9jQ_OL56RapwI3K1C7"
            // const user = state.loadedAllUsers.find(user => user.email === userEmail)
            // console.log(user)

            // if (action == 'userToAdmin') {
            //     dispatch('updateUser', {status: 'admin', id: user.id})
            // } else if (action == 'adminToUser') {
            //     dispatch('updateUser', {status: 'user', id: user.id})
            // }
            // this.$toast.success('Successfully updated ' + userEmail + ' account!')


            return this.$axios.$post('/setCustomClaims', { userEmail: userEmail, action: action }).then((user) => {
              console.log('successfully called setCustomClaims method.')
              console.log('called ' + action)
              console.log(user)

              const user2 = state.loadedAllUsers.find(user => user.email === userEmail)

              if (action == 'userToAdmin') {
                dispatch('updateUser', {status: 'admin', id: user2.id})
              } else if (action == 'adminToUser') {
                dispatch('updateUser', {status: 'user', id: user2.id})
              }
              this.$toast.success('Successfully updated account!')
            })

        }
        catch(error) {
            console.log(error)
        }
    },
    loadedUser ({commit}) {
      console.log('Entering loadedUser')
      const userId = firebase.auth().currentUser.uid
      console.log(userId)
      // console.log(userId)
      // firebase.database().ref('users/' + userId).on('value')
      firebase.database().ref('users/' + userId).on('value', function (snapshot) {
        const userArray = []
          for (const key in snapshot.val()) {
            userArray.push({ ...snapshot.val()[key]})
          }
          commit('setUser', userArray)
      })
    },
    async updateUser ({commit}, payload) {
        try {
          // const userId = firebase.auth().currentUser.uid
          // console.log(userId)
          // let updateObj = payload
          // console.log(updateObj)
          const userId = payload.id
          return firebase.database().ref('/users/' + userId).update(payload)

        } catch(error) {
          console.log(error)
        }
    },
    // updateUserAccountToAdmin ({commit}, payload) {
    //     console.log('async updateUserAccountToAdmin')
    //     console.log(payload)
    //     const userEmail = 'jm.kleger@gmail.com'
    //     this.$axios.$post('/setCustomClaims', {userEmail: userEmail})
    //     // this.$axios.$get('/setCustomClaims')
    //       .then(response => {
    //         console.log('response')
    //       })
    //       .catch(e => {
    //         console.log(e)
    //       })
    // },
    // async checkUserCustomClaim () {
    //     console.log('checkUserCustomClaim')
    //     return 'abc'
    // },
  	async signUserIn ({commit, dispatch}, payload) {
    	console.log(payload)
        commit('setLoading', true, { root: true })
    	try {
      		let authData = await Auth.signInWithEmailAndPassword(payload.email, payload.password)
      		console.log(authData)
            console.log(authData.getIdToken())

            // Check user status based on user token
            let userStatus = Auth.currentUser.getIdToken().then((idToken) => {
                console.log('idToken: ' + idToken)
                const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]))
                // Confirm the user is an Admin.
                console.log(payload)

                if (!!payload['admin']) {
                    console.log('User is admin')
                    // authData['isAdmin'] = true
                    // Push status to database
                    // dispatch('updateUser', {'isAdmin': true})
                } else {
                    console.log('User is not an admin')
                    // authData['isAdmin'] = false
                    // Push status to database
                    // dispatch('updateUser', {'isAdmin': false})
                }
            })
            this.$toast.success('Successfully signed in!')
            // commit('setUser', buildUserObjectFromSignUp(authData))
            commit('setUser', setUser(authData))
            commit('setLoading', false, { root: true })
    	}
    	catch(error) {
      		console.log(error)
      		// commit('setError', error)
      		// commit['errors/setError', error]
      		// commit('../errors/setError', error)
      		// this.$store.commit('errors/setError', error)
      		commit('setError', error, { root: true })
            commit('setLoading', false, { root: true })
    	}
  	},
  	async signUserUp ({commit}, payload) {
    	console.log(payload)
        commit('setLoading', true, { root: true })
    	try {
      		let authData = await Auth.createUserWithEmailAndPassword(payload.email, payload.password)
      		console.log(authData)

            // Save user in database
            const newUserKey = firebase.database().ref().child('/users').push().key
            // firebase.database().ref('/users/' + newUserKey).set({
            //     'email': payload.email,
            //     'id': newUserKey,
            //     'status': 'user'
            // })

            authData['status'] = 'user'
            authData['id'] = newUserKey

            firebase.database().ref('/users/' + newUserKey).set(buildUserObject(authData))

            // Load user in store
      		commit('setUser', buildUserObject(authData))
            this.$toast.success('Successfully signed up!')
            commit('setLoading', false, { root: true })
    	} 
    	catch(error) {
      		console.log(error)
      		// commit('setError', error)
      		commit('setError', error, { root: true })
            commit('setLoading', false, { root: true })
    	}
  	},
  	async signInWithGooglePopup ({commit}) {
    	commit('setLoading', true)
    	let authData = await Auth.signInWithPopup(GoogleAuthProvider)
    	commit('setUser', buildUserObject(authData))

      let userStatus = Auth.currentUser.getIdToken().then((idToken) => {
        console.log('idToken: ' + idToken)
        const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]))
        // Confirm the user is an Admin.
        console.log(payload)

        if (!!payload['admin']) {
            console.log('User is admin')
            authData['isAdmin'] = true
        } else {
            console.log('User is not an admin')
            authData['isAdmin'] = false
        }
      })
    	commit('setLoading', false)
  	},
  	async signInWithFacebookPopup ({commit}) {
    	commit('setLoading', true)
    	let authData = await Auth.signInWithPopup(FacebookAuthProvider)
    	commit('setUser', buildUserObject(authData))
    	commit('setLoading', false)
  	},
  	async signOut ({commit}) {
    	await Auth.signOut()
    	commit('setUser', null)
  	}
}

export const getters = {
	loadedUser (state) {
        return state.loadedUser
    },
    loadedAllUsers (state) {
        return state.loadedAllUsers
    }
}
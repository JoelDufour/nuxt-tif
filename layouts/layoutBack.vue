<template>
  <div>
    <v-app v-if="loadingPage">
      <main>
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-container fill-height>
              <v-layout align-center justify-center>
                <v-progress-circular indeterminate color="primary" :size="150"></v-progress-circular>
              </v-layout>
            </v-container>
          </v-layout>
        </v-container>
      </main>
    </v-app>

    <v-app id="inspire" v-else>
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        v-model="drawer"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="item.heading"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                @click=""
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else @click="" :key="item.text" :to="item.to" :exact="item.exact">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                  <!-- <nuxt-link class="" :to="item.to">{{ item.text }}</nuxt-link> -->
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="primary"
        dark
        app
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <!-- <span class="hidden-sm-and-down" @click="backToSite">Retour au site</span> -->
          <v-btn color="success" class="hidden-sm-and-down" @click="backToSite">Retour au site</v-btn>
          <v-icon class="hidden-md-and-up" @click="backToSite">arrow_back</v-icon>
          <!-- <nuxt-link class="hidden-sm-and-down" to="/" style="color: #fff;">Retour au site</nuxt-link> -->
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <span v-if="user">{{ user.email }}</span>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn color="error" @click="logout">Logout</v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <img
              src="https://vuetifyjs.com/static/doc-images/logo.svg"
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <nuxt/>
      </v-content>
      <!-- <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.stop="dialog = !dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title
            class="grey lighten-4 py-4 title"
          >
            Create contact
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img
                      src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                      alt=""
                    >
                  </v-avatar>
                  <v-text-field
                    placeholder="Name"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-icon="business"
                  placeholder="Company"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  placeholder="Job title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="mail"
                  placeholder="Email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  type="tel"
                  prepend-icon="phone"
                  placeholder="(000) 000 - 0000"
                  mask="phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="notes"
                  placeholder="Notes"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn flat color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-app>
  </div>
</template>

<script>
  // import '~/assets/css/main.css'
  // import '~/assets/css/app.styl'
  import store from '~/store/index.js'
  export default {
    head: {
      script: [
        // { src: 'https://use.fontawesome.com/releases/v5.0.9/js/all.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' },
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
      ]
    },
    middleware: ['auth-check'],
    created() {
        setTimeout(() => {
          // console.log('abc')
          this.loadingPage = false
        }, 1000)
    },
    asyncData () {
      return {
          // loading: false,
      }
    },
    data: () => ({
      dialog: false,
      drawer: null,
      loadingPage: true,
      items: [
        { icon: 'dashboard', text: 'Dashboard', to: '/admin', exact: true },
        { icon: 'contacts', text: 'Users', to: '/admin/users', exact: false },
        { icon: 'event', text: 'Events', to: '/admin/events', exact: false },
        { icon: 'fa fa-user', text: 'Competitions', to: '/admin/competitions', exact: false },
        { icon: 'event', text: 'Teams', to: '/admin/teams', exact: false },
        { icon: 'history', text: 'Placeholder 1', to: '', exact: false },
        { icon: 'content_copy', text: 'Placeholder 2', to: '', exact: false },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Placeholder 3',
          model: false,
          children: [
            { text: 'Placeholder 3.1', to: '', exact: false },
            { text: 'Teams', to: '/admin/teams', exact: false }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Placeholder 4',
          model: false,
          children: [
            { text: 'Placeholder 4.1', to: '', exact: false },
            { text: 'Placeholder 4.2', to: '', exact: false },
            { text: 'Placeholder 4.3', to: '', exact: false },
            { text: 'Placeholder 4.4', to: '', exact: false },
            { text: 'Placeholder 4.5', to: '', exact: false }
          ]
        },
        { icon: 'settings', text: 'Placeholder 5', to: '', exact: false },
        { icon: 'chat_bubble', text: 'Placeholder 6', to: '', exact: false },
        { icon: 'help', text: 'Placeholder 7', to: '', exact: false },
        { icon: 'phonelink', text: 'Placeholder 8', to: '', exact: false },
        { icon: 'keyboard', text: 'Placeholder 9', to: '', exact: false }
      ]
    }),
    props: {
        source: String,
        to: String
    },
    computed: {
      user () {
        // return this.$store.getters.activeUser
        return this.$store.getters['users/loadedUser']
      }
    },
    methods: {
      clickTile(item) {
        console.log(item)
      },
      backToSite () {
        // this.$store.commit('setLoadingPage', false, { root: true })
        // let timer = setTimeout(function() {
        //   self.$store.commit('setLoadingPage', true, { root: true })
        // }, 2000)
        this.$router.push('/home')
      },
      logout () {
        this.$store.dispatch('users/signOut').then(() => {
          // alert('Vous allez effacer votre session!')
          this.$router.push('/')

          // setTimeout(function() {
            
          // }, 2000)
        })
      }
    }
  }
</script>

<style scoped>
  .application.theme--light a {
    text-decoration: none;
  }
  .toast {
    font-size: 2em;
  }
</style>
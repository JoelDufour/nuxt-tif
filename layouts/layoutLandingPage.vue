<template>
	<div>
		<nuxt/>
	</div>
</template>

<script>
	// import { mapGetters } from 'vuex'
	export default {
		head: {
		    script: [
		      	// { src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
      			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' },
      			// { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' }
      			{ src: 'https://use.edgefonts.net/bangers.js' },
		    ],
		    link: [
      			{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' },
      			// { rel: 'stylesheet', href: '/css/bootstrap-min.css' },
      			{ rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      			{ rel: 'stylesheet', href: '/css/styles.css' },
		    ],
		    // css: [
		    // 	{ src: '~/assets/css/styles.css', lang: 'css' }
		    // ]
		},
		middleware: ['unauth-check'],
		// created() {
	 //        setTimeout(() => {
	 //          this.loadingPage = false
	 //        }, 1000)
	 //    },
		data () {
			return {
				// loadingPage: false,
				links_en: [
			        { icon: 'home', name: 'Welcome', to: '/' },
			        { icon: 'info', name: 'About', to: '/about' },
			        { icon: 'info', name: 'Blog', to: '/blog' },
			        { icon: 'info', name: 'Login', to: '/login' },
			        // { icon: 'person', name: 'Admin', to: '/admin' },
			    ],
			    links_fr: [
			        { icon: 'home', name: 'Bienvenue', to: '/fr' },
			        { icon: 'info', name: 'A propos', to: '/fr/a-propos' },
			        { icon: 'info', name: 'Blog', to: '/fr/blog' },
			        { icon: 'info', name: 'Login', to: '/fr/login' },
			        // { icon: 'person', name: 'Administration', to: '/fr/administration' },
			    ],
			    links_de: [
			        { icon: 'home', name: 'Willkommen', to: '/de' },
			        { icon: 'info', name: 'Über uns', to: '/de/uber-uns' },
			        { icon: 'info', name: 'Blog', to: '/de/blog' },
			        { icon: 'info', name: 'Login', to: '/de/login' },
			        // { icon: 'person', name: 'Verwaltung', to: '/de/verwaltung' },
			    ]
			}
		},
		// computed: {
		// 	user() {
		// 		return this.$store.getters.activeUser
		// 	},
		// 	lang() {
		// 		return this.$i18n.locale
		// 	}
		// },
		computed: {
            user() {
            	return this.$store.getters['users/loadedUser']
            },
            lang() {
				return this.$i18n.locale
			},
			loadingPage () {
                return this.$store.getters['loadingPage']
            }
        },
		methods: {
			logout () {
		      	// this.$store.dispatch('signOut').then(() => {
		       //  	alert('Vous allez effacer votre session!')
		       //  	this.$router.push('/')
		      	// })
		      	this.$store.dispatch('users/signOut').then(() => {
		        	// alert('Vous allez effacer votre session!')
		        	this.$router.push('/')
		      	})
		    }
		}
	}
</script>

<style>
	/* Stackoverflow preview fix, please ignore */
    .navbar-nav {
      flex-direction: row;
    }
    
    .nav-link {
      padding-right: .5rem !important;
      padding-left: .5rem !important;
    }
    
    /* Fixes dropdown menus placed on the right side */
    .ml-auto .dropdown-menu {
      left: auto !important;
      right: 0px;
    }

    .isActive {
    	color: red;
    }
</style>
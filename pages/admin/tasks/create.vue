<template>
	<div>
		<v-breadcrumbs divider="/">
	  		<v-breadcrumbs-item
		        v-for="link in links"
		        :key="link.text"
		        :disabled="link.disabled"
		        :to="link.to"
		        :exact="true"
		      >
	    		{{ link.text }}
	  		</v-breadcrumbs-item>
		</v-breadcrumbs>
		<v-flex xs12 sm6 offset-sm3>
			<br /><br />
			<v-card>
				<v-form>
					<v-card-title class="primary-title">
						<v-card-text class="text-md-center">
							<h2>Créer une tâche</h2>
						</v-card-text>
					</v-card-title>
					<v-container fluid>
					    <v-layout row wrap class="px-3">
					    	<v-flex xs12>
					    		<!-- Titre -->
					    		<v-flex xs12>
									<v-text-field
								      label="Titre"
								      v-model="title"
								      :counter="40"
								      required
								    ></v-text-field>
								</v-flex>
							    
							    <!-- Description -->
							    <v-flex xs12>
								    <v-text-field
								      label="Description"
								      v-model="description"
								      multi-line
								      required
								    ></v-text-field>
								</v-flex>
							    
							    <!-- Statut -->
							    <v-flex xs12>
								    <v-select
							          :items="allStatus"
							          v-model="status"
							          label="Statut"
							          item-text="name"
							          item-value="{}"
							        ></v-select>
							    </v-flex>
								
								<!-- Responsable(s) -->							    
						        <v-flex xs12>
							        <v-select
							          label="Responsable(s)"
							          :items="allUsers"
							          v-model="users"
							          item-text="name"
							          item-value="name"
							          multiple
							          chips
							          max-height="auto"
							          autocomplete
							        >
							          <template slot="selection" slot-scope="data">
							            <v-chip
							              close
							              @input="data.parent.selectItem(data.item)"
							              :selected="data.selected"
							              class="chip--select-multi"
							              :key="JSON.stringify(data.item)"
							            >
							              <v-avatar>
							                <img :src="data.item.avatar">
							              </v-avatar>
							              {{ data.item.name }}
							            </v-chip>
							          </template>
							          <template slot="item" slot-scope="data">
							            <template>
							              <v-list-tile-avatar>
							                <img :src="data.item.avatar">
							              </v-list-tile-avatar>
							              <v-list-tile-content>
							                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
							                <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
							              </v-list-tile-content>
							            </template>
							          </template>
							        </v-select>
							    </v-flex>
								
								<!-- Date de début -->
								<v-flex xs12>
								    <v-dialog
									  ref="startDateDialog"
									  persistent
									  v-model="modalStartDate"
									  lazy
									  full-width
									  width="290px"
									  :return-value.sync="date"
									>
									  <v-text-field
									    slot="activator"
									    label="Choisissez une date de début"
									    v-model="startDate"
									    prepend-icon="date_range"
									    readonly
									  ></v-text-field>
									  <v-date-picker locale="fr-fr" :first-day-of-week="1" v-model="startDate" actions>
									    <v-spacer></v-spacer>
									    <v-btn flat color="primary" @click="modalStartDate = false">Annuler</v-btn>
									    <v-btn flat color="primary" @click="$refs.startDateDialog.save(date)">OK</v-btn>
									  </v-date-picker>
									</v-dialog>
								</v-flex>

							    <!-- Date de fin -->
							    <v-flex xs12>
								    <v-dialog
									  ref="endDateDialog"
									  persistent
									  v-model="modalEndDate"
									  lazy
									  full-width
									  width="290px"
									  :return-value.sync="date"
									>
									  <v-text-field
									    slot="activator"
									    label="Choisissez une date de fin"
									    v-model="endDate"
									    prepend-icon="date_range"
									    readonly
									  ></v-text-field>
									  <v-date-picker locale="fr-fr" :first-day-of-week="1" v-model="endDate" actions>
									    <v-spacer></v-spacer>
									    <v-btn flat color="primary" @click="modalEndDate = false">Annuler</v-btn>
									    <v-btn flat color="primary" @click="$refs.endDateDialog.save(date)">OK</v-btn>
									  </v-date-picker>
									</v-dialog>
								</v-flex>
							    
							    <!-- Progression -->
							    <v-flex xs12>
							    	<p>Progression: {{ this.progress }}%</p>
								    <v-progress-linear :value="progress" height="15" :color="progressBarColor" v-model="progress"></v-progress-linear>
	                        		<div class="text-md-center">
									    <v-btn fab small color="error" @click="remove10OfProgressBar" :disabled="progress <= 0"><v-icon style="height: 20px;">remove</v-icon></v-btn>
									    <v-btn fab small color="success" @click="add10ToProgressBar" :disabled="progress >= 100"><v-icon style="height: 20px;">add</v-icon></v-btn>
									</div>
                        		</v-flex>
							</v-flex>
						</v-layout>
				  	</v-container>
				  	<v-card-text class="text-md-center">
				  		<v-btn @click="submitCreateTask" color="info">submit</v-btn>
    					<v-btn @click="">clear</v-btn>
    				</v-card-text>
				</v-form>
			</v-card>
		</v-flex>
	</div>
</template>

<script>
	import moment from 'moment'
  	import VueNotifications from 'vue-notifications'
  	// import noUiSlider from 'vue-nouislider'
  	// import 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.3.0/nouislider.min.css'
  	// import 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.3.0/nouislider.min.js'
  	// import noUiSlider from 'nouislider'
  	import Noty from 'noty'
	export default {
		layout: 'layoutBack',
		created () {
			new Noty({type: 'success', layout: 'topRight', text: 'Some notification text', timeout: 5000, theme: 'metroui'}).show()
		},
		data () {
			return {
				title: '',
				description: '',
				allStatus: [{
		            name: 'A faire',
		            color: '#428bca',
		            class: 'info'
		          },
		          {
		            name: 'En cours',
		            color: '#5bc0de',
		            class: 'primary'
		          },
		          {
		            name: 'Terminé',
		            color: '#5cb85c',
		            class: 'success'
		          },
		          {
		            name: 'En suspens',
		            color: '#f0ad4e',
		            class: 'warning'
		          },
		          {
		            name: 'Annulé',
		            color: '#d9534f',
		            class: 'error'
		          }
		        ],
		        links: [
			        {
			          text: 'Dashboard',
			          to: '/admin',
			          disabled: false
			        },
			        {
			          text: 'Tasks',
			          to: '/admin/tasks',
			          disabled: false
			        },
			        {
			          text: 'Create',
			          disabled: true
			        }
			    ],
			    allUsers: [
		          { name: 'Basil', group: 'Admin', avatar: '/images/avatar1.png' },
		          { name: 'Gaël', group: 'Admin', avatar: '/images/avatar1.png' },
		          { name: 'Joël', group: 'Admin', avatar: '/images/avatar1.png' },
		          { name: 'Jean-Marc', group: 'Admin', avatar: '/images/avatar1.png' },
		        ],
		        status: '',
				users: [],
				date: null,
		        modalStartDate: false,
		        startDate: null,
		        modalEndDate: false,
		        endDate: null,
		        progress: 0
			}
		},
		computed: {
			progressBarColor () {
				return this.status ? this.status.class : 'info'
			}
		},
		methods: {
			formattedDate (date) {
		    	// Takes a string date with format DD.MM.YYYY and first transform it to YYYY-MM-DD and then to timestamp
		    	if (date) {
		    		const [day, month, year] = date.split(".")
					const reOrderedDate = year + '-' + month + '-' + day
			    	const formattedDate = parseInt(moment(reOrderedDate).format('x')/1000)
			    	return formattedDate
			    }
		    },
			submitCreateTask () {
				console.log('submitCreateTask')
				const startDate_as_timestamp = this.formattedDate(this.startDate)
				const endDate_as_timestamp = this.formattedDate(this.endDate)
				const taskData = {
					title: this.title,
					description: this.description,
					status: this.status,
					users: this.users,
					startDate: startDate_as_timestamp,
					endDate: endDate_as_timestamp,
					progress: this.progress,
				}
				console.log(taskData)
				this.$store.dispatch('tasks/createTask', taskData)
			},
			add10ToProgressBar () {
				this.progress += 10
			},
			remove10OfProgressBar () {
				this.progress -= 10
			}
		},
		watch: {
		}
	}
</script>

<style scoped>

</style>
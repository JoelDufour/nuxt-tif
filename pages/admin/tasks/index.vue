<template>
	<v-layout>
	    <v-flex xs12 sm10 offset-sm1>
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
	      	<v-card class="mt-4">
		        <v-card-title primary-title class="text-md-center">
		          <v-card-text class="text-md-center">
		            <h3 class="headline mb-0">Toutes les tâches</h3>
		            <br />
		            <v-btn color="primary" dark slot="activator" class="mb-2" to="/admin/tasks/create">Ajouter une tâche</v-btn>
		          </v-card-text>
		        </v-card-title>
		        <v-card-text>
		          <v-data-table :headers="headers" :items="loadedTasks">
			        <template slot="items" slot-scope="props">
			          <td>{{ props.index + 1 }}</td>
			          <td>{{ props.item.title }}</td>
			          <td>{{ props.item.description }}</td>
			          <!-- <td>{{ props.item.users }}</td> -->
			          <td>
			            <span v-for="(user, index) in props.item.users">{{user}}<span v-if="index < props.item.users.length - 1">,&nbsp;</span></span>
			          </td>
			          <!-- <td>{{ props.item.status }}</td> -->
			          <td><v-chip :color="props.item.status.class" text-color="white" style="height: 26px;">{{ props.item.status.name }}</v-chip></td>
			          <!-- <td>{{ props.item.progress }}</td> -->
			          <td><v-progress-linear :value="props.item.progress" height="15" :color="props.item.status.class"></v-progress-linear></td>
			          <td>{{ props.item._created_at | moment("DD MMMM YYYY") }}</td>
			          <td>{{ props.item._updated_at | moment("DD MMMM YYYY") }}</td>
			          <!-- <td class="justify-center layout px-0">
			            <v-btn icon class="mx-0" @click="editItem(props.item)">
			              <v-icon color="teal">edit</v-icon>
			            </v-btn>
			            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
			              <v-icon color="pink">delete</v-icon>
			            </v-btn>
			          </td> -->
			          <td class="">
			            <v-btn icon class="" :to="'/admin/events/' + props.item.id" :id="props.item.id">
			              <v-icon color="teal">edit</v-icon>
			            </v-btn>
			            <v-btn icon class="" @click="deleteTask(props.item.id)">
			              <v-icon color="pink">delete</v-icon>
			            </v-btn>
			          </td>
			        </template>
		          </v-data-table>
		        </v-card-text>
		    </v-card>
	    </v-flex>
    </v-layout>
</template>

<script>
	export default {
		layout: 'layoutBack',
		props: ['id'],
		created () {
			this.$store.dispatch('tasks/loadedTasks')
		},
		data () {
			return {
				links: [
					{
						text: 'Dashboard',
						to: '/admin/',
						disabled: false
					}, 
					{
						text: 'Tasks',
						to: '/admin/tasks',
						disabled: false
					}
				],
				headers: [
		            { text: 'N°', align: 'left', sortable: false, value: 'id' },
		            { text: 'Titre', value: 'title' },
		            { text: 'Description', value: 'description' },
		            { text: 'Responsable', value: 'user' },
		            { text: 'Statut', value: 'status' },
		            { text: 'Progression', value: 'progress' },
		            { text: 'Créé le', value: '_created_at'},
		            { text: 'Dernière modification', value: '_updated_at' },
		            { text: 'Actions', sortable: false }
		        ]
			}
		},
		computed: {
			loadedTasks () {
        		return this.$store.getters['tasks/loadedTasks']
			}
		},
		methods: {
			deleteTask (taskId) {
				console.log(taskId)
		        this.$swal({
		          title: 'Etes-vous sûr?',
		          text: "Vous ne pourrez plus récupérer cette utilisateur!",
		          type: 'warning',
		          showCancelButton: true,
		          confirmButtonText: 'Oui, supprimer!',
		          cancelButtonText: 'Non, annuler!',
		          confirmButtonClass: 'btn btn-success',
		          cancelButtonClass: 'btn btn-danger',
		          reverseButtons: true,
		          focusCancel: true
		        }).then((result) => {
		          if (result.value) {
		            this.$store.dispatch('tasks/deleteTask', taskId)
		            this.$swal(
		              'Supprimé!',
		              'Elément supprimé.',
		              'success'
		            )
		          } else if (result.dismiss === 'cancel') {
		            this.$swal(
		              'Annulé',
		              'Aucun changement',
		              'error'
		            )
		          }
		        })
			}
		}
	}
</script>
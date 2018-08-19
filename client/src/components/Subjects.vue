<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 class="elevation-2">
      <v-card class="blue elevation-3" flat dark>
        <v-card-title class="display-1">
          Materias
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            hide-details
            label="Buscar"
            single-line>
          </v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn
              slot="activator"
              color="blue"
              dark
              class="mr-2 mt-2"
              light
              medium
              right
              middle
              fab>
              <v-icon>add</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-select
                        :items="semesters"
                        label="Semestre"
                        v-model="editedItem.semester"
                        solo
                        required
                        :rules="[required]"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md8>
                      <v-text-field
                        v-model="editedItem.subject"
                        label="Materia"
                        required
                        :rules="[required]">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click.native="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" @click.native="createSubject">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-divider
        class="mx-2"
        inset
        vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="subjects"
        :search="search"
        :pagination.sync="pagination"
        hide-actions
        class="white headline">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center subheading">{{ props.item.semester }}</td>
          <td class="text-xs-left subheading">{{ props.item.subject }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              color="success"
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              color="red"
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            No se han encontrado materias en la base de datos.
          </v-alert>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Su intento de buscar "{{ search }}" no arrojo resultados.
        </v-alert>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-flex>
    <snack-bar>
    </snack-bar>
    <!-- <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :right="true"
      :top="true"
      :color="color"
      :vertical="true"
    >
      {{ text }}
      <v-btn
        color="color"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar> -->
  </v-layout>
</template>
<script>
import SubjectsService from '@/services/SubjectsService'
import SnackBar from '@/components/SnackBar'
export default {
  data () {
    return {
      snackbar: false,
      text: '',
      color: '',
      semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      dialog: false,
      search: '',
      pagination: {},
      subjects: [],
      headers: [
        {
          text: 'Semestre ',
          align: 'left',
          sortable: true,
          value: 'semester',
          width: '40px',
          class: 'title'
        },
        {
          text: 'Materia',
          align: 'left',
          sortable: false,
          value: 'subject',
          class: 'title'
        },
        {
          text: 'Opciones',
          align: 'center',
          sortable: false,
          value: 'options',
          width: '50px',
          class: 'title'
        }
      ],
      editedIndex: -1,
      editedItem: {
        semester: '',
        subject: '',
        status: 1
      },
      defaultItem: {
        semester: '',
        subject: '',
        status: 1
      },
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    SnackBar
  },
  methods: {
    // Crear materia
    async createSubject () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.editedItem)
        .every(key => !!this.editedItem[key])
      if (!areAllFieldsFilledIn) {
        // this.snackbar = true
        // this.color = 'primary'
        // this.text = 'Seleccione semestre e ingrese el nombre de la materia.'
        return
      }
      try {
        await SubjectsService.post(this.editedItem)
        this.getSubjects()
        this.close()
        this.$store.dispatch('setSnackBar', true, 'success', 'Materia creada exitosamente.')
        // this.snackbar = true
        // this.color = 'success'
        // this.text = 'Materia creada exitosamente.'
      } catch (err) {
        // this.snackbar = true
        // this.color = 'error'
        // this.text = 'Error al intentar crear la materia.'
        console.log(err)
      }
    },
    // Obtener todas las materias
    async getSubjects () {
      this.subjects = (await SubjectsService.index()).data
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  },
  computed: {
    // Obtener numeración para mostrar en la paginación
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    // Titulo del formato para agregar o editar materia
    formTitle () {
      return this.editedIndex === -1 ? 'Agregar Materia' : 'Editar Materia'
    }
  },
  watch: {
    // Actualizar la cantidad de materias que se muestran
    subjects () {
      this.$nextTick(() => {
        this.pagination.totalItems = this.subjects.length
      })
    },
    // Mostrar u ocultar el dialogo para agregar o editar materias
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    // Obtener materias
    this.getSubjects()
  }
}
</script>
<style>
</style>

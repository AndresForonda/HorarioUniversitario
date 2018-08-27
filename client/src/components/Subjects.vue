<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2 class="elevation-2">
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
              class="mr-2 mt-2"
              medium
              right
              middle
              fab>
              <v-icon color="white">add</v-icon>
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
                        v-model="editedSubject.semester_id"
                        solo
                        required
                        :rules="[required]"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md8>
                      <v-text-field
                        v-model="editedSubject.subject"
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
                <v-btn color="blue darken-1" dark @click.native="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" dark @click.native="createSubject">Guardar</v-btn>
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
        :rows-per-page-text="filas"
        :pagination.sync="pagination"
        class="headline">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center subheading">{{ props.item.semester_id }}</td>
          <td class="text-xs-left subheading">{{ props.item.subject }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              color="success"
              class="mr-2"
              @click="editSubject(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteSubject(props.item)"
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
        <template slot="pageText" slot-scope="props">
          Mostrando {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
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
    </v-snackbar>
  </v-layout>
</template>
<script>
import SubjectsService from '@/services/SubjectsService'
import SemestersService from '@/services/SemestersService'
export default {
  data () {
    return {
      snackbar: false,
      text: '',
      color: '',
      filas: 'Materias por página',
      semesters: [],
      dialog: false,
      search: '',
      pagination: {},
      sem: {},
      subjects: [],
      headers: [
        {
          text: 'Semestre ',
          align: 'left',
          sortable: true,
          value: 'semester_id',
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
      editedSubject: {
        semester_id: '',
        subject: '',
        lower_subject: ''
      },
      defaultSubject: {
        semester_id: '',
        subject: '',
        lower_subject: ''
      },
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    // Borrar materia
    async deleteSubject (item) {
      const subjectDel = item.id
      try {
        if (confirm('Are you sure you want to delete this item?') && await SubjectsService.delete(subjectDel)) {
          this.callSnackBar(true, 'success', 'Materia eliminada exitosamente')
          this.getSubjects()
        }
      } catch (err) {
        this.callSnackBar(true, 'error', 'Error al intentar eliminar la materia.')
      }
    },
    // Crear materia
    async createSubject () {
      this.error = null
      this.editedSubject.lower_subject = this.editedSubject.subject.toLowerCase().trim()
      const areAllFieldsFilledIn = Object
        .keys(this.editedSubject)
        .every(key => !!this.editedSubject[key])
      if (!areAllFieldsFilledIn) {
        this.callSnackBar(true, 'primary', 'Seleccione semestre e ingrese el nombre de la materia.')
        return
      }
      if (this.editedIndex > -1) {
        try {
          await SubjectsService.put(this.editedSubject)
          this.callSnackBar(true, 'success', 'Materia actualizada exitosamente')
          this.getSubjects()
          this.close()
        } catch (err) {
          this.callSnackBar(true, 'error', 'Error al intentar actualizar la materia, verifique que no haya sido creada previamente.')
        }
      } else {
        try {
          await SubjectsService.post(this.editedSubject)
          this.callSnackBar(true, 'success', 'Materia creada exitosamente')
          this.getSubjects()
          this.close()
        } catch (err) {
          this.callSnackBar(true, 'error', 'Error al intentar crear la materia, verifique que no haya sido creada previamente.')
        }
      }
    },
    // Obtener todas las materias
    async getSubjects () {
      this.subjects = (await SubjectsService.index()).data
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedSubject = Object.assign({}, this.defaultSubject)
        this.editedIndex = -1
      }, 300)
    },
    callSnackBar (status, color, text) {
      this.snackbar = status
      this.color = color
      this.text = text
    },
    editSubject (item) {
      this.editedIndex = item.id
      this.editedSubject = Object.assign({}, item)
      this.dialog = true
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
    // Titulo del formulario para agregar o editar materia
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
    if (!this.$store.state.login.isUserLoggedIn) {
      this.$router.push({
        name: 'root'
      })
    }
    this.sem = await SemestersService.index()
    this.semesters = this.sem.data.map((value, index, array) => {
      return value.id
    })
  }
}
</script>
<style>
  html {
    overflow: auto
  }
</style>

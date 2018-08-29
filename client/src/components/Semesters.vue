<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 md8 offset-md2 offset-sm1 class="elevation-2">
      <v-card class="blue elevation-3" flat dark>
        <v-card-title class="display-1">
          Semestres
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Editar Semestre</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <div>
                      <v-select
                        :items="semestersIds"
                        label="Semestre"
                        v-model="editedSemester.id"
                        solo
                        required
                        :rules="[required]">
                      </v-select>
                    </div>
                    <v-flex xs12 sm6 md8>
                      <v-checkbox
                        v-model="editedSemester.grupo_a"
                        label="Grupo A">
                      </v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md8>
                      <v-checkbox
                        v-model="editedSemester.grupo_b"
                        label="Grupo B">
                      </v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md8>
                      <v-checkbox
                        v-model="editedSemester.grupo_c"
                        label="Grupo C">
                      </v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" dark @click.native="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" dark @click.native="saveEditedSemester">Guardar</v-btn>
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
        :items="semesters"
        :rows-per-page-items=[10]
        :rows-per-page-text="filas"
        hide-actions
        :pagination.sync="pagination"
        class="headline">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center subheading">{{ props.item.id }}</td>
          <td class="text-xs-center subheading">{{ props.item.grupo_a }}</td>
          <td class="text-xs-center subheading">{{ props.item.grupo_b }}</td>
          <td class="text-xs-center subheading">{{ props.item.grupo_c }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              color="success"
              class="mr-2"
              @click="editSemester(props.item)"
            >
              edit
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            No se han encontrado semestres en la base de datos.
          </v-alert>
        </template>
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
import SemestersService from '@/services/SemestersService'
export default {
  data () {
    return {
      snackbar: false,
      text: '',
      color: '',
      filas: 'Semestres por página',
      semesters: [],
      dialog: false,
      pagination: {},
      semestersIds: [],
      sem: {},
      headers: [
        {
          text: 'Semestre ',
          align: 'center',
          sortable: false,
          value: 'semester_id',
          width: '40px',
          class: 'title'
        },
        {
          text: 'Grupo A',
          align: 'center',
          sortable: false,
          value: 'group_a',
          class: 'title'
        },
        {
          text: 'Grupo B',
          align: 'center',
          sortable: false,
          value: 'group_b',
          class: 'title'
        },
        {
          text: 'Grupo C',
          align: 'center',
          sortable: false,
          value: 'group_c',
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
      editedSemester: {
        id: '',
        grupo_a: false,
        grupo_b: false,
        grupo_c: false
      },
      defaultSemester: {
        id: '',
        grupo_a: false,
        grupo_b: false,
        grupo_c: false
      },
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    // Obtener todos los semestres y mapearlos para saber si esta o no activo un grupo
    async getSemesters () {
      this.sem = await SemestersService.index()
      this.semesters = this.sem.data.map((value, index, array) => {
        return {
          id: value.id,
          grupo_a: value.grupo_a ? 'Activo' : 'Inactivo',
          grupo_b: value.grupo_b ? 'Activo' : 'Inactivo',
          grupo_c: value.grupo_c ? 'Activo' : 'Inactivo'
        }
      })
      this.semestersIds = this.sem.data.map((value, index, array) => {
        return value.id
      })
    },
    async saveEditedSemester () {
      try {
        await SemestersService.put(this.editedSemester)
        this.callSnackBar(true, 'success', 'Semester actualizado exitosamente')
        this.getSemesters()
        this.close()
      } catch (err) {
        this.callSnackBar(true, 'error', 'Error al intentar actualizar el semestre.')
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedSemester = Object.assign({}, this.defaultSemester)
      }, 300)
    },
    callSnackBar (status, color, text) {
      this.snackbar = status
      this.color = color
      this.text = text
    },
    editSemester (item) {
      this.editedSemester = Object.assign({}, {
        id: item.id,
        grupo_a: (item.grupo_a === 'Activo') ? 1 : 0,
        grupo_b: (item.grupo_b === 'Activo') ? 1 : 0,
        grupo_c: (item.grupo_c === 'Activo') ? 1 : 0
      })
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
    }
  },
  watch: {
    // Mostrar u ocultar el dialogo para agregar o editar materias
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    // Obtener semestres
    this.getSemesters()
    if (!this.$store.state.login.isUserLoggedIn) {
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>
<style>
  html {
    overflow: auto
  }
</style>

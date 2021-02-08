<template>
  <div>
    <v-card color="white" min-height="822">
      <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title class="pl-7">Register</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header class="elevation-0">
          <template v-for="n in steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              edit-icon="mdi-check"
              editable
              color="secondary"
            >
            </v-stepper-step>

            <v-divider v-if="n !== steps" :key="n"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items class="mt-n5">
          <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
            <v-card tile elevation="0" v-if="n === 1">
              <UploadeImage
                ref="addpetDialog"
                v-bind:width="250"
                v-bind:height="250"
              ></UploadeImage>
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="txtbold primary--text pb-3">Name for Display</div>
                <v-row class="mx-0">
                  <v-textarea
                    clearable
                    :rules="requireRule"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="nickname"
                    label="Nickname"
                  ></v-textarea>
                </v-row>

                <div class="txtbold primary--text pb-3">Contact</div>

                <v-row class="mx-0">
                  <v-textarea
                    disabled
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="oneEmail"
                    label="One Email"
                  ></v-textarea>
                  <v-textarea
                    :rules="emailRules"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="email"
                    label="Email"
                  ></v-textarea>

                  <v-textarea
                    :rules="numericRules"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="mobile"
                    label="Mobile Number"
                  ></v-textarea>
                </v-row>
              </v-form>
            </v-card>

            <v-card tile elevation="0" v-if="n === 2">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="txtbold primary--text pb-3">Name (TH)</div>
                <v-row class="mx-0">
                  <v-autocomplete
                    :rules="requireRule"
                    v-model="prefixNameTH"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    label="Prefix Name (TH)"
                    :items="prefixnameTHlist"
                    clearable
                  ></v-autocomplete>

                  <v-textarea
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="firstNameTH"
                    label="First Name (TH)"
                  ></v-textarea>

                  <v-textarea
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="lastNameTH"
                    label="Last Name (TH)"
                  ></v-textarea>
                </v-row>
                <div class="txtbold primary--text pb-3">Name (EN)</div>
                <v-row class="mx-0">
                  <v-autocomplete
                    :rules="requireRule"
                    v-model="prefixNameEN"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    label="Prefix Name (EN)"
                    :items="prefixnameENlist"
                    clearable
                  ></v-autocomplete>

                  <v-textarea
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="firstNameEN"
                    label="First Name (EN)"
                  ></v-textarea>

                  <v-textarea
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="lastNameEN"
                    label="Last Name (EN)"
                  ></v-textarea>
                </v-row>
                <div class="txtbold primary--text pb-3">Gender</div>
                <v-row class="mx-0">
                  <v-autocomplete
                    :rules="requireRule"
                    v-model="gender"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    label="Gender"
                    :items="genderlist"
                    clearable
                  ></v-autocomplete>
                </v-row>
                <div class="txtbold primary--text pb-3">Birth Date</div>
                <v-row class="mx-0">
                  <v-textarea
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="birthDate"
                    label="Birth Date"
                  ></v-textarea>
                </v-row>
              </v-form>
            </v-card>

            <v-card tile elevation="0" v-if="n === 3">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="txtbold primary--text pb-3">Country</div>
                <v-row class="mx-0">
                  <v-autocomplete
                    :rules="requireRule"
                    v-model="country"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    label="Country"
                    :items="countrylist"
                    clearable
                  ></v-autocomplete>

                  <v-textarea
                    v-if="country === 'Other'"
                    :rules="requireRule"
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="othercountry"
                    label="Your country"
                  ></v-textarea>
                </v-row>
                <div class="txtbold primary--text pb-3">
                  Address Information
                </div>
                <v-row class="mx-0">
                  <v-textarea
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="address"
                    label="Address"
                  ></v-textarea>

                  <v-textarea
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="province"
                    label="Province"
                  ></v-textarea>

                  <v-textarea
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="district"
                    label="Districts"
                  ></v-textarea>

                  <v-textarea
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="subdistrict"
                    label="Subdistricts"
                  ></v-textarea>

                  <v-textarea
                    clearable
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    dense
                    v-model="zipCode"
                    label="Zip code"
                  ></v-textarea>
                </v-row>
              </v-form>
            </v-card>

            <v-row>
              <v-col cols="6">
                <v-btn
                  v-if="n === 1"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  elevation="0"
                  block
                  color="greyB"
                  @click="cancel"
                  >Cancel</v-btn
                >
                <v-btn
                  v-if="n === 2 || n === 3"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  elevation="0"
                  block
                  color="primary"
                  @click="previouseStep(n)"
                  >Previous</v-btn
                >
              </v-col>

              <v-col cols="6">
                <v-btn
                  v-if="n === 1 || n === 2"
                  elevation="0"
                  block
                  color="primary"
                  @click="nextStep(n)"
                  :disabled="!valid"
                  >Next</v-btn
                >
                <v-btn
                  v-if="n === 3"
                  elevation="0"
                  block
                  color="primary"
                  @click="register(n)"
                  :disabled="!valid"
                  >Regist</v-btn
                >
              </v-col>
            </v-row>

            <v-dialog v-model="dialog">
              <v-card v-if="correctForm === true">
                <sweetalert-icon icon="success"></sweetalert-icon>
                <v-card-title class="justify-center"
                  >Register success !!</v-card-title
                >
              </v-card>
              <v-card v-if="correctForm === false">
                <sweetalert-icon icon="warning"></sweetalert-icon>
                <v-card-title class="justify-center"
                  >Please fill in all field</v-card-title
                >
              </v-card>
            </v-dialog>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import UploadeImage from '@/components/uploadeImage'
import SweetalertIcon from 'vue-sweetalert-icons'
export default {
  components: {
    UploadeImage,
    SweetalertIcon
  },
  data () {
    return {
      countrylist: ['Thai', 'Other'],

      correctForm: null,
      dialog: false,
      valid: true,
      e1: 1,
      steps: 3,

      nickname: null,
      oneEmail: 'natawat14277@one.th',
      email: null,
      mobile: null,

      prefixNameTH: null,
      prefixnameTHlist: ['นาย', 'นางสาว', 'นาง'],
      firstNameTH: null,
      lastNameTH: null,
      prefixNameEN: null,
      prefixnameENlist: ['Mr', 'Mrs', 'Miss'],
      firstNameEN: null,
      lastNameEN: null,
      gender: null,
      genderlist: ['Male', 'Femail'],
      birthDate: null,

      country: null,
      othercountry: null,
      address: null,
      province: null,
      district: null,
      subdistrict: null,
      zipCode: null,

      requireRule: [(v) => !!v || 'This is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],

      numericRules: [
        (v) => !!v || 'This is required',
        (v) => /^[0-9]*$/.test(v) || 'this field must be numeric'
      ]
    }
  },
  methods: {
    nextStep (n) {
      if (this.$refs.form[n - 1].validate() === true) {
        this.e1 = n + 1
      }
    },
    closeDialog () {
      this.dialog = false
    },
    register (n) {
      if (
        this.$refs.form[n - 1].validate() === true &&
        this.$refs.form[n - 2].validate() === true &&
        this.$refs.form[n - 3].validate() === true
      ) {
        this.$store.commit('getimgBlob', null)
        this.correctForm = true
        this.dialog = true
        setTimeout(this.closeDialog, 1000)
      } else {
        this.$store.commit('getimgBlob', null)
        this.correctForm = false
        this.dialog = true
        setTimeout(this.closeDialog, 1000)
      }
    },
    cancel () {
      console.log('Cancel')
    },
    previouseStep (n) {
      this.e1 = n - 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

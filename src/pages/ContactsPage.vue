<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
export default {
  name: "ContactsPage",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
      subscribe: null,
      status: {
        errors: null,
        success: false,
        message: "",
      },
    };
  },
  methods: {
    sendForm() {
      const values = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        message: this.message,
        subscribe: this.subscribe,
      };
      const endpoint = baseProjectsUrl + "/contacts";
      axios.post(endpoint, values).then((res) => {
        if (!res.data.success) {
          this.status.errors = res.data.errors;
        } else {
          const { success, message } = res.data;
          this.status = { success, message };
          this.first_name = "";
          this.last_name = "";
          this.email = "";
          this.message = "";
          this.subscribe = "";
        }
      });
    },
    closeAlert() {
      this.status.errors = null;
      this.status.success = false;
      this.status.message = "";
    },
  },
};
</script>

<template>
  <div class="container">
    <header class="text-center py-3">
      <h1>Contattaci</h1>
      <h4 class="text-muted mt-3">Compila il form per contattarci!</h4>
    </header>
    <div
      v-if="status.errors"
      class="alert alert-danger alert-dismissible fade show"
      role="alert">
      <ul class="list-unstyled">
        <li v-for="(error, i) in status.errors" :key="i">
          <ul class="list-unstyled">
            <li v-for="label in error" :key="label">{{ label }}</li>
          </ul>
        </li>
      </ul>
      <button type="button" class="btn-close" @click="closeAlert"></button>
    </div>
    <div
      v-if="status.success"
      class="alert alert-success alert-dismissible fade show"
      role="alert">
      {{ status.message }}
      <button type="button" class="btn-close" @click="closeAlert"></button>
    </div>
    <form
      method="post"
      class="p-4 border border-black rounded-3 row"
      @submit.prevent="sendForm"
      novalidate>
      <div class="col-4">
        <div class="mb-3">
          <label for="first_name" class="form-label">Nome:</label>
          <input
            v-model="first_name"
            type="text"
            class="form-control"
            id="first_name"
            name="first_name"
            required />
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <label for="last_name" class="form-label">Cognome:</label>
          <input
            v-model="last_name"
            type="text"
            class="form-control"
            id="last_name"
            name="last_name"
            required />
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <label for="email" class="form-label">Indirizzo e-mail</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            name="email"
            required />
        </div>
      </div>
      <div class="col-9">
        <div class="mb-3">
          <label for="message" class="form-label">Inserisci messaggio</label>
          <textarea
            v-model="message"
            class="form-control"
            id="message"
            rows="3"
            name="message"
            required></textarea>
        </div>
      </div>
      <div class="col-3 d-flex align-items-end justify-content-end">
        <div class="form-check form-switch mb-3">
          <input
            v-model="subscribe"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="subscribe" />
          <label class="form-check-label" for="subscribe" name="subscribe"
            >Iscriviti alla newsletter</label
          >
        </div>
      </div>
      <div class="col-12 d-flex align-items-center justify-content-end mt-3">
        <button class="btn btn-success">Invia</button>
      </div>
    </form>
  </div>
</template>

<style></style>

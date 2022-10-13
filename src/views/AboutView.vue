<template>
  <div class="about">
    <form @submit.prevent="send" action="">
      <div class="row">
        <div class="col-6">
          <input
            type="text"
            :class="{ 'is-invalid': v$.product.email.email.$invalid }"
            v-model="product.email"
            placeholder="Title"
            class="form-control"
          />
        </div>
        <div class="col-12">
          <input
            type="password"
            v-model="product.password"
            placeholder="Price"
            class="form-control"
          />
          <small
            v-if="v$.product.password.numeric.$invalid"
            class="badge bg-danger"
          >
            {{ v$.product.password.numeric.$message }}</small
          >
        </div>
        <div class="col-12">
          <input
            type="password"
            v-model="product.repassword"
            placeholder="Price"
            class="form-control"
          />
           <small
            v-if="v$.product.repassword.sameAs.$invalid"
            class="badge bg-danger"
          >
            {{ v$.product.repassword.sameAs.$message }}</small
          >
        </div>
        <div class="col-6 my-3">
          <select
            class="form-select"
            v-model="product.category"
            aria-label="Default select example"
          >
            <option selected>Kateqoriya</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-12 my-3">
          <div id="app">
            <upload-media media_server="img"> </upload-media>
          </div>
          <!-- <input type="file" @change="Change" class="form-control"> -->
        </div>
        <div class="col-12 my-3">
          <textarea
            v-model="product.about"
            rows="5"
            cols="80"
            placeholder="haqqinda"
          >
          </textarea>
        </div>
        <div class="col-12 my-3 text-center">
          <button class="btn btn-success">Gonder</button>
        </div>
      </div>
      <p>{{ v$.product.repassword.sameAs }}</p>
    </form>
    <button id="btn">test</button>
  </div>
</template>


<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric, sameAs } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      product: {
        email: "",
        password: null,
        repassword: null,
        category: "",
        img: "",
        about: "",
      },
    };
  },

  methods: {
    send() {
      let form_data = new FormData();

      if (this.product.img) {
        form_data.append("file", this.product.img);
      }

      Object.keys(this.product).map((item) => {
        form_data.append(item, this.product[item]);
      });

      console.log(form_data);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      this.$store.dispatch("products/productAdd", form_data);
    },
    Change(event) {
      this.product.img = event.target.files;
    },
  },

  validations() {
    return {
      product: {
        email: { required, email },
        password: { required, numeric },
        repassword: { required, numeric, sameAs : sameAs('password') },
      },
    };
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

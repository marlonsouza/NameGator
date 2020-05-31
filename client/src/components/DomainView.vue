<template>
  <div>
    <div class="container">
      <div class="text-left">
        <router-link to="/domains">Voltar</router-link>
        <br />
        <br />
        <h2>
          {{ domain }}
        </h2>

        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(domain, key) in domains"
                v-bind:key="key"
              >
                <div class="row">
                  <div class="col-md-6">
                    {{ domain.extension }}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-info">{{
                      domain.available ? "Disponível" : "Não Disponível"
                    }}</span>
                  </div>
                  <div class="col-md text-right">
                    <a
                      v-bind:href="domain.checkout"
                      class="btn btn-info"
                      target="_blank"
                    >
                      <span class="fa fa-shopping-cart" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios/dist/axios";

export default {
  props: ["domain"],
  data() {
    return {
      domains: [],
    };
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          mutation($name: String){
            domains: generateDomain(name: $name){
              name
              extension
              checkout
              available
            }
          }
        `,
        variables: {
          name: this.domain,
        },
      },
    }).then(({ data: res }) => {
      this.domains = res.data.domains;
    });
  },
};
</script>

<style></style>

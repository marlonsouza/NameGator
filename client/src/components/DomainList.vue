<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <AppItemList
            v-bind:items="items.prefix"
            type="prefix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
            title="Prefixos"
          ></AppItemList>
        </div>
        <div class="col-md">
          <AppItemList
            v-bind:items="items.suffix"
            type="suffix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
            title="Sufixos"
          ></AppItemList>
        </div>
      </div>
      <br />
      <h5>
        Domains
        <span class="badge badge-info">{{ domains.length }}</span>
      </h5>
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
                  {{ domain.name }}
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
                  &nbsp;
                  <button class="btn btn-info" @click="openDomain(domain)">
                    <span class="fa fa-search" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppItemList from "./AppItemList";

export default {
  components: {
    AppItemList,
  },
  data() {
    return {};
  },
  methods: {
    addItem(item) {
      this.$store.dispatch("addItem", item);
    },
    deleteItem(item) {
      this.$store.dispatch("deleteItem", item);
    },
    getItems(type) {
      this.$store.dispatch("getItems", type);
    },
    generateDomains() {
      this.$store.dispatch("generateDomains");
    },
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`,
      });
    },
  },
  computed:{
    items(){
      return this.$store.state.items;
    },
    domains(){
      return this.$store.state.domains;
    }
  },
};
</script>

<style></style>

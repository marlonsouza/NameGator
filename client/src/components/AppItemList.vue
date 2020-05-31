<template>
  <div>
    <h5>
      {{title}}
      <span class="badge badge-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-bind:key="key"
            v-for="(item, key) in items"
          >
            <div class="row">
              <div class="col-md">
                {{ item.description }}
              </div>
              <div class="col-md text-right">
                <button class="btn btn-info" v-on:click="deleteItem(item)">
                  <span class="fa fa-trash" />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <br />
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Digite o item "
            v-model="description"
            v-on:keyup.enter="addItem(type, description)"
          />
          <div class="input-group-append">
            <button class="btn btn-info" v-on:click="addItem(type, description)">
              <span class="fa fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppItemList",
  props: ["items", "title", "type"],
  data() {
    return {
      description: "",
    };
  },
  methods: {
    addItem(type, description) {
      this.$emit("addItem", {
        type,
        description
      });
      this.description = "";
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
  },
};
</script>

<style scoped></style>

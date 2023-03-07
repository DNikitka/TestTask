<template>
  <tr>
    <td>{{oModel.firstname}}</td>
    <td>{{oModel.lastname}}</td>
    <td>{{oModel.email}}</td>
  </tr>
</template>

<script>

/**
 * @typedef {Object} oModel ==> Передаваемая модель
 * @property {string} firstname ==> Имя
 * @property {string} lastname ==> Фамилия
 * @property {string} email ==> Электронная почта
 *
 */
export default {
  name: "v-table-item",
  props:{
    oModel: {
      type: Object,
      default: {}
    }
  }
}
</script>
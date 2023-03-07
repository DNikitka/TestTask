<script setup>
import VTableItem from "@/components/v-table-item.vue";
import VHeadItem from "@/components/v-head-item.vue";
</script>

<template>
  <main>
    <input v-model="sSearch" type="text" class="search" placeholder="Поиск...">
    <table class="table">
      <thead>
        <tr>
          <VHeadItem
              :s-current-sort="sCurrentSort"
              :s-current-sort-dir="sCurrentSortDir"
              s-sort="firstname"
              s-sort-name="Имя"
              @sort="sortTable"
          />
          <VHeadItem
              :s-current-sort="sCurrentSort"
              :s-current-sort-dir="sCurrentSortDir"
              s-sort="lastname"
              s-sort-name="Фамилия"
              @sort="sortTable"
          />
          <VHeadItem
              :s-current-sort="sCurrentSort"
              :s-current-sort-dir="sCurrentSortDir"
              s-sort="email"
              s-sort-name="Электронная почта"
              @sort="sortTable"
          />
        </tr>
      </thead>
      <tbody>
      <VTableItem
          v-if="aFilteredData.length > 0"
          v-for="oItem in aFilteredData"
          :key="oItem.id"
          :o-model="oItem"
      />
      <tr v-else>
        <td colspan="4">{{ sTableText }}</td>
      </tr>
      </tbody>
    </table>
  </main>
</template>

<script>


export default {
  name: "App",
  data() {
    return {
      aData: [],
      sSearch: "",
      bTableSearch: false,
      sCurrentSort: "firstname",
      sCurrentSortDir: "up"
    }
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(jRes => jRes.json())
      .then(aRes => {
        let sRegex = /(Mr|MR|Mrs|MRS)(\.?)\s/
        aRes.map(oItem => {
          let aMatch = sRegex.exec(oItem.name),
              aSplitName = (aMatch !== null) ? oItem.name.replace(aMatch[0], "").split(' ') : oItem.name.split(' ')
          oItem.firstname = aSplitName[0]
          oItem.lastname = (aSplitName.length > 2) ? aSplitName.slice(1).join(' ') : aSplitName[1]
        })
        if (aRes.length > 0) {
          this.bTableSearch = true
        }
        this.aData = aRes
      })
  },
  methods: {
    sortTable(sColumn){
      if(sColumn === this.sCurrentSort) {
        this.sCurrentSortDir = this.sCurrentSortDir==='up'?'down':'up';
      }
      this.sCurrentSort = sColumn;
    }
  },
  computed: {
    aFilteredData() {
      return this.aData.filter(oItem => {
        if (oItem.firstname.toLowerCase().includes(this.sSearch.toLowerCase())) {
          return oItem
        }
        if (oItem.lastname.toLowerCase().includes(this.sSearch.toLowerCase())) {
          return oItem
        }
        if (oItem.email.toLowerCase().includes(this.sSearch.toLowerCase())) {
          return oItem
        }
      }).sort((a,b) => {
        let modifier = 1;
        if(this.sCurrentSortDir === 'down') modifier = -1;
        if(a[this.sCurrentSort] < b[this.sCurrentSort]) return -1 * modifier;
        if(a[this.sCurrentSort] > b[this.sCurrentSort]) return modifier;
        return 0;
      });
    },
    sTableText() {
      if (this.aFilteredData.length === 0 || this.bTableSearch) {
        return 'Поиск не дал результатов'
      } else {
        return 'Ничего нет'
      }
    }
  }
}
</script>

<style scoped>

</style>

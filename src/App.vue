<template>
  <div class="users">
    <h1>Список пользователей</h1>
    <input v-model="sSearch" class="search" placeholder="Поиск по имени, фамилии или почте">
    <table class="table">
      <thead>
      <tr>
        <th @click="sort('name')">Имя <span v-if="sSortKey === 'name'"><v-icon :name="sNameIconArrow"/></span></th>
        <th @click="sort('surname')">Фамилия <span v-if="sSortKey === 'surname'"><v-icon :name="sNameIconArrow"/></span></th>
        <th @click="sort('email')">Электронная почта <span v-if="sSortKey === 'email'"><v-icon :name="sNameIconArrow"/></span></th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="aFilteredUsers.length > 0" v-for="user in aFilteredUsers" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.surname }}</td>
        <td>{{ user.email }}</td>
      </tr>
      <tr v-else>
        <td colspan="4">{{ sTableText }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'aUsers',
  data() {
    return {
      aUsers: [],
      sSearch: '',
      sSortKey: 'name',
      bReverse: false,
      ssSearch: "",
      bTablesSearch: false,
    }
  },
  mounted() {
    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.aUsers = response.data.map(user => {
            let aMatch = /(Mr|MR|Mrs|MRS)(\.?)\s/.exec(user.name),
                aSplitName = (aMatch !== null) ? user.name.replace(aMatch[0], "").split(' ') : user.name.split(' ')
            return {
              id: user.id,
              name: aSplitName[0],
              surname: (aSplitName.length > 2) ? aSplitName.slice(1).join(' ') : aSplitName[1],
              email: user.email
            }
          })
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    sort(key) {
      if (this.sSortKey === key) {
        this.bReverse = !this.bReverse;
      } else {
        this.sSortKey = key;
        this.bReverse = false;
      }
      this.aUsers.sort((a, b) => {
        let modifier = 1;
        if (this.bReverse) modifier = -1;
        if (a[key] < b[key]) return -1 * modifier;
        if (a[key] > b[key]) return modifier;
        return 0;
      });
    }
  },
  computed: {
    aFilteredUsers() {
      return this.aUsers.filter(user => {
        return (
            user.name.toLowerCase().includes(this.sSearch.toLowerCase()) ||
            user.surname.toLowerCase().includes(this.sSearch.toLowerCase()) ||
            user.email.toLowerCase().includes(this.sSearch.toLowerCase())
        );
      });
    },
    sTableText() {
      if (this.aFilteredUsers.length === 0 || this.bTablesSearch) {
        return 'Поиск не дал результатов'
      } else {
        return 'Ничего нет'
      }
    },
    sNameIconArrow(){
      return this.bReverse ? 'co-sort-alpha-up' : 'co-sort-alpha-down'
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li v-for="d in state.data" :key="d.id">
        <input type="checkbox" v-model="d.complete" true-value="Y" false-value="N" @change="compMemo(d.id)"/>
        {{ d.content }}
        <button id="modBtn" @click="editMemo(d.id)">수정</button>
        <button id="delBtn" @click="delMemo(d.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      data: [],
    });

    // 메모 추가
    const add = () => {
      const content = prompt("내용을 입력해주세요.");

      if (!content) {
        alert("내용을 입력해주세요.");
        return add();
      }

      axios.post("/api/memos", { content }).then((res) => {
        state.data = res.data;
      });
    };

    // 메모 수정
    const editMemo = (id) => {
      const content = prompt("내용을 입력해주세요", state.data.find(d=>d.id === id).content);

      axios.put("/api/memos/" + id, { content }).then((res) => {
        state.data = res.data;
      });
    };

    // 메모 삭제
    const delMemo = (id) => {
      const delCheck = confirm("삭제하시겠습니까?");
   
      if(confirm){
        axios.post("/api/memos/delMemo/" + id).then((res) => {
          state.data = res.data;
        });
      }else{
        return false;
      }
    };
    return { state, add, editMemo, delMemo,  };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }

  ul {
    list-style: none;
    padding: 15px;
    margin: 0;

    li {
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #eee;
        button{
          margin-left:5px;
          border:none;
          color: white;
          background-color:rgb(83, 174, 254)
          
        }
    }
  }
}
</style>
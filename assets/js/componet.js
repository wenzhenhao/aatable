Vue.component('new-member',{
  props: ['member'],
  // data: function(){
  //   return {
  //     member: LocalData.get('member'),
  //   }
  // },
  template: `
  <div class="member-box" style="display: none;">
    <div class="row" v-for="item in member">
      <div class="input-group">
        <input type="text" name="member[]" class="layui-input" placeholder="请输入成员" v-model="item">
        <button type="button" class="layui-btn layui-btn-danger remove-member">-</button>  
      </div>     
    </div>
  </div>
  `,
  methods: {
     
  }
})
Vue.component('new-table',{
props: ['table', 'member', 'isedit', 'oldtitle'],
template: `
  <form class="layui-form table-box" action="">
    <div v-show="isedit" class="layui-form-item">
      <label class="layui-form-label">原表格名</label>
      <div class="layui-input-block">
        <div class="old-title">{{oldtitle}}</div>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label"><span v-show="isedit">新</span>表格名<i>*</i></label>
      <div class="layui-input-block">
        <input type="text" name="title" required  lay-verify="required" placeholder="请输入表格名" autocomplete="off" class="layui-input" v-model="table.title">
      </div>
    </div>
    <div class="layui-form-item">
    <label class="layui-form-label">日期<i></i></label>
      <div class="layui-input-block">
        <input type="text" class="layui-input date" name="date" id="date" placeholder="请选择日期" readonly="readonly" v-model="table.date">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">成员<i>*</i></label>
      <div class="layui-input-block">
          <input v-for="item, index in member" type="checkbox" name="member[]" v-bind:title="item" v-bind:value="item">
      </div>
    </div>
    <div class="layui-form-item" style="display: none;">
      <div class="layui-input-block">
        <button class="layui-btn submit" lay-submit lay-filter="newTable">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary reset">重置</button>
      </div>
    </div>
  </form>
`,
});

Vue.component('new-item', {
props: ['table',  'curitem', 'idx', 'isedit'],
template: `
  <form class="layui-form item-box" action="">
    <div class="layui-form-item">
      <label class="layui-form-label">表格</label>
      <div class="layui-input-block">
        <div class="old-title">{{table.title}}</div>
      </div>
    </div>
    <div v-show="isedit" class="layui-form-item">
      <label class="layui-form-label">选择项目<i>*</i></label>
      <div class="layui-input-block">
        <select name="curItemIdx" lay-verify="required" lay-filter="curItem" v-model="idx">
          <option v-for="item, index in table.items" :value="index">{{item.title}}</option>
        </select> 
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label"><span v-show="isedit">新</span>项目名<i>*</i></label>
      <div class="layui-input-block">
        <input type="text" name="title" required  lay-verify="required" placeholder="请输入表格名" autocomplete="off" class="layui-input" v-model="curitem.title">
      </div>
    </div>
    <div class="layui-form-item">
    <label class="layui-form-label">开销<i>*</i></label>
    <div class="layui-input-block">
      <input type="number" @click="toggleCal(1)" name="cost" min="0" required  lay-verify="cost" placeholder="点击输入" autocomplete="off" class="layui-input" v-model="curitem.cost" readonly="readonly">
      <div class="cal-box">
        <div class="screen">
          <div class="box">
            <span class="pcs">{{pcs}}</span>
            <span class="result">{{result}}</span>
          </div>
        </div>
        <div class="grid-box">
          <div class="item item-1" @click="select(event)">1</div>
          <div class="item item-2" @click="select(event)">2</div>
          <div class="item item-3" @click="select(event)">3</div>
          <div class="item item-back" @click="operate('back')">←</div>
          <div class="item item-4" @click="select(event)">4</div>
          <div class="item item-5" @click="select(event)">5</div>
          <div class="item item-6" @click="select(event)">6</div>
          <div class="item item-add" @click="operate('add')">+</div>
          <div class="item item-7" @click="select(event)">7</div>
          <div class="item item-8" @click="select(event)">8</div>
          <div class="item item-9" @click="select(event)">9</div>
          <div class="item item-minus" @click="operate('minus')">-</div>
          <div class="item item-0" @click="select(event)">0</div>
          <div class="item item-dot" @click="select(event)">.</div>
          <div class="item item-0" @click="operate('resume')">Resu</div>
          <div class="item item-ok" @click="operate('ok')">OK</div>
        </div>
      </div>
    </div>
  </div>
    <div class="layui-form-item">
      <label class="layui-form-label">成员<i>*</i></label>
      <div class="layui-input-block">
          <input v-for="item, index in table.member" type="checkbox" name="member[]" v-bind:title="item" v-bind:value="item">
      </div>
    </div>
    <div class="layui-form-item" style="display: none;">
      <div class="layui-input-block">
        <button class="layui-btn submit" lay-submit lay-filter="newItem">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary reset">重置</button>
      </div>
    </div>
  </form>
`,
data: function(){
  return {
    pcs: 0,
    result: 0,
    stack: [],
    numStack: [],
    operationStack: [],
    curNum: '',
    old: 0,
  }
},
mounted(){
  this.toggleCal(-1);
},
methods: {
  init: function(){
    
  },
  toggleCal: function(type){
    console.log('toggleCal');
    if(type > 0){
      $(".cal-box").show();
    }else{
      $(".cal-box").hide();
    }
  },
  sendResult: function(val){
    this.$emit('send-result', val);
  },
  select: function(e){
    var str = $(e.target).text();
    switch(str){
      case '.':
        if(this.curNum.split('.').length > 1){
          break;
        }

        if(this.isNumber(this.stackTop)){
          this.stack.push(str);
          this.curNum += '.'
        }else if(this.stackTop == '+' || this.stackTop == '-'){
          this.stack.push('0.');
          this.curNum += '0.';
        }
        break;
      case '0':
        if(this.curNum == '0') break;
        if(this.stack.length == 1 && this.stackTop == 0) break;
        this.stack.push(str);
        this.curNum += str; 
        break;
      default:
        if(this.curNum == '0') break;
        if(this.stack.length == 1 && this.stackTop == 0){
          this.stack.pop();
        }
        this.stack.push(str);
        this.curNum += str; 
        break;
    }
    this.solve();
  },
  operate: function(type){
    switch(type){
      case 'add':
        if(this.stackTop == null){
          this.stack.push('0');
          this.curNum += '0';
          this.stack.push('+');
        }else if(this.isNumber(this.stackTop)){
          this.stack.push('+');
          this.push2NumStack();
        }else{
          this.stack.pop();
          this.stack.push('+');
        }
        break;
      case 'minus':
        if(this.stackTop == null){
          this.stack.push('0');
          this.curNum += '0';
          this.stack.push('-');
        }else if(this.isNumber(this.stackTop)){
          this.stack.push('-');
          this.push2NumStack();
        }else{
          this.stack.pop();
          this.stack.push('-');
        }
        break;
      case 'back':
        this.stack.pop();
        if(this.curNum.length) this.curNum = this.curNum.substr(0, this.curNum.length-1);
        break;
      case 'ok':
        this.sendResult(this.result);
        this.toggleCal(-1);
        break;
      case 'resume':
        this.resume();
        break;
    }
    this.solve();
  },
  push2NumStack: function(){
    this.numStack.push(this.curNum);
    this.curNum = '';
  },
  isNumber: function(str){
    return /[0-9]/.test(str);
  },
  solve: function(){
    var length = this.stack.length;
    var sum = '';
    var pcs = '';
    var tmp = 0;
    if(length){
      for(var i = 0; i < length; i++){
        if(this.stack[i] == '+' || this.stack[i] == '-'){
          pcs += ' ' + this.stack[i] + ' ';
          tmp = 0;
        }else{
          pcs += this.stack[i];
        }
        if(i == length - 1 && !this.isNumber(this.stack[i])){

        }else{
          sum += this.stack[i];
        }
        
      }
      this.pcs = pcs;

      if(/^0]d/.test(sum)){
        sum = sum.substr(1, sum.length - 1)
      }
      if(sum == '0.'){
        this.result = 0;
      }else{
        this.result = Math.round(Number(eval(sum)) * 100) / 100;
      }
      
    }else{
      this.pcs = '';
      this.result = 0;
    }
  },
  resume: function(){
    this.setResult(this.old)
  },
  setResult: function(val){
    this.sendResult(val);
    val = Number(val);
    this.pcs = val;
    this.result = val;
    this.stack = [];
    for(var v of val.toString()){
      this.stack.push(v);
    }

    
  }
},
computed: {
  stackTop: function(){
    if(this.stack.length){
      return this.stack[this.stack.length-1];
    }else{
      return null;
    }
  },
},
watch: {
  curitem: function(nv, ov){
    this.old = nv.cost;
    this.setResult(nv.cost);
  },
  curNum: function(nv, ov){

  }
}
})



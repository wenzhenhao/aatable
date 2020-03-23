var $;
var base = {
    data: {
        table: null,
        form: null,
        laydate: null,
        localPrefix: 'zhtable_',
    },
    created: function(){
        var _self = this;
        layui.use(['form', 'element', 'layer', 'table','upload', 'laydate'], function(){
          _self.form = layui.form;
          _self.table = layui.table;
          _self.laydate = layui.laydate;
          $ = layui.jquery;
          _self.init();
        })
    },
    methods: {
        saveLocalData: function(name, value){
            var _self = this;
            localStorage.setItem(_self.localPrefix + name, JSON.stringify(value));
        },
        getLocalData: function(name, def){
            var _self = this;
            def = def || ''
            var data = JSON.parse(localStorage.getItem(_self.localPrefix + name)) || def;
            return data;
        },
        removeLocalData: function(name){
            var _self = this
            localStorage.removeItem(_self.localPrefix + name);
            
        }
    }
};

const LocalData = {
    prefix: 'zhtable_',
    save: function(name, value){
        var _self = this;
        localStorage.setItem(this.prefix + name, JSON.stringify(value));
    },
    get: function(name){
        var _self = this;
        var data = JSON.parse(localStorage.getItem(this.prefix + name)) || '';
        return data;
    },
    remove: function(name){
        var _self = this
        localStorage.removeItem(this.prefix + name);
        
    }
}


var app = new Vue({
    el: '#app',
    mixins: [base],
    data: {
        tableId: 'mytable',
        member: [],
        tmpMember: [],
        tmpTable: {...DEFAULT_TABLE},
        curTable: {...DEFAULT_TABLE},
        allTable: [],
        curTableTitle: '',
        isEditTable: 0,
        oldTableTitle: '',
        curTableIdx: null,

        curItem: {...DEFAULT_ITEM},
        tmpItem: {...DEFAULT_ITEM},
        curItemIdx: 0,
        isEditItem: 0,
        oldItemTitle: '',
    },
    methods: {
        init: function(){
            console.log('init');
            var _self = this;
            $(window).click(function(e){
                _self.clickControl(e)
            });
            _self.tableRender();
            _self.member = LocalData.get('member');
            if(_self.member == '') _self.member = [''];
            _self.tmpMember = _self.member.slice();
            _self.allTable = LocalData.get('table');
            if(_self.allTable.length){
                _self.curTableIdx = 0;
            }
            
            _self.form.on('select(curTable)', function(data){
                _self.curTableIdx = (data.value); //得到被选中的值
                _self.renderAfterVue();
            }); 
            _self.renderAfterVue();
            
        },
        clickControl: function(e){
            var _self = this;
            if($(e.target).hasClass('has-dropdown')){
                _self.toggleDropdownTable(e.target);
            }else{
                _self.hideDropdownTable();
            }
        },
        toggleDropdownTable: function(target){
            if($(target).siblings('drop-down-table').is(':visible')){
                $('.drop-down-table').hide();
            }else{
                $('.drop-down-table').hide();
                $(target).siblings('.drop-down-table').show();
            }
        },
        hideDropdownTable: function(){
            $('.drop-down-table').hide();
        },
        tableRender: function(data, cols, title){
            console.log('tableRender');
            var _self = this;
            data = data || DEFAULT_DATA;
            cols = cols || DEFAULT_COLS;
            title = title || '示例表格';
            _self.table.render({
                elem: '#' + _self.tableId
                // ,height: 312
                // ,url: '/demo/table/user/' //数据接口
                ,page: false //开启分页
                ,cols: [cols]
                ,data: data
                ,toolbar: false
                // ,defaultToolbar: ['exports']
                ,title: title
            });
        },
        bindRemoveMember: function(){
            var _self = this;
            $(".member-box").find(".remove-member").each(function(idx, btn){
                $(btn).unbind("click").click(function(){
                    if(_self.tmpMember.length > 1){
                        _self.tmpMember.splice(idx, 1);
                    }else{
                        layer.msg('至少有一个成员')
                    }
                })
            })
        },
        showNewMember: function(){
            var _self = this;
            _self.tmpMember = _self.member.slice();
            if(_self.tmpMember.length == 0) _self.tmpMember = [''];
            var content = 0 ? _self.getMembemrHtml(LocalData.get('member')) : $("#app .member-box");
            $(content).show();
            layer.open({
                type: 1,
                title: '成员名单',
                content: content,
                btn: ['保存', '添加'],
                success: function(layero, index){
                    $(layero[0]).find(".layui-layer-btn1").css({
                        'background-color': '#ffb800',
                        'color': '#fff',
                    })
                    _self.bindRemoveMember();
                },
                yes: function(index, layero){
                    // 更新成员data
                    // 这里已经去重了
                    var data = [];
                    $(".member-box").find("input[name='member[]']").each(function(){
                        var value = this.value.trim();
                        if(!data.some(function(v){
                            return v == value;
                        })){
                            data.push(value);
                        }
                    })
                    _self.tmpMember = data;
                    _self.member = _self.tmpMember.filter(v => v != '');
                    layer.close(index);
                    
                },
                btn2: function(index, layero){
                    var data = [];
                    // 这里已经去重了
                    $(".member-box").find("input[name='member[]']").each(function(){
                        var value = this.value.trim();
                        if(!data.some(function(v){
                            return v == value;
                        })){
                            data.push(value);
                        }
                    })
                    _self.tmpMember = data;
                    // 添加成员
                    _self.tmpMember.push('');
                    _self.$nextTick(function(){
                        _self.bindRemoveMember();
                    })
                    
                    return false;
                },
                btn3: function(index, layero){
                    if(confirm('尚未保存，确定要关闭吗')){ //只有当点击confirm框的确定时，该层才会关闭
                        layer.close(index);
                    }
                    return false; 
                },
                cancel: function(index, layero){ 
                    if(confirm('尚未保存，确定要关闭吗')){ //只有当点击confirm框的确定时，该层才会关闭
                      layer.close(index);
                    }
                    return false; 
                },
                end: function(){
                    _self.member = _self.member.filter((v => v != ''));
                    _self.tmpMember = _self.member.slice();
                    $(content).hide();
                },
                // shadeClose: true,
                offset: '100px'
            })
        },
        getSingelMemberHtml: function(value){
            value = value || '';
            return NewMemberItem.replace('#value#', value);
        },
        getMembemrHtml: function(arr){
            arr = arr || [''];
            var _self = this;
            var html = '';
            for(var v of arr){
                html += _self.getSingelMemberHtml(v);
            }
            return NewMember.replace('#member-items#', html);
        },
        // 新表格
        showNewTable: function(type){
            var _self = this;
            var title, content, btnArr;
            switch(type){
                case 0:
                    if(_self.member.length == 0 || _self.member[0] == ''){
                        layer.msg('请先加入成员');
                        return false;
                    }
                    title = '新表格';
                    _self.tmpTable = {...DEFAULT_TABLE};
                    content = $("#app .table-box");
                    btnArr = ['保存', '重置'];
                    break;
                case 1:
                    if(_self.curTable.title == ''){
                        layer.msg('请先选择表格');
                        return false;
                    }
                    title = '编辑表格';
                    _self.tmpTable = {..._self.curTable};
                    content = $("#app .table-box");
                    btnArr = ['保存', '重置', '删除'];
                    break;
            }
            _self.isEditTable = type;

            layer.open({
                type: 1,
                title: title,
                content: content,
                btn: btnArr,
                success: function(layero, index){
                    _self.laydate.render({
                        elem: '.date' //指定元素
                    });
                    if(type == 0) {
                        $(layero[0]).find("button.reset").click();
                        _self.$nextTick(function(){
                            _self.laydate.render({
                                elem: '.date' //指定元素
                            });
                        })
                    }

                    if(type == 1) {
                        $(layero[0]).find(".layui-layer-btn2").css({
                            'background-color': '#FF5722',
                            'color': '#fff',
                        })
                        let checkboxs = $(layero[0]).find("input[type=checkbox]");
                        $(checkboxs).each(function(){
                            if(_self.curTable.member.some(v => v == this.value)){
                                this.checked = true;
                            }else{
                                this.checked = false;
                            }
                        })
                    }
                    
                    // 
                    $(layero[0]).find(".layui-unselect.layui-form-checkbox").remove();
                    _self.renderAfterVue();
                    _self.form.on('submit(newTable)', function(data){
                        var form = data.form;
                        var table = _self.allTable || LocalData.get('table');
                        var newIdx = 0;
                        if(table == ''){
                            table = [];
                        }
                        if($(form).find("input[type=checkbox]:checked").length == 0){
                            layer.msg('请选择至少一名成员');
                                return false;
                        }
                        _self.tmpTable.title = _self.tmpTable.title.trim();
                        if(type == 0){
                            if(table.some((v, i) => v.title == _self.tmpTable.title)){
                                layer.msg('已有同名表格');
                                return false;
                            }
                            let list = [['开销',0]];
                            let cols = [ //表头
                                {field: '0', title: '成员', fixed: 'left', minWidth: 100}
                                ,{field: '1', title: '合计', sort: true, fixed: 'left', minWidth: 100}
                            ];
                            _self.tmpTable.member = [];
                            $(form).find("input[type=checkbox]:checked").each(function(){
                                _self.tmpTable.member.push(this.value)
                                list.push([this.value, 0]);
                            })
                            _self.tmpTable.list = list;
                            _self.tmpTable.cols = cols;
                            _self.tmpTable.date = $(form).find("input[name=date]").val();
                            _self.curTableIdx = table.push(_self.tmpTable) - 1;
                        }else{
                            if(table.some((v, i) => v.title == _self.tmpTable.title  && i != _self.curTableIdx)){
                                layer.msg('已有同名表格');
                                return false;
                            }
                            _self.tmpTable.date = $(form).find("input[name=date]").val();
                            // 先清除无参与开销的成员
                            let colsLength = _self.tmpTable.list[0].length;
                            // 倒着来遍历，splice不会影响索引
                            for(let i = _self.tmpTable.list.length - 1; i > 0; i--){
                                if(_self.tmpTable.list[i].every((v, idx) => idx == 0 || v == 0)){
                                    _self.tmpTable.list.splice(i, 1);
                                }
                            }

                            // 补上未加入的成员
                            _self.tmpTable.member = [];
                            $(form).find("input[type=checkbox]:checked").each(function(){
                                let tmp = this.value
                                _self.tmpTable.member.push(tmp);
                                if(!_self.tmpTable.list.some(v => v[0] == tmp)){
                                    let arr = [tmp];
                                    arr.length = colsLength
                                    _self.tmpTable.list.push(arr.fill(0, 1));
                                }
                            })
                            table.splice(_self.curTableIdx, 1, _self.tmpTable);
                        }
                        LocalData.save('table', table);
                        _self.allTable = LocalData.get('table');
                        _self.curTable = {..._self.tmpTable};
                        _self.renderAfterVue();
                        layer.close(index);
                        return false;
                        // layer.msg(JSON.stringify(data.field));
                      });
                },
                yes: function(index, layero){
                    // todo: 更新表格data
                    $(layero[0]).find("button.submit").click();
                    // layer.close(index);
                    
                },
                btn2: function(index, layero){
                    // 重置表格
                    $(layero[0]).find("button.reset").click();
                    return false;
                },
                btn3: function(index, layero){
                    if(confirm('确定要当前表格吗')){ //只有当点击confirm框的确定时，该层才会关闭
                        _self.allTable.splice(_self.curTableIdx, 1);
                        LocalData.save('table', _self.allTable);
                        if(_self.allTable.length){
                            _self.curTableIdx = _self.allTable.length <= _self.curTableIdx ? _self.allTable.length - 1 : _self.curTableIdx;
                            _self.curTable = _self.allTable[_self.curTableIdx];

                        }else{
                            _self.curTableIdx = null;
                            _self.curTable = {...DEFAULT_TABLE};
                        }
                        _self.renderAfterVue();
                        layer.close(index);
                    }
                    return false; 
                },
                cancel: function(index, layero){ 
                    // if(confirm('确定要关闭吗')){ //只有当点击confirm框的确定时，该层才会关闭
                      layer.close(index);
                    // }
                    return false; 
                },
                end: function(){
                    var length = $(".member-box").find(".remove-member").length;
                },
                // shadeClose: true,
                offset: '100px'
            })
        },
        renderAfterVue: function(callback){
            var _self = this;
            _self.$nextTick(function(){
                if(typeof(callback) == 'function'){
                    callback();
                }
                _self.form.render();
            })
        },
        // 新项目
        showNewItem: function(type){
            // todo: 
            // 1.编辑表格
            var _self = this;
            var title, content, btnArr;
            if(_self.curTable.title == ''){
                layer.msg('请先选择表格');
                return false;
            }
            switch(type){
                case 0:
                    title = '新项目';
                    _self.tmpItem = {...DEFAULT_ITEM};
                    content = $("#app .item-box");
                    btnArr = ['保存', '重置'];
                    break;
                case 1:
                    if(_self.curTable.items == 0){
                        layer.msg('该表格暂无项目');
                        return false;
                    }
                    title = '编辑项目';
                    _self.tmpItem = {..._self.curTable.items[_self.curItemIdx]};
                    content = $("#app .item-box");
                    btnArr = ['保存', '重置', '删除'];
                    break;
            }
            _self.isEditItem = type;

            layer.open({
                type: 1,
                title: title,
                content: content,
                btn: btnArr,
                success: function(layero, index){
                    _self.form.verify({
                        cost: function(value, item){
                            if(value == ''){
                                return '必填项不能为空';
                            }
                            if(value < 0){
                                return '开销不能小于0';
                            }
                        }
                    })
                    _self.tmpItem.title = _self.tmpItem.title.trim();
                    if(type == 0){
                        $(layero[0]).find("button.reset").click();
                        $(layero[0]).find(".layui-unselect.layui-form-checkbox").remove();
                        _self.renderAfterVue();
                    }
                    if(type == 1){
                        $(layero[0]).find(".layui-layer-btn2").css({
                            'background-color': '#FF5722',
                            'color': '#fff',
                        })
                        _self.form.on('select(curItem)', function(data){
                            _self.curItemIdx = (data.value); //得到被选中的值
                            checkItemMember(content);
                            
                        })
                        checkItemMember(content);
                        // 选中成员
                        function checkItemMember(content){
                            _self.tmpItem = {..._self.curTable.items[_self.curItemIdx]};
                            let checkboxs = $(content).find("input[type=checkbox]");
                            $(content).find(".layui-unselect.layui-form-checkbox").remove();
                            $(checkboxs).each(function(){                       
                                if(_self.tmpItem.member.some(v => v == this.value)){
                                    this.checked = true;
                                }else{
                                    this.checked = false;
                                }
                            })
                            _self.renderAfterVue();
                        }
                    }

                    _self.form.on('submit(newItem)', function(data){
                        var form = data.form;
                        if($(form).find("input[type=checkbox]:checked").length == 0){
                            layer.msg('请选择至少一名成员');
                                return false;
                        }
                        if(type == 0){
                            if(_self.curTable.items.some((v, i) => v.title == _self.tmpItem.title)){
                                layer.msg('已有同名项目');
                                return false;
                            }
                            // 列
                            let colsLength = _self.curTable.cols.length;
                            _self.curTable.cols.push({field: colsLength, title: _self.tmpItem.title, sort: true, minWidth: 100})
                            _self.tmpItem.member = [];
                            $(form).find("input[type=checkbox]:checked").each(function(){
                                _self.tmpItem.member.push(this.value)
                            })
                            _self.tmpItem.avg = _self.getAvg(_self.tmpItem.cost, _self.tmpItem.member.length);
                            _self.curTable.list = _self.curTable.list.map(function(cv, index){
                                if(index == 0){
                                    cv[1] = _self.floatAdd(cv[1], _self.tmpItem.cost);
                                    cv[colsLength] = _self.tmpItem.cost;
                                }else{
                                    if($.inArray(cv[0], _self.tmpItem.member) > -1){
                                        cv[1] = _self.floatAdd(cv[1], _self.tmpItem.avg);
                                        cv[colsLength] = _self.tmpItem.avg;
                                    }else{
                                        cv[colsLength] = 0;
                                    }
                                }
                                return cv;
                            })
                            _self.curTable.items.push(_self.tmpItem);
                            
                        }else{
                            if(_self.curTable.items.some((v, i) => v.title == _self.tmpItem.title  && i != _self.curItemIdx)){
                                layer.msg('已有同名项目');
                                return false;
                            }
                            
                            // 列名
                            _self.curTable.cols[_self.realItemIdx].title = _self.tmpItem.title;
                            // 成员
                            _self.tmpItem.member = [];
                            $(form).find("input[type=checkbox]:checked").each(function(){
                                _self.tmpItem.member.push(this.value)
                            })
                            // 平均
                            _self.tmpItem.avg = _self.getAvg(_self.tmpItem.cost, _self.tmpItem.member.length);
                            // data
                            _self.curTable.list = _self.curTable.list.map(function(cv, index){
                                if(index == 0){
                                    cv[1] = cv[1] - cv[_self.realItemIdx];
                                    cv[1] = _self.floatAdd(cv[1], _self.tmpItem.cost);
                                    cv[_self.realItemIdx] = _self.tmpItem.cost;
                                }else{
                                    if($.inArray(cv[0], _self.tmpItem.member) > -1){
                                        cv[1] = cv[1] - cv[_self.realItemIdx];
                                        cv[1] = _self.floatAdd(cv[1], _self.tmpItem.avg);
                                        cv[_self.realItemIdx] = _self.tmpItem.avg;
                                    }else{
                                        cv[1] = cv[1] - cv[_self.realItemIdx];
                                        cv[_self.realItemIdx] = 0;
                                    }
                                }
                                return cv;
                            })

                            _self.curTable.items.splice(_self.curItemIdx, 1, _self.tmpItem);
                        }

                        
                        _self.allTable.splice(_self.curTableIdx, 1, _self.curTable);
                        LocalData.save('table', _self.allTable);
                        _self.tableRender(_self.curTable.list, _self.curTable.cols, _self.curTable.title);
                        _self.renderAfterVue();
                        layer.close(index);
                        return false;
                        // layer.msg(JSON.stringify(data.field));
                      });
                },
                yes: function(index, layero){
                    // todo: 更新表格data
                    $(layero[0]).find("button.submit").click();
                    // layer.close(index);
                    
                },
                btn2: function(index, layero){
                    // 重置表格
                    $(layero[0]).find("button.reset").click();
                    return false;
                },
                btn3: function(index, layero){
                    if(confirm('确定要删除当前项目吗')){ //只有当点击confirm框的确定时，该层才会关闭
                        _self.curTable.items.splice(_self.curItemIdx, 1);
                        
                        _self.curTable.list.map(function(cv, index){
                            cv[1] = cv[1] - cv[_self.realItemIdx];
                            cv.splice(_self.realItemIdx, 1);
                            return cv;
                        })
                        //要更新cols.field
                        _self.curTable.cols.splice(_self.realItemIdx, 1);
                        _self.curTable.cols.map(function(cv, index){
                            cv.field = index;
                            return cv;
                        })
                        _self.allTable.splice(_self.curTableIdx, 1, _self.curTable);
                        LocalData.save('table', _self.allTable);
                        _self.tableRender(_self.curTable.list, _self.curTable.cols, _self.curTable.title);
                        _self.renderAfterVue();
                        layer.close(index);
                    }
                    return false; 
                },
                cancel: function(index, layero){ 
                    // if(confirm('确定要关闭吗')){ //只有当点击confirm框的确定时，该层才会关闭
                      layer.close(index);
                    // }
                    return false; 
                },
                end: function(){
                    _self.$refs.tableItem.toggleCal(-1)
                },
                // shadeClose: true,
                offset: '100px'
            })
        },
        floatAdd: function(v1, v2){
            return Math.round(v1 * 100 + v2 * 100) / 100;
        },
        getAvg: function(x, y){
            if(x % y != 0){
                return (x/y).toFixed(2);
            }else{
                return x/y;
            }
        },
        getResult: function(val){
            // console.log('getResult', val)
            var _self = this;
            _self.tmpItem.cost = val;
        },
        outputCSV: function(){
            var _self = this;
            if(_self.curTable.title == ''){
                layer.msg('请先选择表格');
            }   
            const BOM = '\uFEFF'; 
            var filename = _self.curTable.title + '.csv';
            var str = '';   // csv data
            var nextRow = "\n"; // 换行符
            var separator = ',';
            // 表格信息
            str += "表格:," + _self.curTable.title + nextRow;
            str += "日期:," + _self.curTable.date + nextRow;
            // 表头
            for(let v of _self.curTable.cols){
                str += v.title + separator;
            }
            str = str.substr(0, str.length - 1) + nextRow;
            str += nextRow;
            // data
            for(let v of _self.curTable.list){
                for(let vv of v){
                    str += vv + separator;
                }
                str = str.substr(0, str.length - 1) + nextRow;
            }
            const csv = str;
            if (navigator.msSaveOrOpenBlob) {
                let blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                let uri = encodeURI(`data:text/csv;charset=utf-8,${BOM}${csv}`);
                let downloadLink = document.createElement('a');
                downloadLink.href = uri;
                downloadLink.download = filename;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        },
    },
    computed: {
        realItemIdx: function(){
            var _self = this;
            return parseInt(_self.curItemIdx) + 2;
        },
    },
    watch: {
        member: function(nv, ov){
            LocalData.save('member', nv);
        },
        curTableIdx: function(nv, ov){
            var _self = this;
            if(nv != null){
                _self.curTable = _self.allTable[nv];
                _self.curItemIdx = 0;
            }else{
                _self.curTable = {...DEFAULT_TABLE};
            }

            
        },
        curTable: function(nv, ov){
            var _self = this;
            _self.oldTableTitle = nv.title;
            _self.curTableTitle = nv.title;
            if(nv.list.length){
                _self.tableRender(nv.list, nv.cols, nv.title);
            }else{
                _self.tableRender(DEFAULT_DATA, DEFAULT_COLS, '示例表格');
            }
            
        },

    }
})




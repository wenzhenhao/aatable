const LANG = {
    ch: {
      total: '合计',
      lan: '语言',
      noDate: '很久很久以前',
    
      //help
      nameRepeated: '我并没有做重名检测，所以呢...',
      maxlengthTxt: '但我有做长度检查，所以呢...',
    
      memberHelp: '当你建立表格时将会从中选择成员',
      tableMemberHelp: '当你保存之后，这张表格便有一份独立的名单。但我不是在叫你把之前的名单删除，因为它还有点用',
      itemMemberHelpTxt: '谁和你一起经历了',
    
      //btn
      btnSave: '保存',
      btnClose: '关闭',
      btnAdd: '添加',
      btnGoAdd: '去添加',
      btnMember: '成员',
      btnTable: '表格',
      btnEditTable: '编辑表格',
      btnItem: '项目',
      btnEditItem: '编辑项目',
      btnConfirm: '确认',
      btnDel: '删除',
      btnClear: '清除',
      btnTips: '提示',
      btnUnderstood: '明白了',
      // common
      member: '成员',
      table: '表格',
      item: '项目',
      date: '日期',
      selectAll: '全选',
      currentTable: '表格',
      nameErrorTxt: '但这也不代表可以不填',
      numberErrorTxt: '必须为数字',
      selectTxt: '选择...',
      memberErrorTxt: '至少选择一名成员',
      tableName: '表格名',
      itemName: '项目名',
      delTips: '数据不可恢复',
      clearTips: '确认要清除全部数据？',
      clearData: '清除数据',
      pageTitle: 'AA表格',
      //member modal
      memberModalTitle: '成员名单',
      memberPlaceHolder: '填写成员名',
      memberItemModalTitle: '成员',
      memberItemMissingTxt: '请添加成员',
      newMember: '新的成员',
      memberListMissingTxt: '你还未建立成员名单',
    
      //table modal
      tableModalTitle: '新表格',
      tableName: '表格名',
      tableNamePlaceHolder: '填写表格名',
      firstTableMissingTxt: '你还未建立属于你自己的表格',
      tableMissingTxt: '你还未建立表格',
      selectTable: '选择表格',
      newTableName: '新表格名',
      editTableModalTitle: '编辑表格',
      delTable: '确认要删除表格',
    
      //item modal
      itemName: '项目名',
      itemCost: '开销',
      itemMissingTxt: '你还未给当前表格建立任何项目',
      selectItem: '选择项目',
      newItemName: '新项目名',
      itemNamePlaceHolder: '填写项目名',
      itemCostPlaceHolder: '填写项目金额',
      editItemModalTitle: '编辑项目',
      delItem: '确认要删除项目',
      itemModalTitle: '新项目',
      itemCostHtml: '你有在<s>听</s>看吗？',
      // exam
      exam: {
        th0: '示例',
        th1: '合计',
        th2: '项目1',
        th3: '项目2',
        th3: '项目3',
    
        tr0: '金额',
        tr1: '成员1',
        tr2: '成员2',
        tr3: '成员3',
    
        txt0: '你暂时未拥有属于你的表格，但你可以根据提示来建一张。',
        txt1: '首先，我希望你能稍微了解这几点：',
        txt2: '1. 成员：成员是指任何有机会跟你一起去消费的人，比如同学，朋友;',
        txt3: '2. 表格：表格名可以是今年的某一次旅游，并为这张表格选择成员。他们会出现在表格的第一列。',
        txt4: '3. 项目：项目是指在这次旅游中需要分摊的开销，比如机票，酒店等，并为这个项目选择成员。这些项目会出现在表格的第3列之后。',
        txt5: '4. 表格的第2行和第2列不需要你来建立，交给我来。',
        txt6: '5. 你可以点击【提示】来再次查看这些信息。',
        txt7: '6. 不用担心，我会从中帮助你:P。',
         
      }
    },
    en: {
      total: 'Total',
      lan: 'language',
      noDate: 'Long long ago',
      //help
      nameRepeated: 'I am not going to check name repeat, so...',
      maxlengthTxt: 'But I do a check about length, so...',
      maxlengthError: false,
      memberHelp: 'When you new a Table, you are going to select some Member from this list',
      tableMemberHelp: 'This table will has a seperate list of seleted Member after you Save. I am not telling you to delete Member List, cause it\'s still kind of useful',
      itemMemberHelpTxt: 'Who has experienced',
    
      //btn
      btnSave: 'Save',
      btnClose: 'Close',
      btnAdd: 'Add',
      btnGoAdd: 'Go to Add',
      btnMember: 'Member',
      btnTable: 'Table',
      btnEditTable: 'Edit Table',
      btnItem: 'Item',
      btnEditItem: 'Edit Item',
      btnConfirm: 'Confirm',
      btnDel: 'Delete',
      btnClear: 'Clear',
      btnTips: 'Tips',
      btnUnderstood: 'Understood',
      // common
      member: 'Member',
      table: 'Table',
      item: 'Item',
      date: 'Date',
      selectAll: 'Select all',
      currentTable: 'Table',
      nameErrorTxt: 'I am not saying it can be an empty string.',
      numberErrorTxt: 'must be a number.',
      selectTxt: 'Select...',
      memberErrorTxt: 'At least select one Member.',
      memberListMissingTxt: 'You don\'t have any Member List yet.',
      delTips: 'Data can\'t be restore.',
      clearTips: 'Are you sure to clear all data?',
      clearData: 'Clear data',
      pageTitle: 'AA Table',
      //member modal
      memberModalTitle: 'Member List',
      memberPlaceHolder: 'Enter Member Name',
      memberItemModalTitle: 'Member',
      memberItemMissingTxt: 'Please add a Member for the list.',
      newMember: 'New Member',
    
      //table modal
      tableModalTitle: 'New Table',
      tableName: 'Table Name',
      tableNamePlaceHolder: 'Enter Table Name',
      tableMissingTxt: 'You don\'t have any Table yet.',
      selectTable: 'Select Table',
      newTableName: 'New Table Name',
      editTableModalTitle: 'Edit Table',
      delTable: 'Are you sure to delete Table',
    
      //item modal
      itemName: 'Item',
      itemCost: 'Cost',
      itemMissingTxt: 'You don\'t have any Item for this Table: ',
      selectItem: 'Select Item',
      newItemName: 'New Item Name',
      itemNamePlaceHolder: 'Enter Item Name',
      itemCostPlaceHolder: 'Enter Item Cost',
      editItem: 'Are you sure to delete Item',
      itemModalTitle: 'New Item',
      itemCostHtml: 'You are not <s>listening</s> seeing.',
      editItemModalTitle: 'Edit Item',
      // exam
      exam: {
        th0: 'Demo',
        th1: 'Total',
        th2: 'Item 1',
        th3: 'Item 2',
        th3: 'Item 3',
    
        tr0: 'Cost',
        tr1: 'Member 1',
        tr2: 'Member 2',
        tr3: 'Member 3',
    
        txt0: 'You don\'t have your own Table yet. ',
        txt1: 'But you can follow my tips to have one.',
        txt2: '1. Member: Someone has a chance to hang out with you, such as classmate, friend',
        txt3: '2. Table: You can name the Table like "1st travel this year", and select some Member for it. They will show up in the 1st column.',
        txt4: '3. Item: Your bills :D, Don\'t forget to select someone to share with。These Items will show up after 2nd column.',
        txt5: '4. Don\'t have to worry about 2nd column and 2nd row. That\'s my job.',
        txt6: '5. You can click [Tips] to check this out again.',
        txt7: '6. Last but not least, I wiil help you. :P',
      }
    },
};

// const DEFAULT_DATA = [
//  {col_1: '开销', col_2: '180', col_3: '50', col_4: '60', col_5: '70'},
//  {col_1: '成员1', col_2: '55', col_3: '10', col_4: '20', col_5: '35'},
//  {col_1: '成员2', col_2: '80', col_3: '20', col_4: '25', col_5: '35'},
//  {col_1: '成员3', col_2: '35', col_3: '20', col_4: '15', col_5: '0'},
// ];
// const DEFAULT_COLS = [ //表头
//  {field: 'col_1', title: '成员', width:100, fixed: 'left'}
//  ,{field: 'col_2', title: '合计', width:100, sort: true, fixed: 'left'}
//  ,{field: 'col_3', title: '项目1', width:100, sort: true}
//  ,{field: 'col_4', title: '项目2', width:100, sort: true} 
//  ,{field: 'col_5', title: '项目3', width: 100, sort: true}
// ]
const DEFAULT_DATA = [
    ['开销', '180', '50', '60', '70'],
    ['成员1', '65', '10', '20', '35'],
    ['成员2', '80', '20', '25', '35'],
    ['成员3', '35', '20', '15', '0'],
];
const DEFAULT_COLS = [ //表头
    {field: '0', title: 'example', minWidth:100, fixed: 'left'}
    ,{field: '1', title: '合计', minWidth:100, sort: true, fixed: 'left'}
    ,{field: '2', title: '项目1', minWidth:100, sort: true}
    ,{field: '3', title: '项目2', minWidth:100, sort: true} 
    ,{field: '4', title: '项目3', minWidth: 100, sort: true}
]
const DEFAULT_TABLE = {
    title: '',
    date: getFullDate(),
    member: [],
    list: [],
    items: [],
}
const DEFAULT_ITEM = {
    title: '',
    cost: '',
    member: [],
    avg: 0,
}

function getFullDate(){
    var d = new Date();
    var year = d.getFullYear();
    var month = parseInt(d.getMonth() + 1);
    if(month < 10) month = '0' + month;
    var day = d.getDate();
    if(day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
}



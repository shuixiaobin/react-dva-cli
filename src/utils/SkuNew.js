/* 
1、先筛选出数据结构，方便循环
  [
    {
      key:"班级",
      children:[
        {value:'1班',selected:false,disabled:false},
        {value:'2班',selected:false,disabled:false},
      ]
    },
    {
      key:"期数",
      children:[
        {value:'1期',selected:false,disabled:false},
        {value:'2期',selected:false,disabled:false},
      ]
    },
    ...
  ]

2、筛选出商品列表
  var goodsMap= {
    "1班,1期,1,北京市":126154
  }

3、筛出所有存在的节点网络图


*/


var clickData={};
var uNum = 10000;
export default class SkuData {
  constructor (skuList = []) {
    this.skuList = skuList
    this.goodsMap = {} // 商品列表
    this.skuMenu =  skuList.length === 0 ? [] : skuList[0].skuPath.map(item => {return {}}); // sku菜单
    this.selectValues = [];  //已选节点
    this.selectable=[];//节点网络图
    this.lines = skuList.length === 0 ? [] : this.skuList.map(item => {return item.skuPath}); //所有链路
    this.init()
    this.getSelectable();
  }



  init () {
    const skuList = this.skuList
    for (let i = 0; i < skuList.length; i++) {
      const skuPath = skuList[i].skuPath;
      var name='';
      for (var j = 0; j < skuPath.length; j++) {
        if(!this.skuMenu[j].key){
          this.skuMenu[j].key=skuPath[j].title;
          this.skuMenu[j].key_id=uNum++;
        }
        if(!this.skuMenu[j].children){
          this.skuMenu[j].children=[]
        }
        if(!this.skuMenu[j].children.some(item=>{ return item.value == skuPath[j].value})){
          var numT= uNum++;
          this.skuMenu[j].children.push({
            value:skuPath[j].value,selected:false,disabled:false,value_id:numT
          })
          this.lines[i][j].value_id= numT;
        }else{
          this.skuMenu[j].children.map(item=>{ 
            if(item.value == skuPath[j].value){
              this.lines[i][j].value_id= item.value_id;
            }
          })
        }
        this.lines[i][j].key_id= this.skuMenu[j].key_id;
        name += this.lines[i][j].value_id +','
      }
        var obj= {...skuList[i]};
        delete obj.skuPath;
        this.goodsMap[name]=obj; 
    }
  }

  
  setBtnDisable(x,y,key_id, value_id,select){//筛选是否可选
    console.log(this.skuMenu)
    if (select === 'disabled') {//不可选
      return ;
    }
     if (select === 'selectable') {//正选
      this.selectValues.forEach((item, index) => {
        if (item.x === x) {
          this.selectValues.splice(index, 1)
        }
      })
      this.selectValues.push({x, y, key_id, value_id});
      this.handleSelectOneOption(x, y, key_id, value_id);
    }  

    if (select === 'active') { //反选 
      this.clearAllSelectedAndDisabled();
      this.selectValues.forEach((item, index) => {
        if (item.x === x && item.y === y) {
          this.selectValues.splice(index, 1);
        }
      })
      
      this.selectValues.forEach(item => {
        this.handleSelectOneOption(item.x, item.y, item.key_id, item.value_id);
      })   
    }

    console.log(this.selectValues)
    return this.skuMenu; 
  }

  handleSelectOneOption(x, y, key_id, value_id) {
    this.skuMenu[x].children[y].selected = true;
    this.skuMenu[x].children.forEach((specs, index) => {
      if (index === y) {
        specs.selected = true;
      } else {
        specs.selected = false;
      }
    })
    const selectableMatchItems = this.selectable[key_id].selectableList[value_id].matchItems;
    this.skuMenu.forEach((specsRow, index) => {
      if (index === x) { //不筛同级的
        return;
      }
      specsRow.children.forEach(specs => {
        //specs.disabled = false;
        if (specs.selected) {
          return;
        }
        const result = selectableMatchItems[specsRow.key_id].find(item => item.value_id === specs.value_id);
        if (!result) {
          specs.disabled = true;
        }
      })
    })
  }

  clearAllSelectedAndDisabled() { //清空状态
    this.skuMenu.forEach(row => {
      row.children.forEach(specs => {
        specs.selected = false;
        specs.disabled = false;
      })
    })
  }


  getSelectable() { //筛选节点网络图
    if(this.skuMenu.length === 0) {
      this.init()
    }
    
    const rowLength = this.skuMenu.length;

    for(let row = 0; row < rowLength; row++) {
      let { key_id,key } = this.skuMenu[row];
      let columnList = this.skuMenu[row].children;
      this.selectable[key_id] = {
        key_id,
        key,
        selectableList: {}
      }
      for (let column = 0; column < columnList.length; column++) {
        let {value_id,value } = columnList[column];
        this.selectable[key_id].selectableList[value_id] = {
          value_id,
          value,
          matchItems: null
        }
      }
 
      this.lines.forEach(specificSpecs => {
        let matchItems = {};
        let currentVlaue = '';
        specificSpecs.forEach(specsItem => {
          if(specsItem.key_id !== key_id) {
            matchItems[specsItem.key_id] = [specsItem]
          } else {
            currentVlaue = specsItem.value_id;
          }
        })

        if (!this.selectable[key_id].selectableList[currentVlaue].matchItems) {
          this.selectable[key_id].selectableList[currentVlaue].matchItems = matchItems;
        } else {
          Object.keys(this.selectable[key_id].selectableList[currentVlaue].matchItems).forEach(k => {
            //去重
            if(!this.selectable[key_id].selectableList[currentVlaue].matchItems[k].some(item=>{ return JSON.stringify(item) == JSON.stringify(...matchItems[k]) })){
              this.selectable[key_id].selectableList[currentVlaue].matchItems[k].push(...matchItems[k])
            }
          })
        }
      })  

    }

    return this.selectable;
  }



  getGoods (selected) { //根据某条链路获取商品信息
    var str='';
    if(this.selectValues.length === this.skuMenu.length) {
      this.selectValues.forEach(item => {
        this.handleSelectOneOption(item.x, item.y, item.key_id, item.value_id);
        str += item.value_id+ ","
      }) 
      return this.goodsMap[str]
    }
  
    return null;
  }

}
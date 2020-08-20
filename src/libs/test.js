var EventUtil = {
    /*检测绑定事件*/
    addHandler: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
      } else {
        element["on" + type] = handler /*直接赋给事件*/
      }
    },
    /*通过removeHandler*/
    removeHandler: function (element, type, handler) {
      /*Chrome*/
      if (element.removeEventListener)
        element.removeEventListener(type, handler, false);
      else if (element.deattachEvent) {
        /*IE*/
        element.deattachEvent('on' + type, handler);
      } else {
        element["on" + type] = null;
        /*直接赋给事件*/
      }
    }
  };
  
  // 设置默认溢出显示数量
  var spillDataNum = 5;
  
  // 设置隐藏函数
  let timeout = false;
  let triggerDataIndexChange = function (el, binding, vnode, oldVnode, currentTableHeight) {
    if (timeout) {
      clearTimeout(timeout);
    }
    const elTableBodyWrapper = el.querySelector('.el-table__body-wrapper');
    const virtualDiv = elTableBodyWrapper.querySelector('div.virtual-div');
    const elTableBody = elTableBodyWrapper.querySelector('table.el-table__body');
    const elTableRow = elTableBodyWrapper.querySelector('table tr.el-table__row');
    const context = vnode.context;
    const tableData = context.tableData;
  
    const elTableBodyWrapperHeight = elTableBodyWrapper.clientHeight;
    const elTableRowHeight = elTableRow.clientHeight;
    const showRowNum = Math.round(elTableBodyWrapperHeight / elTableRowHeight);
  
    let maxScrollTop = virtualDiv.clientHeight - elTableBodyWrapper.clientHeight - spillDataNum * elTableRowHeight;
    // 处理滚动条置顶的情况
    if (elTableBodyWrapper.scrollTop === 0) {
      context.currentStartIndex = 0;
      context.currentEndIndex = tableData.length + spillDataNum;
      elTableBody.setAttribute('style', 'transform: translateY(0px);width: ' + elTableBody.style.width + ';');
      return;
    }
  
    // 处理滚动条滚动中和置低的情况
    let scrollTopNum = elTableBodyWrapper.scrollTop / elTableRowHeight;
    let currentStartIndex = scrollTopNum;
    let currentEndIndex = scrollTopNum + showRowNum + spillDataNum;
    if (currentEndIndex - tableData.length >= 0) {
      context.currentStartIndex = tableData.length - 1 - showRowNum - spillDataNum;
      context.currentEndIndex = tableData.length - 1;
      elTableBody.setAttribute('style', 'transform: translateY(' + maxScrollTop + 'px);width: ' + elTableBody.style.width + ';');
      return;
    }
    context.currentStartIndex = currentStartIndex;
    context.currentEndIndex = currentEndIndex;
    elTableBody.setAttribute('style', 'transform: translateY(' + (elTableBodyWrapper.scrollTop) + 'px);width: ' + elTableBody.style.width + ';');
  };
  
  // 滚动条置低
  let handleScrollEnd = function (el) {
    const elTableBodyWrapper = el.querySelector('.el-table__body-wrapper');
    elTableBodyWrapper.scrollTop = elTableBodyWrapper.scrollHeight;
  };
  
  export default {
    name: 'loadmore',
    inserted: function (el, binding, vnode, oldVnode) {
      const isLoadmore = vnode.data.attrs['is-loadmore'];
      if (isLoadmore === 'NoScrollBar') {
        return;
      }
      const elTableBodyWrapper = el.querySelector('.el-table__body-wrapper');
      const elTableBodyWrapperChildren = elTableBodyWrapper.children;
      // 创建虚拟DIV，用来设置数据高度，触发滚动条高度更新
      const virtualDiv = document.createElement('div');
      virtualDiv.setAttribute('class', "virtual-div");
      elTableBodyWrapper.appendChild(virtualDiv);
      virtualDiv.appendChild(elTableBodyWrapperChildren[0]);
      // 滚动事件
      let handleMoveScroll = function () {
        triggerDataIndexChange(el, binding, vnode, oldVnode);
      }
      EventUtil.addHandler(elTableBodyWrapper, "scroll", handleMoveScroll);
    },
    update() {},
    componentUpdated: function (el, binding, vnode, oldVnode) {
      // 获取组件缓存的数据
      const dataSize = vnode.data.attrs['data-size'];
      const oldDataSize = oldVnode.data.attrs['data-size'];
      const isLoadmore = vnode.data.attrs['is-loadmore'];
      const isAddRowData = vnode.data.attrs['is-addRowData'];
  
      // 获取必要的DOM节点
      const elTableBodyWrapper = el.querySelector('.el-table__body-wrapper');
      const elTableRow = elTableBodyWrapper.querySelector('table tr.el-table__row');
      let elTableRowHeight = 0;
  
      if (elTableRow) {
        elTableRowHeight = elTableRow.clientHeight;
      }
      if (elTableRowHeight === 0) {
        elTableRowHeight = 25;
      }
  
      // 如果是设置不需要滚动条的模式，直接显示所有数据，并设置表格的高度为数据的高度
      if (isLoadmore === 'NoScrollBar') {
        const context = vnode.context;
        let tableHeight = (dataSize + 1) * elTableRowHeight + 40;
        context.currentTableHeight = tableHeight;
        return;
      }
  
      if (dataSize) {
        // 根据行高计算当前应该显示那些数据
        // 根据数据多少和行高设置虚拟滚动DIV的高度
        const virtualDiv = elTableBodyWrapper.querySelector('div.virtual-div');
        const virtualDivHeight = dataSize * elTableRowHeight;
        virtualDiv.setAttribute('style', `height: ${virtualDivHeight}px;`);
        // 首次进来，即currentStartIndex为零，如果可显示区域大于默认显示20条数据。要重新赋值默认显示的数量为显示区域的数量加上默认溢出的数量
        const bodyHeight = vnode.componentInstance.layout.height;
        const showRowNum = Math.round(bodyHeight / elTableRowHeight);
        const currentStartIndex = vnode.context.currentStartIndex;
        const currentEndIndex = vnode.context.currentEndIndex;
        if (currentStartIndex === 0 && bodyHeight && showRowNum > currentEndIndex) {
          vnode.context.currentEndIndex = showRowNum + spillDataNum;
        }
      }
  
      // 新增数据处理，直接将滚动条置底
      if (isAddRowData) {
        handleScrollEnd(el);
      }
    }
  };







  // 设置默认溢出显示数量
var spillDataNum = 20;

// 设置隐藏函数
var timeout = false;
let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum);
  });
};

export default {
  name: 'loadmore',
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const dataSize = vnode.data.attrs['data-size'];
      const oldDataSize = oldVnode.data.attrs['data-size'];
      if(dataSize === oldDataSize){
        return;
      }
      const selectWrap = el.querySelector('.el-table__body-wrapper');
      const selectTbody = selectWrap.querySelector('table tbody');
      const selectRow = selectWrap.querySelector('table tr');
      if (!selectRow) {
        return;
      }
      const rowHeight = selectRow.clientHeight;
      let showRowNum = Math.round(selectWrap.clientHeight / rowHeight);

      const createElementTR = document.createElement('tr');
      let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight;
      createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`);
      selectTbody.append(createElementTR);

      // 监听滚动后事件
      selectWrap.addEventListener('scroll', function () {
        let topPx = this.scrollTop - spillDataNum * rowHeight;
        let topNum = Math.round(topPx / rowHeight);
        let minTopNum = dataSize - spillDataNum - showRowNum;
        if (topNum > minTopNum) {
          topNum = minTopNum;
        }
        if (topNum < 0) {
          topNum = 0;
          topPx = 0;
        }
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
        createElementTR.setAttribute('style', `height: ${createElementTRHeight-topPx > 0 ? createElementTRHeight-topPx : 0}px;`);
        setRowDisableNone(topNum, showRowNum, binding);
      })
    });
  }
};


'https://clusterize.js.org/'

'https://github.com/NeXTs/Clusterize.js'
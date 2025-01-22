Page({
  onReady() {
    console.log("test页面已准备就绪,查询fogCanvas");

    const query = wx.createSelectorQuery().in(this);
    query.select("#fogCanvas").node().exec((res) => {
      console.log("SelectorQuery result in test页:", res);
      if (!res || !res[0]) {
        console.error("test页无法找到 fogCanvas 节点");
      } else {
        const canvas = res[0].node;
        console.log("test页fogCanvas 节点已找到:", canvas);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });
  }
});
// pages/jkcx/khxx/khxx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard : '',
    address : '',
    latitude: 1000,
    longitude: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      idcard: options.idcard,
      address: options.address,
      latitude: options.latitude,
      longitude: options.longitude,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindAddress: function (e) {
    if (this.data.latitude != 1000 || this.data.longitude != 1000) {
      wx.openLocation({
        latitude: parseFloat(this.data.latitude),
        longitude: parseFloat(this.data.longitude),
        scale: 12
      })
    }
  },
})
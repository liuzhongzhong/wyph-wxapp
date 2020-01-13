// pages/yqcx/image/image.js
import $ from '../../../common/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id: 0,
    loan_id: 0,
    imageArray: [],
    countImage: 0,
    hasImage:true,
    noneMessage: '暂无外访资料'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customer_id: options.customer_id,
      loan_id: options.loan_id,
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
    var that = this;
    $.post(
      'index.php?m=wxapp&c=yuqi&a=loanImages',
      {
        customer_id: this.data.customer_id,
        loan_id: this.data.loan_id,
      },
      function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          that.setData({
            hasImage: true,
            imageArray: res.data.imageArray,
            countImage: res.data.countImage,
          });
        }else {
          that.setData({
            hasImage: false,
            noneMessage: res.data.message,
          });
        }
      }
    );
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

  bindPreviewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.imageArray,
    })
  }
})
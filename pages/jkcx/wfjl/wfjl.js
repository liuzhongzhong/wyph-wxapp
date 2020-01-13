// pages/jkcx/wfjl/wfjl.js
import $ from '../../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loan_id: 0,
    foreign: [],
    latitude: 1000,
    longitude: 1000,
    is_tour: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loan_id: options.loan_id
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
      'index.php?m=wxapp&c=loan&a=getLoanForeignInfo',
      {
        loan_id: this.data.loan_id,
      },
      function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          that.setData({
            foreign: res.data.foreign,
            longitude: res.data.latitude,
            latitude: res.data.longitude,
            is_tour: res.data.is_tour,
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

  bindPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.customer.phone,
    })
  },
})
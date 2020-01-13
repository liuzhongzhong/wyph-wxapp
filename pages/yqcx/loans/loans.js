// pages/yqcx/loans/loans.js
import $ from '../../../common/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id: 0,
    loansArray: [],
    countLoans: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.customer_id) {
      this.setData({
        customer_id: options.customer_id,
      });
    }
    
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
      'index.php?m=wxapp&c=yuqi&a=getLoansByCustomer',
      {
        customer_id: this.data.customer_id,
      },
      function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          that.setData({
            countLoans: res.data.countLoans,
            loansArray: res.data.loans,
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

  bindValue: function (e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    wx.navigateTo({
      url: '../value/value?loan_id=' + loan_id + '&customer_id=' + this.data.customer_id,
    })
  }
})
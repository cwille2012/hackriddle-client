module.exports = {

  formatEpoch: function(epoch) {
    // eslint-disable-next-line
    var date = String(new Date(parseInt(epoch)));
    date = date.substring(3, date.indexOf('GMT')-4);
    return(date);
  }
}
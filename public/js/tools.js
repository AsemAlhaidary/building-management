let instance = null;
class tools {
  static getToolsInstance() {
    return instance ? instance : new tools();
  }

  getPeriod(fDate, sDate) {
    const firstDate = new Date(fDate);
    const lastDate = new Date(sDate);
  
    const periodMs = lastDate.getTime() - firstDate.getTime();
  
    period = Math.floor(periodMs / 1000 / 60 / 60 / 24);
  
    return period;
  }

  getStandardDate(date) {
    let today = new Date(date);
    return (today.getDate()) + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear());
  }
}

module.exports = tools;
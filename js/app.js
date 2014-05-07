App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('regas', { path: '/' }, function(){
    this.resource('listView', { path: '/' })
  });
});

App.RegaEntry = DS.Model.extend({
  alias: DS.attr('string'),
  rega: DS.attr('string'),
  ei: DS.attr('string')
});


App.RegaEntry.FIXTURES = [
 {
  id: 1,
  alias: "alias1",
  rega: "rega1",
  ei: "ei1"
 },
 {
  id: 2,
  alias: "alias2",
  rega: "rega2",
  ei: "ei2"
 },
 {
  id: 3,
  alias: "alias3",
  rega: "rega3",
  ei: "ei3"
 }
];

App.ListViewRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('RegaEntry');
  }
});



App.RegaEntryController = Ember.ObjectController.extend({
  actions: {
    removeRegaEntry: function () {
      var regaEntry = this.get('model');
      regaEntry.deleteRecord();
      regaEntry.save();
    }
  }
});

App.RegasController = Ember.ArrayController.extend({
  actions: {
    createRegaEntry: function () {
      var alias = this.get('alias')
        , rega = this.get('rega')
        , ei = this.get('ei');

      if(!alias.trim() || !rega.trim() || !ei.trim()) { return; }

      var regaEntry = this.store.createRecord('RegaEntry', {
        id: Date.now(),
        alias: alias,
        rega: rega,
        ei: ei
      });

      this.set('alias', '');
      this.set('rega', '');
      this.set('ei', '');

      regaEntry.save();
    }
  }
});
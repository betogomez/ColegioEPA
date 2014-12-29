ColegioEPA.StudentsEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
        location.save();
        this.get("target").transitionTo("students");
      }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.StudentsIndexController = Ember.ArrayController.extend({
      editCounter: function () {
        return this.filterProperty('selected', true).get('length');
      }.property('@each.selected'),

      itemsSelected: function() {
        return this.get("editCounter")>0;
      }.property('editCounter'),
       exitStudent: function() {
        var itemsPresent = this.get('content').get('length') > 0;
        console.log(" +++ Computed locationsPresent prop with value " + itemsPresent);
        return itemsPresent;
      }.property("content.@each"),

    actions: {
        removeItem: function(student) {
            student.on("didDelete", this, function() {
                console.log("record deleted");
            });
            student.destroyRecord();
        },

        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length==0) {
                output = "nothing selected";
            } else { 
                output = "";
                for (i=0 ; i<arr.length ; i++) { 
                  arr[i].destroyRecord()
                }
            }
        }
    }
  //}.property("content.isLoaded")
});

Ember.Handlebars.registerBoundHelper('locsPresent', 
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);


/*
ColegioEPA.NewController = Ember.Controller.extend({
    model: 'Student',
    actions: { 
        saveStudent:function(event) {
            var studentRecord =  {
                nombre: this.nombre,
                email:this.email,
                ci :this.ci,
                birthDate:this.birthDate
            };
            this.store.createRecord('student',studentRecord).save();
            
        }
    }
});


ColegioEPA.StudentAllController = Ember.ArrayController.extend({
    filter : '',
    filteredContent: function() {
    var filter = this.get('filter');
    var rx = new RegExp(filter, 'gi');
    var countries = this.get('arrangedContent');

    return countries.filter(function (country) {
      return country.get('nombre').match(rx);
    });

  }.property('arrangedContent', 'filter'),

  actions: {
    sortBy: function(property) {
      this.set('sortProperties', [property]);
      this.set('sortAscending', !this.get('sortAscending'));
    }

}
});
*/

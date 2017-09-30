module.exports = {
  run: function(room_num,Hive) {
    var spawn_name = Hive.spawn_names[room_num];
    // Local Link control
    for ( let link of Hive.links[room_num]) {
      // Find the receiving link
      var link_obj = Game.getObjectById(link);
      if ( link_obj != undefined && ( link == Hive.receiving_link[room_num]) ) {
        //console.log("rec link: " + link_obj);
        var receiving_link = link_obj;
      }
    }

    // check if the sending lnks are full, xfer if so
    for ( let link of Hive.links[room_num]) {
      var link_obj = Game.getObjectById(link);
      if ( link_obj != undefined && ( link != Hive.receiving_link[room_num])  ) {
          var status = link_obj.transferEnergy(receiving_link);
          //console.log("link xfer status: " + status + " : " + link_obj);
      }
    }
  }
};

module.exports = {
	run: function(Hive) {

    function Squad(id,leader,members,movedest,attacktarget) {
      this.id = id;
      this.leader = leader;
      this.member = members;
      this.movedest = movedest;
      this.attacktarget = attacktarget;
      this.addMember = function (newMember) {
        this.member.push(newMember);
      }
      this.delMember = function (rmMember) {
        this.member.splice(rmMember,1);
      }
    }

    var sq1 = new Squad(1,'leader1',['mem1','mem2','mem3'],'movedest','attack');
    Hive.military_squad.push(sq1);

//    sq1.addMember('mem4');
//    console.log("A:" + Hive.military_squad[0].member[3]);

    //sq1.delMember(3);
    //console.log("A:" + Hive.military_squad[0].member[3]);

  }
};

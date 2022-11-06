class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return  `${this.name} plays ${this.position}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;   
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) { //instanceof opereator checks the type of object at run time, to see if flavor is actually an instance of flavor class
            this.players.push(player);
        } else {
          throw new Error(`You can only add an instance of Player. Argument is not a player: ${player}`);
        }
    }

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

start() { //(top down development approach) using methods that don't exist yet, build out menu how we think it will look like then 
//implement those methods, start at top we need to build these methods, this is where they will be used then implement the methods
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
        switch (selection) {
            case '1':
                this.createTeam();
                break;  
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                 case '4': 
                    this.displayTeams();
                    break;  
                 default:
                    selection = 0;
        }
        selection = this.showMainMenuOptions();
    }

    alert('Goodbye!');
  }

showMainMenuOptions() {
  return prompt(`
    0) exit
    1) create new team
    2) view team
    3) delete team
    4) display all teams
  `);
}

showTeamMenuOptions(teamInfo) {
    return prompt(`
    0) back
    1) create player
    2) delete player
    ---------------------
    ${teamInfo}
  `);
}

displayTeams() {
  let teamString = '';
  for (let i = 0; i < this.teams.length; i++) {
    teamString += i + ') ' + this.teams[i].name + '\n'; //create a blank string, iteriate through teams, grab each team, get name for specific team, add new line for//
    //create a blank string, iteriate through brands, grab each brand, get name for specific brand, add new line 
  }
  alert(teamString); //see all teams//
}

createTeam() {
    let name = prompt('Enter name for new team: '); //prompt user for name give to team//
    this.teams.push(new Team(name)); //create a new instance of an object class
}

viewTeam() {
    let index = prompt('Enter the index of the team you wish to view');
    if (index > -1 && index < this.teams.length) {
     this.selectedTeam = this.teams[index];
     let description = 'Team Name: ' + this.selectedTeam.name + '\n';

     for (let i = 0; i < this.selectedTeam.players.length; i++) {
       description += i + ') ' + this.selectedTeam.players[i].name
        + ' - ' + this.selectedTeam.players[i].position + '\n';
     }

    let selection = this.showTeamMenuOptions(description);
    switch (selection) {
      case '1':
        this.createPlayer();
        break;
      case '2':
        this.deletePlayer();
    }
  }
 }

 deleteTeam() {
    let index = prompt('Enter the index of the team you wish to delete:');
    if (index > -1 && index < this.teams.length) {
        this.teams.splice(index, 1);
    }
 }

 createPlayer() {
    let name = prompt('Enter name for new player:');
    let position = prompt('Enter position for new player:');
    this.selectedTeam.players.push(new Player(name, position));
 }

 deletePlayer() {
    let index = prompt("Enter the index of the player you wish to delete:");
    if (index > -1 && index < this.selectedTeam.players.length) {
        this.selectedTeam.players.splice(index, 1);
    }
 }
}

let menu = new Menu();
menu.start();
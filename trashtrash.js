/*•	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
•	Use at least one array.
•	Use at least two classes.
•	Your menu should have the options to create, view, and delete elements.*/


class Flavor { //first class
    constructor(name, price) { //creates and initalizes name of flavor and price
        this.name = name;// dot notation, access properties on name
        this.price = price; //dot notation, access properties on price
    }

    describe() { //prints flavor information
        return  `${this.name} cost ${this.price}.`;//returns name of flavor and price
    }
}

class IceCream { //second class
    constructor(brand) { //creates and initalizes ice cream brand
        this.brand = brand;//dot notation, access properties on brand    
        this.flavors = []; //blank array
    }

    addFlavor(flavor) {
        if (flavor instanceof Flavor) { //checks to see if flavor is actually an instance of flavor class
            this.flavors.push(flavor); //pushes flavor to array
        } else {
          throw new Error(`You can only add an instance of Flavor. Argument is not a flavor: ${flavor}`); //will tell user what they did wrong 
        }
    }

    describe() { //prints brand and flavor information
        return `${this.brand} has ${this.flavors.length} flavors.`; //returns brand of ice cream and flavor
    }
}

class Menu { //drives application and choices
    constructor() {
        this.icecreams = []; //initialize array of ice cream brands
        this.selectedIceCream = null; //variable for ice cream brand selected, set to null because in the beginning no brands are selected
    }

start() { //start or entry point of menu application
    let selection = this.showMainMenuOptions(); //selection beginning, builds menu methods and returns user selection

    while (selection != 0) { //variabe to get user imput of which option in the menu the user selected
        switch (selection) { //what user selects to do something based off of what was selected
            case '1':
                this.createIceCream(); 
                break;  
                case '2':
                    this.viewIceCream();
                    break;
                case '3':
                    this.deleteIceCream();
                    break;
                 case '4': 
                    this.displayIceCreams();
                    break;  
                 default:
                    selection = 0;
        }
        selection = this.showMainMenuOptions(); //keeps looping as long as 0 or something other than 1-4 are not selected
    
    }

    alert('Goodbye!'); //it's outside of loop, if user selects 0, will default and exit out of loop
  }

showMainMenuOptions() { //will return an option based on the index the user chooses 
  return prompt(` 
    0) exit
    1) create new ice cream
    2) view ice cream
    3) delete ice cream
    4) display all ice creams
  `);
}

showIceCreamMenuOptions(iceCreamInfo) { //will return an option based on the index the user chooses 
    return prompt(`
    0) back
    1) create flavor
    2) delete flavor
    ---------------------
    ${iceCreamInfo}
  `);
}

displayIceCreams() { //list all brands that exist
  let iceCreamString = ''; //creates blank string, builds a string that has all info for ice creams to put in prompt box
  for (let i = 0; i < this.icecreams.length; i++) { //menu class, list of all brands that exist, iterate through ice creams and grab each brand
    iceCreamString += i + ') ' + this.icecreams[i].brand + '\n'; //get name of specific brand and add a new line all brand names show with an index number on a different line
    
  }
  alert(iceCreamString); //outside of for loop, shows all ice cream brands
}

createIceCream() {
    let brand = prompt('Enter brand for new ice cream: '); //prompt user for brand of ice cream
    this.icecreams.push(new IceCream(brand)); //create a new brand, pass brand into ice cream that will be pushed to ice cream array
}

viewIceCream() { 
    let index = prompt('Enter the index of the ice cream you wish to view'); //asks user which index of the brand they want to view
    if (index > -1 && index < this.icecreams.length) { //validates user imput
     this.selectedIceCream = this.icecreams[index]; //selected ice cream class property to the brand imput by user
     let description = 'Ice Cream Brand: ' + this.selectedIceCream.brand + '\n'; //prints out description of brands

     for (let i = 0; i < this.selectedIceCream.flavors.length; i++) { //flavors array
       description += i + ') ' + this.selectedIceCream.flavors[i].brand 
        + ' - ' + this.selectedIceCream.flavors[i].price + '\n'; //prints index of selected ice cream flavors array 

    let selection = this.showIceCreamMenuOptions(description); //displays options for the ice cream brand
    switch (selection) { //sub menu of full menu
      case '1':
        this.createFlavor();
        break;
      case '2':
        this.deleteFlavor();
    }
  }
 }

 deleteIceCream() {
    let index = prompt('Enter the index of the ice cream you wish to delete:'); //user can delete index of ice cream brand 
    if (index > -1 && index < this.icecreams.length) {
        this.icecreams.splice(index, 1);
    }
 }

 createFlavor() { 
    let name = prompt('Enter name for new flavor:'); //user enters flavor
    let price = prompt('Enter price for new flavor:'); //user enters price
    this.selectedIceCream.flavors.push(new Flavor(name, price)); //pushes new flavors name and price 
 }

 deleteFlavor() {
    let index = prompt("Enter the index of the flavor you wish to delete:"); //user can delete index of flavor
    if (index > -1 && index < this.selectedIceCream.flavors.length) { 
        this.selectedIceCream.flavors.splice(index, 1); //deletes flavor
    }
 }
}

let menu = new Menu(); //menu instance to use code
menu.start(); //method that shows everything
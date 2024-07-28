class Message {
   // Write code here!
   constructor(name, commands){
      if (!name) {
         throw Error ('Name parameter required.');
      }
      if (typeof name !== 'string'){
         throw Error ("Name must be a string")
      };
      if (!Array.isArray(commands)){
         throw Error ("commands must be an array.");
      }
      this.name = name;
      this.commands = commands;
      }
      }

module.exports = Message;
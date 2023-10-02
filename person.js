module.exports = {
 Person: function(name, country){
        this.name= name;
        this.url = name + ".jpg";
        this.country = country;
    

    this.addCountry = function(country){
        this.country = country;
        
        return this;
    }
    this.addName = function(Personname){
        this.name = Personname;
        this.url = Personname + ".jpg";
        return this;
    }
}
};
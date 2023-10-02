const set = new Set();

function getRandom(){
    const random = Math.floor(Math.random() * 100) % 40;
    return random;
}
let list = [];
while(set.size != 40){
    const random = getRandom();
    if (!set.has(random)){
        list.push(random);
        console.log("Adding " + random + " to the set");
        set.add(random);
    }
    console.log(list.sort((a, b) => {
        return (a > b);
    }
    ));
}
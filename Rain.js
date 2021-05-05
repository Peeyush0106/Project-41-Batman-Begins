class RainDrop {
    constructor(x, y) {
        // Extracting properties from the parameters and creating some
        this.x = x;
        this.y = y;
        this.options = {
            friction: 0.04,
            restitution: 0.1,
            density: 0.001
        }
        this.radius = random(1.5, 3.5);
        this.diameter = this.radius * 2;
        // Creating objects and adding them to world where the game works
        this.body = Bodies.circle(this.x, this.y, this.radius, this.options);
        World.add(world, this.body);
    }
    // Display rain drops
    display() {
        push();
        fill("blue");
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        ellipse(0, 0, this.diameter);
        pop();
    }
}
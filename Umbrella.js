class Umbrella {
    constructor(x, y) {
        // Extracting properties from the parameters and creating some
        this.x = x;
        this.y = y;
        this.options = {
            isStatic: true,
            density: 2,
            friction: 0.04
        }
        this.radius = 20;
        this.diameter = this.radius * 2;
        this.body = Bodies.circle(this.x, this.y, this.radius, this.options);
        this.bodyRect1Width = 45;
        this.bodyRect2Width = 55;
        this.bodyRectHeight = 15;
        // Creating objects and adding them to world where the game works
        this.bodyRect1 = Bodies.rectangle(120, 210, this.bodyRect1Width, this.bodyRectHeight, this.options);
        this.bodyRect2 = Bodies.rectangle(170, 200, this.bodyRect2Width, this.bodyRectHeight, this.options);
        World.add(world, [this.body, this.bodyRect1, this.bodyRect2]);
        // Setting angles of bodies that need to be titled
        Body.setAngle(this.bodyRect1, -45);
        Body.setAngle(this.bodyRect2, 35);
    }
}
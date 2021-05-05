/*                                              
                                                        |   |
                                                        |---| |--| | |  __
                                                        |   | |--| | | |  |
                                                        |   | |___ | | |__|
*/

// Matter.js setup
const Engine = Matter.Engine;
const World = Matter.World;
const Render = Matter.Render;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;
const Common = Matter.Common;
var engine = Engine.create();
var world = engine.world;

// Initial content declaration
var thunders, walk, canvas, displayingImage,
    displayingImagePos, displayingAnimPos, showThunder,
    umbrella, droplets, dropletCreationRate, animationPos;

var thunderImagePath = "images/thunderbolt/";
var thunderImagExtension = ".png";
var walkImagePath = "images/Walking/";
var walkImagExtension = ".jpg";

// Load images and animations
function preload() {
    // thunder
    thunders = loadMyImages(4, thunderImagePath, thunderImagExtension);
    // Walking
    walk = loadAnimation("images/Walking/1.jpg",
        "images/Walking/2.jpg",
        "images/Walking/3.jpg",
        "images/Walking/4.jpg",
        "images/Walking/5.jpg",
        "images/Walking/6.jpg",
        "images/Walking/7.jpg",
        "images/Walking/8.jpg",
    );
}
function setup() {
    // Canvas
    canvas = createCanvas(300, 420);
    // Other variables
    showThunder = false;
    droplets = [];
    dropletCreationRate = random(1, 9);
    // The gravity of the world in the game
    world.gravity.y = 0.12;
    // Umbrella
    umbrella = new Umbrella(145, 200);
    // I even wanted some x gravity for correct animation, but that allows something much weird than expected. The rain balls stick on the umbrella because the gravity is pulling them. But this should not occur, so I had to forcefully remove this.
    // Run the engine of the game
    Engine.run(engine);
}
function draw() {
    modesAndOtherFunctionControl()
    showAndCreateRaindrops();
}

function showAndCreateRaindrops(){
    // Create Rain drops
    if (droplets.length < 100) {
        createRaindrops();
    }
    // Show rain drops
    for (var i in droplets) {
        droplets[i].display();
    }
}

// Control the modes of the game and make it according to needs
function modesAndOtherFunctionControl() {
    background("black");
    Engine.update(engine);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(CENTER);
    displayAnimationsAndImages();
    Engine.update(engine);
}

// Show all animations and images
function displayAnimationsAndImages() {
    // Check when to start thunder
    if (frameCount % 100 === 0) {
        showThunder = true;
        displayingImage = displayImage(false, true);
        setImageSize(thunders);
    }

    // Check when to stop thunser
    if (frameCount % 100 === 10) {
        showThunder = false;
    }

    // Check whether the thunder should be shown or not
    if (showThunder) {
        displayingImagePos.x -= 1;
        image(displayingImage, displayingImagePos.x, displayingImagePos.y);
    }

    // Show walking
    animation(walk, 150, 290);

    // Reset rain drops
    resetRain();
}

// Function for creating the rain drops
function createRaindrops() {
    if (frameCount % Math.round(dropletCreationRate) === 0) {
        droplets.push((new RainDrop(random(0, canvas.width), -40)));
        dropletCreationRate = random(1, 9);
    }
}

// Resetting the rain drops for avoiding memory leaks
function resetRain() {
    for (var j in droplets) {
        if (droplets[j].body.position.y > canvas.height + 40) {
            Body.setPosition(droplets[j].body, {
                x: random(0, canvas.width),
                y: random(-200, -30)
            });
        }
    }
}

// Set thunder size
function setImageSize(array) {
    for (var k in array) {
        var thunderIMG = array[k];
        var min = 100;
        var max = 250;
        thunderIMG.width = random(min, max);
        thunderIMG.height = random(min, max);
    }
}

// Load all images needed
function loadMyImages(noOfImages, path, extension) {
    var imageArray = [];
    for (var l = 0; l < noOfImages; l++) {
        var image = loadImage(path + (l + 1) + extension);
        imageArray.push(image);
    }
    return imageArray;
}

// Global function that works for any p5._image to display images
function displayImage(display, randomX) {
    var imageDisplay = thunders[Math.round(random(0, thunders.length - 1))];
    if (randomX) {
        var a = random(0, canvas.width);
        var b = -30;
    }
    else {
        var b = random(0, canvas.height);
        var a = -30;
    }
    if (display) {
        image(imageDisplay, a, b);
    }
    displayingImagePos = {
        x: a,
        y: b
    };
    return imageDisplay;
}
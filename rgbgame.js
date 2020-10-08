Vue.component('gameheader', {
    props: ['colour'],
    template: `
        <div id="header">
            <h1>The Great <br>
                <span id="colorDisplay">rgb({{colour.r}}, {{colour.g}}, {{colour.b}})</span>
                <br>
                Guessing Game
            </h1>
        </div>
    `
});

Vue.component('buttonsheader', { 
    data() {
		return {
            difficult: true,
            cant: 6
        }
    },
    props: ['colour', 'colours', 'showmessage'],
    created() {
        this.restart();
    },
    methods: {
        easy() {
            if (this.difficult) {
                this.difficult = false;
                this.cant = 3;
                this.restart();
            }
        },
        hard() {
            if (!this.difficult) {
                this.difficult = true;
                this.cant = 6;
                this.restart();
            }
        },
        restart() {
            this.colours.splice(0, this.colours.length, ...this.createNewColours());
            let pickedColour = this.colours[this.pickColour()];
            this.colour.r = pickedColour.r;
            this.colour.g = pickedColour.g;
            this.colour.b = pickedColour.b;
        },
        createNewColours() {
            let arr = [];
            for (var i = 0; i < this.cant; i++) {
                arr.push(this.createRandomStringColour());
            }
            return arr;
        },
        createRandomStringColour() {
            return {
                r: this.randomInt(),
                g: this.randomInt(), 
                b: this.randomInt()
            };
        }, 
        randomInt() {
            return Math.floor(Math.random() * 256);
        },
        pickColour() {
            return Math.floor(Math.random() * this.cant);
        },        
    },    
    template: `
        <div id="navigator">
            <button id="reset" @click="restart">New colours</button>
            <span id="message"> {{ showmessage }} </span>
            <button id="easy" v-bind:class="{ selected: !difficult }" @click="easy()">easy</button>
            <button id="hard" v-bind:class="{ selected: difficult }" @click="hard()">hard</button>
        </div>
    `
});

Vue.component('colourbox', { 
    data() {
		return{
            backgroundColor: `rgb(${this.colour.r},${this.colour.g},${this.colour.b})`
        };
    },
    props: ['colour', 'index', 'winner'],
    methods: {
        show(){
            this.winner(this.colour, this.index);
        },
    },
    template: `
        <div id="container">
            <div class="square" :style="{'background-color': backgroundColor}" @click="show"></div>
        </div>
     `
});

var app = new Vue({
    el: '#app',
    data: {
        colour: {
            r: 0,
            g: 0,
            b: 0
        },
        colours: [],
        showMessage: "Pick a Colour!"
    },
    methods: {
        winner(colourBox, actual) {
            if(JSON.stringify(colourBox) === JSON.stringify(this.colour)) {
                this.showMessage = "You Picked Right!";
                for (let index = 0; index < this.colours.length; index++) {
                    Object.assign(this.colours[index], colourBox);
                }
                setTimeout(() => {
                    this.showMessage = "Click on New Colours to play again!"
                }, 2000);
            } else {
                this.showMessage = "Try Again!";
                this.colours[actual].r = 23;
                this.colours[actual].g = 23;
                this.colours[actual].b = 23;
            }
        },
        key(colour){
            return '' + Math.random() * 100000 + colour.r + colour.g + colour.b;
        }
    },
});
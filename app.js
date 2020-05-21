new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        attack() {
            let attack = this.calcuateAttack(9, 3);
            this.monsterHealth -= attack;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + attack
            });
            if (this.checkResult()) {
                return;
            };
            this.monsterAttacks();
        },
        specialAttack() {
           let attack = this.calcuateAttack(20, 11);
           this.monsterHealth -= attack;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Monster by special attack for ' + attack
            });
           if (this.checkResult()) {
               return
           }
           this.monsterAttacks();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100
            }
            this.logs.unshift({
                isPlayer: true,
                text: 'Player heals :) '
            });
            this.monsterAttacks();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttacks() {
            let attack = this.calcuateAttack(9, 3);
            this.playerHealth -= attack;
            this.checkResult();
            this.logs.unshift({
                isPlayer: false,
                text: 'Monster hits the player for ' + attack
            });
        },
        calcuateAttack(max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkResult() {
            if (this.monsterHealth <= 0) {
                if (confirm('Congrats You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost, don\'t stop now! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false
                }
                return true;
            }
            return false;
        }
    }
})

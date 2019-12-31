const enumCardAswers = {
    EASY: 7,
    GOOD: 5,
    HARD: 2,
    WRONG: 0,  
    multiple: function( x ){
        if( x === 0) x= 1;
        let newObj = {
            EASY: this.EASY * x,
            GOOD: this.GOOD * x,
            HARD: this.HARD * x,
            WRONG: this.WRONG * x,
        };
        return newObj;
    }
};

module.exports= enumCardAswers;
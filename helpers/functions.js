module.exports = {
    randomNum(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
    }
};
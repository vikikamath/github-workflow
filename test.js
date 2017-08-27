const wf = require(`./workflow`);
const wait = require(`./wait-promise`);

const alphas = `abcdefghijklmnopqrstuvwxyz`.split(``);
const nums = `0123456789`.split(``);
const alphaNums = alphas.concat(nums);
const randInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);
const randStr = (minLen, maxLen, sampleSet) => {
	const rndStrLen = randInt(minLen, maxLen);
	let str = ``;
	while(rndStrLen > str.length) {
		str += sampleSet[randInt(0, rndStrLen)];
	}
	return str;
}

// console.log(randStr(4,10, alphaNums))


wf.activate(`${randStr(4,8,alphaNums)}.txt`, `${randStr(20,250, alphaNums)}`)
	.then(res => console.log(res))
	.then(_ => {
		console.log(`Commit was pushed to dev... now promoting changes to 'qa'`);
		return wait(10000)()
	})
	.then(_ => wf.promote(`dev`, `qa`))
	.then(_ => {
		return wait(10000)();
	})
	.then(_ => {
		console.log(`Promoted changes to qa...now promoting to master`);
		return wf.promote(`qa`, `master`);
	})
	.then(_ => {
		console.log(`Promotion to master completed!. Finished`);
	})
	.catch(err => console.log(err.message))


// console.log(`Promoting from 'dev' to 'qa'...`);
// // after some time
// setTimeout(() => {

// 	wf.promote(`dev`, `qa`)
// 		.then(res => console.log(`Finished promoting from 'dev' to 'qa'!`))
// 		.catch(err => console.log(err.message))

// }, 5000);

// console.log(`Promoting from 'dev' to 'qa'...`)
// setTimeout(() => {

// 	wf.promote(`qa`, `master`)
// 		.then(res => console.log(`Finished promoting from 'qa' to 'master'!`))
// 		.catch(err => console.log(err.message))
// }, 5000)


const R = require('ramda');
const stuff = require('./stuff.json');

const [ versions, times, tags ] = R.props(['versions', 'time', 'dist-tags'], stuff);

const pickOnAll = what => R.map(R.pick(what))
const omitOnAll = what => R.map(R.omit(what))

const addTime = t => R.map(x => ({
  ...x,
  time: t[x.version]
}))

const addTarball = x => ({
  ...x,
  tarball: x.dist.tarball
})

const packerizify = R.compose(
  omitOnAll(['dist']),
  R.map(addTarball),
  addTime(times),
  pickOnAll(['version', 'dist']),
  R.values
);

console.log(packerizify(versions))
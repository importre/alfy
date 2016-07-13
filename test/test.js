import test from 'ava';
import hookStd from 'hook-std';

process.env.AVA = true;
const m = require('../');

m.input = 'Unicorn';

test('default', t => {
	t.false(m.debug);
	t.is(typeof m.icon.error, 'string');
});

test('.error()', t => {
	m.error(new Error('foo'));

	const unhook = hookStd.stdout(output => {
		unhook();
		t.is(JSON.parse(output).items[0].title, 'Error: foo');
	});
});

test('.matches()', t => {
	t.deepEqual(m.matches('Unicorn', ['foo', 'unicorn']), ['unicorn']);
	t.deepEqual(m.matches('Unicorn', [{name: 'foo'}, {name: 'unicorn'}], 'name'), [{name: 'unicorn'}]);
	t.deepEqual(m.matches('Foobar', [{name: 'foo', sub: 'bar'}, {name: 'unicorn', sub: 'rainbow'}], (item, input) => item.name + item.sub === input), [{name: 'foo', sub: 'bar'}]);
});

test('.inputMatches()', t => {
	t.deepEqual(m.inputMatches(['foo', 'unicorn']), ['unicorn']);
});

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { classNames, cx, createId, resetIdCounter, canUseDOM } from '../src/index.js';

describe('classNames (cx) utility', () => {
  it('combines string arguments', () => {
    assert.equal(cx('aui-btn', 'aui-btn--primary'), 'aui-btn aui-btn--primary');
  });

  it('handles falsy arguments correctly', () => {
    assert.equal(
      cx('aui-btn', null, undefined, false, '', 0, 'aui-btn--lg'),
      'aui-btn aui-btn--lg'
    );
  });

  it('handles object conditional classes', () => {
    assert.equal(
      cx('aui-btn', {
        'is-active': true,
        'is-disabled': false,
        'aui-btn--sm': true
      }),
      'aui-btn is-active aui-btn--sm'
    );
  });

  it('handles nested arrays', () => {
    assert.equal(
      cx(['aui-btn', ['aui-btn--primary', { 'is-loading': true }]]),
      'aui-btn aui-btn--primary is-loading'
    );
  });

  it('returns an empty string when given no valid classes', () => {
    assert.equal(cx(), '');
    assert.equal(cx(null, false, undefined), '');
  });

  it('exposes classNames as alias of cx', () => {
    assert.equal(classNames, cx);
  });
});

describe('createId utility', () => {
  beforeEach(() => {
    resetIdCounter();
  });

  it('generates sequential IDs with default aui prefix', () => {
    assert.equal(createId(), 'aui-1');
    assert.equal(createId(), 'aui-2');
    assert.equal(createId(), 'aui-3');
  });

  it('supports custom prefix', () => {
    assert.equal(createId('input'), 'input-1');
    assert.equal(createId('modal'), 'modal-2');
  });

  it('resets counter when resetIdCounter is called', () => {
    assert.equal(createId(), 'aui-1');
    resetIdCounter();
    assert.equal(createId(), 'aui-1');
  });
});

describe('canUseDOM utility', () => {
  it('exports a boolean flag', () => {
    assert.equal(typeof canUseDOM, 'boolean');
  });
});


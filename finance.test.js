const {test}=require('node:test');const assert=require('node:assert/strict');const {allocate,balances}=require('./public/finance');
const investors=[{id:'a',classId:'A',commitment:100},{id:'b',classId:'A',commitment:100},{id:'c',classId:'B',commitment:100}];
test('allocation conserves cents with deterministic remainder',()=>{assert.deepEqual(allocate(1,investors),[{id:'a',amount:.34},{id:'b',amount:.33},{id:'c',amount:.33}])});
test('class expenses are restricted to eligible LPs',()=>{assert.deepEqual(allocate(25,investors,'B'),[{id:'c',amount:25}]);assert.throws(()=>allocate(10,investors,'missing'))});
test('capital rollforward and unfunded commitment use distinct cash flows',()=>{const tx=[['call',60],['distribution',10],['income',8],['expense',3]].map(([type,amount])=>({type,allocations:[{id:'a',amount}]}));assert.deepEqual(balances(investors[0],tx),{called:60,distributed:10,income:8,expense:3,unfunded:40,capital:55})});
test('invalid amounts cannot be allocated',()=>{assert.throws(()=>allocate(-1,investors));assert.throws(()=>allocate(NaN,investors))});

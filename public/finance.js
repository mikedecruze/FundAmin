(function(root){
 function allocate(amount, investors, classId='all') {
  if(!Number.isFinite(amount)||amount<0) throw Error('Amount must be nonnegative');
  const eligible=investors.filter(i=>classId==='all'||i.classId===classId);
  const total=eligible.reduce((s,i)=>s+i.commitment,0);
  if(!total)throw Error('No eligible commitments');
  const cents=Math.round(amount*100);
  const rows=eligible.map(i=>({id:i.id,amount:Math.floor(cents*i.commitment/total),fraction:(cents*i.commitment/total)%1}));
  let left=cents-rows.reduce((s,r)=>s+r.amount,0);
  [...rows].sort((a,b)=>b.fraction-a.fraction).forEach(r=>{if(left>0){r.amount++;left--;}});
  return rows.map(({id,amount})=>({id,amount:amount/100}));
 }
 function balances(investor,transactions){
  let called=0,distributed=0,income=0,expense=0;
  transactions.forEach(t=>{const a=t.allocations.find(a=>a.id===investor.id)?.amount||0;if(t.type==='call')called+=a;if(t.type==='distribution')distributed+=a;if(t.type==='income')income+=a;if(t.type==='expense')expense+=a;});
  return {called,distributed,income,expense,unfunded:investor.commitment-called,capital:called+income-expense-distributed};
 }
 const api={allocate,balances};if(typeof module!=='undefined')module.exports=api;else root.Finance=api;
})(globalThis);

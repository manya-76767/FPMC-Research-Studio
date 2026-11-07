import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const API = 'http://127.0.0.1:8000';
function App(){
  const [health,setHealth]=useState('Checking API…');
  const [dataset,setDataset]=useState(null);
  const [form,setForm]=useState({epochs:15,embedding_dim:32,learning_rate:0.01,regularization:0.001,negative_samples:10});
  const [result,setResult]=useState(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  useEffect(()=>{
    fetch(API+'/api/health').then(r=>r.json()).then(()=>setHealth('Backend connected')).catch(()=>setHealth('Backend not connected'));
    fetch(API+'/api/dataset').then(r=>r.json()).then(setDataset).catch(()=>{});
  },[]);
  const change=(e)=>setForm({...form,[e.target.name]:Number(e.target.value)});
  async function run(){
    setBusy(true);setError('');setResult(null);
    try{
      const r=await fetch(API+'/api/experiments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const data=await r.json(); if(!r.ok) throw new Error(data.detail||'Experiment failed'); setResult(data);
    }catch(e){setError(e.message+' — Check that the FastAPI backend is running.');}
    finally{setBusy(false);}
  }
  return <div className="shell">
    <aside><div className="brand"><span className="mark">F</span><div><b>FPMC</b><small>RESEARCH STUDIO</small></div></div>
      <nav><a className="active">◫ &nbsp; Overview</a><a>▤ &nbsp; Dataset Lab</a><a>⚙ &nbsp; Experiment Studio</a><a>▥ &nbsp; Results Explorer</a><a>◷ &nbsp; Experiment History</a><a>ⓘ &nbsp; Model Information</a></nav>
      <div className="sidefoot">ACADEMIC PROJECT<br/><b>FPMC · Next-item recommendation</b></div>
    </aside>
    <main><header><div><span className="eyebrow">RESEARCH WORKSPACE</span><h1>Overview</h1><p>Factorized Personalized Markov Chains for sequential recommendation.</p></div><div className="status"><i/> {health}</div></header>
      <section className="stats"><article><label>MODEL</label><strong>FPMC</strong><small>Sequential recommendation</small></article><article><label>DATASET ROWS</label><strong>{dataset?.sequence_rows??'—'}</strong><small>Interaction sequences</small></article><article><label>UNIQUE USERS</label><strong>{dataset?.unique_users_in_sequences??'—'}</strong><small>In supplied dataset</small></article><article><label>UNIQUE ITEMS</label><strong>{dataset?.unique_items_in_sequences??'—'}</strong><small>In supplied dataset</small></article></section>
      <section className="panel"><div className="panelhead"><div><span className="eyebrow">EXPERIMENT STUDIO</span><h2>Run an FPMC experiment</h2><p>Train the original research implementation on the included dataset.</p></div><span className="tag">PYTHON / NUMBA</span></div>
      <div className="formgrid">
        <label>Epochs<input name="epochs" type="number" min="1" max="100" value={form.epochs} onChange={change}/></label>
        <label>Embedding dimension<input name="embedding_dim" type="number" min="2" max="256" value={form.embedding_dim} onChange={change}/></label>
        <label>Learning rate<input name="learning_rate" type="number" step="0.001" value={form.learning_rate} onChange={change}/></label>
        <label>Regularization<input name="regularization" type="number" step="0.0001" value={form.regularization} onChange={change}/></label>
        <label>Negative samples<input name="negative_samples" type="number" min="1" max="100" value={form.negative_samples} onChange={change}/></label>
      </div><button onClick={run} disabled={busy}>{busy?'Running experiment…':'▶  Run experiment'}</button>
      {error&&<div className="error">{error}</div>}
      {result&&<div className="result"><span className="eyebrow">EXPERIMENT COMPLETED</span><div className="metrics"><div><small>ACCURACY</small><b>{(result.accuracy*100).toFixed(2)}%</b></div><div><small>MEAN RECIPROCAL RANK</small><b>{result.mrr.toFixed(4)}</b></div><div><small>EXECUTION BACKEND</small><b>{result.backend}</b></div></div><details><summary>View execution output</summary><pre>{result.raw_output}</pre></details></div>}
      </section>
      <section className="note"><b>Model note</b><p>This implementation predicts one next item from a user's preceding basket/interaction sequence. It does not generate a complete multi-item next basket.</p></section>
      <footer>FPMC Research Studio · Academic implementation · Based on Rendle et al. (WWW 2010)</footer>
    </main>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);

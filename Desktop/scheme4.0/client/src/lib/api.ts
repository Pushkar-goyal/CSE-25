export const API='http://localhost:5000/api';
export async function analyze(text:string,type='MESSAGE',sender='Unknown'){const r=await fetch(`${API}/analyze`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,type,sender})});return r.json()}
export async function contextRisk(transcript:string){const r=await fetch(`${API}/context-risk`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({transcript})});return r.json()}
export async function history(){const r=await fetch(`${API}/history`);return r.json()}

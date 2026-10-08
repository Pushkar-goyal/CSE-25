import express from 'express';
import cors from 'cors';
const app=express(); app.use(cors()); app.use(express.json());
const history=[];
function analyze(text=''){
 const t=text.toLowerCase(); const rules=[
  ['OTP / verification request',/(otp|one[- ]time password|verification code|cvv|pin|password)/,28],
  ['Urgency or pressure',/(urgent|immediately|right now|within \d+ minutes|hurry|blocked today)/,18],
  ['Payment / transfer request',/(upi|transfer|pay|payment|send money|bank account|refund fee)/,25],
  ['Threat or account suspension',/(account.*(block|suspend|close)|police|legal action|arrest)/,22],
  ['Impersonation language',/(bank|police|government|income tax|courier|support|customer care)/,12],
  ['Suspicious link',/(https?:\/\/|bit\.ly|tinyurl|\.xyz|\.top|\.click)/,22],
  ['Remote access request',/(anydesk|teamviewer|remote access|screen share|install this app)/,25],
  ['Secrecy pressure',/(don't tell|do not tell|keep this secret|secret)/,14]
 ];
 let score=0, indicators=[]; for(const [name,re,weight] of rules) if(re.test(t)){score+=weight; indicators.push(name)}
 score=Math.min(100,score); const level=score>=75?'CRITICAL':score>=50?'HIGH':score>=25?'MEDIUM':'LOW';
 return {riskScore:score,riskLevel:level,indicators,recommendations:level==='LOW'?['Stay alert and verify unexpected requests.']:['Do not share OTP, PIN, password or financial details.','Verify the person or organization through an independently obtained official channel.','Do not open suspicious links or install remote-access software.']};
}
app.get('/api/health',(req,res)=>res.json({ok:true,name:'SCAM SHIELD AI 4.0'}));
app.post('/api/analyze',(req,res)=>{const result=analyze(req.body.text); const item={id:Date.now().toString(),type:req.body.type||'MESSAGE',sender:req.body.sender||'Unknown',text:req.body.text||'',...result,createdAt:new Date().toISOString()}; history.unshift(item); res.json(item)});
app.post('/api/context-risk',(req,res)=>res.json(analyze(req.body.transcript||'')));
app.get('/api/history',(req,res)=>res.json(history));
app.listen(5000,()=>console.log('SCAM SHIELD AI API running on http://localhost:5000'));

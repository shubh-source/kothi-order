const {Pool}=require('pg'); 
const p=new Pool({connectionString:'postgresql://postgres:katiyar0109@localhost:5432/rajasthani'}); 
p.query("SELECT wallet_balance FROM users WHERE phone='9305052372'").then(r=>{console.log(r.rows); p.end()});

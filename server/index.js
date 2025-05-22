const express =require('express');
const app =express();
const PORT =5000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is running');
});


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});
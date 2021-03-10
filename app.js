const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const app = express();
const user = require('./models/user');
const crop = require('./models/crop')
const cart = require('./models/cart')
const blog = require('./models/blog')
const scheme = require('./models/scheme')
const farm = require('./models/farm')
const farm_type = require('./models/farm_type')
const comment = require('./models/comment')
const history = require('./models/history')
const message = require('./models/message');
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./config/keys')
var http = require('http');
const requireToken = require('./middleware/requireToken')

// Database
const db = require('./config/database');
app.use(bodyParser.json())
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))
 


// Index route
app.get('/',requireToken,(req,res)=>{
  res.send({fname:req.us.fname,lname:req.us.lname,id:req.us.id,phone:req.us.phone,
    type:req.us.type,username:req.us.username,email:req.us.email})
})


// app.get('/allsites',async (req,res)=>{
//     // const {cname} = req.body
//     // if(!use){
//     //   return res.status(422).send({error :"must provide username or password2"})
//     // }
//     try{
//       const use = await site_masters.findAll()
//       res.send(use)
//       console.log(use)
//     }catch(err){
//         return res.send(err)
//     }
// })


app.get('/allblogs', (req, res) => 
  blog.findAll()
    .then(user => res.send(user))
    .catch(err => console.log(err)));

app.get('/allschemes', (req, res) => 
  scheme.findAll()
    .then(user => res.send(user))
    .catch(err => console.log(err)));

app.get('/allfarmtype', (req, res) => 
  farm_type.findAll()
    .then(user => res.send(user))
    .catch(err => console.log(err)));

app.get('/allfarms', (req, res) => 
  farm.findAll()
    .then(user => res.send(user))
    .catch(err => console.log(err)));

app.post('/signup',async (req, res) => {
        let { fname,lname,email,phone,username,password,type } = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
              // bcrypt.genSalt(10, function(err, salt) {
              //   bcrypt.hash(password, salt, async(err, hash)=> {
                    // Store hash in your password DB.
                    const use = new user({fname,lname,email,phone,username,password:hash,type});
                await  use.save();
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
            //     });
            // });
          
    
        }catch(err){
          return res.status(422).send(err.message)
        }
});

app.post('/signin',async (req,res)=>{
  const {username,password} = req.body
  console.log(username,password)
  if(!username || !password){
      return res.status(422).send({error :"must provide username or password"})
  }
  const use = await user.findOne({ where: { username } })
  // res.send(use)
  if(!use){
      return res.status(422).send({error :"must provide username or password2"})
  }
  try{
    console.log(use.hash)
    // await user.comparePassword(password);
    const validPass = await bcrypt.compare(password, use.password);
            if(validPass) {
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
              // res.status(200).json('Valid Email and pass!');
            } else {
                res.status(400).json('Wrong password!');
            }    
    
  }catch(err){
      return res.status(422).send({error :"must provide username or password3"})
  }
})


app.post('/addcrop', async (req, res) => {
  let { user_id, date, crop_name, type, price, name, mobile, email, image } = req.body;
  try{
    const con = new crop({ user_id, date, crop_name, price, type, name, mobile, email, image });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
});


app.post('/addcart', async (req, res) => {
  let { user_id , date, crop_name, price, quantity, image } = req.body;
  try{
    const con = new cart({ user_id, date, crop_name, price, quantity, image });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/addblog', async (req, res) => {
  let { date , name, title, description } = req.body;
  
    const con = new blog({ date , name, title, description });
    await  con.save()
    .then((data)=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
  })
}); 


app.post('/addcomment', async (req, res) => {
  let { blog_id , name, date, comments} = req.body;
  try{
    const con = new comment({ blog_id , name, date, comments});
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/addhistory', async (req, res) => {
  let { user_id , date	, product_list, amount, razorpay_paymentid } = req.body;
  try{
    const con = new history({ user_id , date	, product_list, amount, razorpay_paymentid });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/addmessage', async (req, res) => {
  let { user_id , another_id, messages } = req.body;
  try{
    const con = new message({ user_id , another_id, messages });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/allcrops',async (req,res)=>{
    const {type} = req.body
    // const use=[];
    console.log(type)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await crop.findAll({ where: { type:type } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


app.post('/allcarts',async (req,res)=>{
    const {user_id} = req.body
    // const use=[];
    console.log(user_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await cart.findAll({ where: { user_id:user_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


app.post('/allhistory',async (req,res)=>{
    const {user_id} = req.body
    // const use=[];
    // console.log(user_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await history.findAll({ where: { user_id:user_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


app.post('/farmsname',async (req,res)=>{
    const {type} = req.body
    // const use=[];
    console.log(type)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await farm.findAll({ where: { type:type } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


app.post('/farmsimage',async (req,res)=>{
    const {name} = req.body
    // const use=[];
    console.log(name)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await farm.findAll({ where: { name:name } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


app.post('/allcomments',async (req,res)=>{
    const {blog_id} = req.body
    // const use=[];
    console.log(blog_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide userblog_id or password2"})
      // }
      try{
        const use = await comment.findAll({ where: { blog_id:blog_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })

app.delete('/removeitem', async (req, res, next) => {
    let book = await cart.findOne({where: {id: req.body.id}}).catch(e => {
       console.log(e.message)
    })
    if (!book){
      console.log("err");
    }
    book.destroy();
    res.send("Success");
  });

app.delete('/deleteitems', async (req, res, next) => {
  // console.log(req.body.id)
  try{
    for ( var i = 0; i < req.body.id.length; i++){
    const use = await cart.destroy({ where: { id: [req.body.id[i]] } })
    }
    // use.push(one)
    res.send("Success")
    // console.log(use)
    // return use
  }catch(err){
    return res.send(err)
}
  });


  app.post('/messagesu',async (req,res)=>{
    const {user_id,another_id} = req.body
    // const use=[];
    // console.log(blog_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide userblog_id or password2"})
      // }
      try{
        const use = await message.findAll({ where: { user_id:user_id , another_id:another_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })


  app.post('/messagesa',async (req,res)=>{
    const {user_id,another_id} = req.body
    // const use=[];
    // console.log(blog_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide userblog_id or password2"})
      // }
      try{
        const use = await message.findAll({ where: { user_id:user_id , another_id:another_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.send(err)
    }
    // res.send(use)
  })

// const port = process.env.PORT;

app.listen(process.env.PORT || 3000, console.log(`Server started on port ${process.env.PORT || 3000}`));
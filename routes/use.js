/* 
* @Author: zpf
* @Date:   2018-01-09 10:45:49
* @Last Modified by:   Busy
* @Last Modified time: 2018-01-09 13:58:36
*/


const express=require("express");
const mysql=require("mysql");
const formidable=require("formidable")
const fs=require("fs")
const router=express.Router();
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"login",
    port:"3307"

})
var fname="";
router.use('/add',function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir =  './public';

    form.parse(req,function(err,fileds,files){
        for(let i in files){
            let file = files[i];
            fname = (new Date()).getTime();
            switch(file.type){
                case 'image/jpeg':
                    fname = fname + '.jpg';
                    break;
                case 'image/png':
                    fname = fname + '.png';
                    break;
                case 'image/gif':
                    fname = fname + '.gif';
                    break;
            }
            let newPath = 'public/'+fname;
            fs.renameSync(file.path,newPath);
            pool.query(`INSERT INTO carousel (img) VALUES("${fname}") `,function(err,rows){
                if(err) throw err;
                if(rows){
                     pool.query(`SELECT * FROM  carousel`,function(err,rows){
                        if(err) throw err;
                        res.send(rows)
                    })
                }
            })

        }
    })
})
router.use("/sel",function(req,res){
    pool.query(`SELECT * FROM  carousel`,function(err,rows){
        if(err) throw err;
        res.send(rows)
    })
})
 
router.use("/delete",function(req,res){
    pool.query(`DELETE FROM carousel WHERE id = ${req.body.id}`,function(err,rows){
        if(err) throw err;
        res.send(rows)
    })
})
module.exports = router;















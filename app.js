/* 
* @Author: zpf
* @Date:   2018-01-09 10:45:33
* @Last Modified by:   Busy
* @Last Modified time: 2018-01-09 11:24:18
*/

const express=require("express");
const app = express();
const bodyParser=require("body-Parser");
const static=require("express-static");
app.listen(3000);
const use=require("./routes/use")
app.use(bodyParser.urlencoded({}));

app.use("/use",use);
app.use(static('./public'));









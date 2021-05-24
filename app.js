
// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();
var fs = require('fs');
// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());


// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(3002);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '127.0.0.1',
	user : 'root',
	password : '',
	database : 'casino2'
});

connection.connect(function(err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});
function render(filename, params) {
	var data = fs.readFileSync(filename, 'utf8');
	for (var key in params) {
	  data = data.replace('{' + key + '}', params[key]);
	}
	return data;
  }
// 依 HTTP 的 Method (POST/GET/PUT/DELETE) 進行增查修刪

app.get("/game/user", function (request, response) {

	connection.query('select * from users', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			
			response.send(JSON.stringify(rows));
		}
	);
    
})
app.get("/game/results", function (request, response) {

	connection.query('select * from results', 
		[],
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			
			response.send(JSON.stringify(rows));
		}
	);
    
})

app.post("/game/addresults", function (request, response) {

	connection.query(
		"insert into results set betTime = ?,account='steven',gameType='拉霸',object='All',bets=?,moneyBefore=?,status=?,result=?,moneyAfter=? ", 
			[
				request.body.betTime, 
				request.body.bets,
				request.body.moneyBefore,
				request.body.status,
				request.body.result,
				request.body.moneyAfter

			]);
			// console.log(request)
	response.send("row inserted.");
    
})

app.get('/game/getresults', function (req, res) {
	res.send(render('./public/results.html'));
  })

app.put("/game/user", function (request, response) {

	connection.query(
		"update users set UserWallet = ? where UserId =1 " ,
		    
			[
				request.body.UserWallet 
				
			]);
	response.send("row updated.");
    
})


//獲取分頁資料
app.get('/:page([0-9]+)', function(req, res){
    var page = req.params.page
    //把<=0的id強制改成1
    if(page <= 0 ) {
        res.redirect('/1')
        return
    }
    //每頁資料數
    var nums_per_page = 10
    //定義資料偏移量
    var offset = (page - 1) * nums_per_page

    db.exec(`SELECT * FROM inventory LIMIT ${offset}, ${nums_per_page};`, [], function(data, fields) {
        db.exec(`SELECT COUNT(*) AS COUNT FROM inventory`, [], function(nums, fields) {
            var last_page = Math.ceil(nums[0].COUNT / nums_per_page)

            //避免請求超過最大頁數
            if(page > last_page) {
                res.redirect('/'+last_page)
                return
            }

            res.render('index',{
                data: data,
                curr_page: page,
                //本頁資料數量
                total_nums: nums[0].COUNT,
                //總數除以每頁筆數，再無條件取整數
                last_page: last_page
            })
        })
    })
})


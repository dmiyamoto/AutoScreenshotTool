<h2 align="center">AutoScreenshotTool</h2>

## ■Node.js version  
v10.16.0

## ■Build Setup

``` directory
# Set your own csv file  
input/your-own-csv-file.csv

# csv layout sample  
"url","ページ名","ログイン有無"  
"https://tsukulink.net","TOPページ","","",""  
"https://tsukulink.net/constructions","工事案件検索ページ","","",""  
"https://tsukulink.net/companies/sign_in","loginページ","","",""  
"https://tsukulink.net/companies/sign_in","login後Myページ","有","admin_user","password"  
"https://tsukulink.net/constructions/pre_new","工事案件登録方法の選択ページ","有","view_only_user","password"  
```

``` bash
# Install dependencies
$ npm install

# Create new .env file
$ touch .env

# Set .env
$ vi .env

## Sample for the content of .env
CSV_FILE_NAME=url  
LOGIN_PAGE=https://yahoo.co.jp  
ACCOUNT=input[name="log"]   
PASSWORD=input[name="pwd"]  
LOGIN_BTN=.login-form__btns-item  

# Launch auto screenshot-tool
$ npm run start
```

## ■Screenshot files destination
output/

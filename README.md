<h2 align="center">AutoScreenshotTool</h2>

## ■Node.js version

v10.16.0

## ■Build Setup

```directory
# Set your own csv file
input/your-own-csv-file.csv

# csv layout sample
"デバイス種類","url","ページ名","ログイン有無","ログインアカウント名","ログインパスワード","ログインページ","アカウント入力欄style","パスワード入力欄style","ログインボタンstyle"
"pc","https://.tsukulink.net","TOPページ","","","","","","",""
"pc","https://.tsukulink.net/contacts","お問い合わせフォームページ","","","","","","",""
"pc","https://.tsukulink.net/violation_reports","トラブル通報ページ","","","","","","",""
"sp","https://.tsukulink.net","TOPページ","","","","","","",""
"sp","https://.tsukulink.net/contacts","お問い合わせフォームページ","","","","","","",""
"sp","https://.tsukulink.net/violation_reports","トラブル通報ページ","","","","","","",""
"sp","https://.tsukulink.net/lp/premium_entries","プレミアムサービス案内ページ","","","","","","",""
"sp","https://.tsukulink.net/dummy","404ページ","","","","","","",""
```

```bash
# Install dependencies
$ npm install

# Create new .env file
$ touch .env

# Set .env
$ vi .env

## Sample for the content of .env
CSV_FILE_NAME=url

# Launch auto screenshot-tool
$ npm run start
```

## ■Screenshot files destination

output/

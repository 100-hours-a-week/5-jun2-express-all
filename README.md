# 5-jun2-park-midnight-food-plz

## 1️⃣ 패키지 구조
### 1) BE
```text
📦back-server
 ┣ 📂controllers
 ┃ ┣ 📜boardController.js
 ┃ ┗ 📜userController.js
 ┣ 📂models
 ┃ ┣ 📜boardRepository.js
 ┃ ┗ 📜userRepository.js
 ┣ 📂routes
 ┃ ┣ 📜boardRouter.js
 ┃ ┣ 📜imageRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂uploads
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
 ```

 ### 2) FE
 ```text
 📦front-server
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜board-detail.css
 ┃ ┃ ┣ 📜board-list.css
 ┃ ┃ ┣ 📜board-modify.css
 ┃ ┃ ┣ 📜board-write.css
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜login.css
 ┃ ┃ ┣ 📜password-modify.css
 ┃ ┃ ┣ 📜signup.css
 ┃ ┃ ┗ 📜user-modify.css
 ┃ ┣ 📂html
 ┃ ┃ ┣ 📜board-detail.html
 ┃ ┃ ┣ 📜board-list.html
 ┃ ┃ ┣ 📜board-modify.html
 ┃ ┃ ┣ 📜board-write.html
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜login.html
 ┃ ┃ ┣ 📜password-modify.html
 ┃ ┃ ┣ 📜signup.html
 ┃ ┃ ┗ 📜user-modify.html
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📜board-detail.js
 ┃ ┃ ┣ 📜board-list.js
 ┃ ┃ ┣ 📜board-modify.js
 ┃ ┃ ┣ 📜board-write.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┣ 📜password-modify.js
 ┃ ┃ ┣ 📜signup.js
 ┃ ┃ ┗ 📜user-modify.js
 ┃ ┣ 📂resource
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜board-data.json
 ┃ ┃ ┃ ┣ 📜boards-data.json
 ┃ ┃ ┃ ┗ 📜user-data.json
 ┃ ┃ ┣ 📂font
 ┃ ┃ ┃ ┗ 📜sagak.ttf
 ┃ ┃ ┣ 📂image
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json

## 06-001
使用SpringSecurity + Angular UI 來呈現 csrf + cors
1. `package.json`: 就像是後端專案中的`pom.xml`，定義了所有UI中會用到的依賴
2. `npm install`: 只需要在angular專案設定一開始執行一次，目的是下載所有依賴檔，並存在本專案路徑下的`node_modules`資料夾
3. 如果先前有裝angularcli的話可略過 `npm install -g @angular/cli`
4. 執行 `ng serve` 指令，專案預設會在 `http://localhost:4200/` 啟動

## 06-002
1. components：裡面有多個不同功能的組件，每個組件下有四個檔案
    - `xxx.component.spec.ts`: 寫測試的檔案
    - `xxx.component.html`: 含有angular syntax的html
    - `xxx.component.css`: 樣式
    - `xxx.component.ts`: 商業邏輯
2. model: 如同 simple POJO，定義欄位與建構子，用來與前端溝通
    - `xxx.model.ts`
3. services: 
    - 與後端伺服器溝通的程式碼放在這個套件內
    - TypeScript在編譯期間會被轉換成JavaScript
    - `login.service.ts`: 
        - 其中的後端rooturl放在`environment.ts`檔案裡
        - 另外，endpointurl放在`app.constants.ts`裡面
    - `dashboard.service.ts`:
        - 發送api requests的地方
            - balance api
            - loans api
            - cards api
            - notices api
            - contact api
        - `withCredentials: true` 有列此的話，表示傳送api請求時要帶cookies
        - `observe: 'response'` we want not only the header, not only the body, but the entire response
4. `app-routing.module.ts`
    - define the parts with components
    - `canActivate` 用來規定哪些組件需要登入才能存取
5. `login.component.ts`
    - `validateUser()` 其中有一個`subscribe()`這是Angular的函式之一，用來作非同步溝通
6. `header.component.html`
    ```html
    <li *ngIf="user.authStatus!='AUTH'" routerLinkActive="active"><a routerLink="/notices">Notices</a></li>
    <li *ngIf="user.authStatus=='AUTH'" routerLinkActive="active"><a routerLink="/dashboard">Dashboard</a></li>
    ```
    - `*ngIf`是否Angular語法中的if-condition
    - 如果authStatus為Auth，就顯示 dashboard 與 logout，若不為Auth則顯示notices與其他連結
7. `app.request.interceptor.ts` 用來攔截送到後端的請求
    - 從 sessionStorage 取得 userdetails
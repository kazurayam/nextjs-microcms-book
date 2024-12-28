# お問い合わせページを作ってみよう --- formrunで

## 解決すべき問題

翔泳社刊『https://www.shoeisha.co.jp/book/detail/9784798183664\[Next.js＋ヘッドレスCMSではじめる！かんたんモダンWebサイト制作入門\] 』を読んだ。

![L](https://www.seshop.com/static/images/product/26285/L.png)

第９章「お問い合わせページを作ってみよう」はReactとNext.jsで作ったアプリを CRMツール [HubSpot](https://www.hubspot.jp/) のフォーム作成管理機能と連携させる方法を紹介している。しかし私はHubSpotが自分の手に余ると感じた。

もっと軽い別のサービスを試したいと思った。ググったらmicroCMS社の松田承一さんの記事 [『microCMSを使ったサイトでお問い合わせ機能を用意する方法』](https://blog.microcms.io/how-to-impl-inquiry-form/) を見つけたので読んだ。そこでひとつの候補として フォーム作成ツール [formrun](https://form.run/home) があげられていた。やってみよう。

React＋Next.jsのWebアプリの中にformrunで作成したwebフォームを埋め込みたいが、どうすればいいのか？

## 解決方法

formrun社による説明を読んだ。

-   [iframeで埋め込む](https://faq.form.run/faq/share-forms#block-0221693739ff4d398c20782d4b688e23)

formrunはひとつひとつのフォームに固有のURLを割り当てる。URLの形式はこうだ。

    https://form.run/@XXXXXXX-XXXXXXX-XXXXXXXXXXXXXXXXXXXX

以下の説明において、XXXXXXXの部分はあなたのフォームに割り当てられた具体的な文字列に置き換えてください。

formrunの説明には、わたしのWebサイトページのHTMLの中に次のような断片を埋め込めばいい、と書いてあった。

    <script src="https://sdk.form.run/js/v2/embed.js"></script>
    <div
      class="formrun-embed"
      data-formrun-form="@XXXXXXX-XXXXXXX-XXXXXXXXXXXXXXXXXXXX"
      data-formrun-redirect="false">
    </div>

このHTML断片が何を意図しているのか？ `<script src="https://sdk.form.run/js/v2/embed.js">` が実行されれば `` embed.js` `` が動いて 直後の `<div>` 要素の中に `<iframe>` 要素を挿入するだろう。 その `<iframe>` はformrunが提供するwebフォームのURLを参照するので、結果的にwebページの中にwebフォームが埋め込まれて表示されるだろう。

わたしはこの説明を素朴に受けとめた。ContactFormコンポーネントのTypeScriptの中に上記のHTML断片をJSX構文で記述した。しかしこのベタなやり方は通用しなかった。なぜか？

WebページのHTMLソースに書かれた `<script>` タグはReactによる制御の外側（**step outside of React**）にある。Reactで構築された「お問い合わせページ」がブラウザの上で表示されたとしても `<script>` は実行されない。`<script>` 要素のsrc属性が指すJavaScriptコードはダウンロードすらされない。これではダメだ。

では、どうすればいい？

お問い合わせ画面を実装するReactコンポーネントが描画されたタイミングでReactのフックを起動しよう。副作用フック `useEffect` 関数を使え。ブラウザ上でお問い合わせページのコンポーネントが開かれたタイミングを [`useEffect`](https://react.dev/reference/react/useEffect)関数で捉えてカスタムfunctionを起動しよう。カスタムfunctionが DOM APIを使って `<iframe>` を動的に挿入すればいい。

## 説明

### formrunでフォームを作れ

[formrun](https://form.run/home) にあなたのアカウントを作ろう。ひとつ、問い合わせフォームを作成しよう。formrunとは何か、どう操作するのか、といった説明はここではしない。彼らの説明を読んで従えばいい。サンプルのテンプレートを選んでボタンを数回クリックすればマジで数分でフォームを作ることができる。

ちなみにformrunはひとつひとつのフォームに固有のURLを割り当てる。形式はこんな感じ:

`` https://form.run/@kazuXXX-XXXXXXX-XXXXXXXXXXXXXXXXXXXX` ``

ここでXXXの部分はあなたのフォームに割り当てられた具体的な文字列に置き換えてください。

このURLのパス部分つまり `https://form.run/` に続く `@` を含む文字列を後ほど「問い合わせ」ページのHTMLの中に埋め込むことによって、あなたのサイトとformrunを連携させることができます。

### 環境変数を定義せよ

プロジェクトのディレクトリに（すなわち `app` ディレクトリの隣に） `` .env.local ファイルを作れ。 `.env.local ファイルの中で環境変数 `NEXT_PUBLIC_FORMRUN_FORM_URL_PATH `` を定義せよ。

    NEXT_PUBLIC_FORMRUN_FORM_URL_PATH=@kazuXXXXXXXXX-XXXXXXXXXXXXXXXXXXX

この環境変数の値として formrunが生成したあなたのフォームのURLのパス文字列を設定します。

ひとつ注意点がある。この環境変数の名前を `NEXT_PUBLIC_` で始まるものにしなければならない。サーバー上に定義された環境変数をブラウザ上で動くJavaScriptが参照できるようにするためだ。名前を詳しくはNext.jsのドキュメントを参照のこと。

-   [Next.js | Bundling Environment Variables for the Browser](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser)

### ContactFormコンポーネントを書き直す

『https://www.shoeisha.co.jp/book/detail/9784798183664\[Next.js＋ヘッドレスCMSではじめる！かんたんモダンWebサイト制作入門\] 』の第９章に掲載されたContactFormコンポーネントを書き直した。

ContactFormコンポーネントが描画されたとき `useEffect` 関数を利用してHTMLのDOMを動的に書き換えて `<iframe>` を挿入するようにした。

-   [app/\_components/ContactForm/index.tsx](https://github.com/kazurayam/nextjs-microcms-book/blob/issue4/my-next-project/app/_components/ContactForm/index.tsx)

<!-- -->

    .form {
      max-width: 600px;
      margin: 0 auto;
    }

このコードについて留意点を述べる。

-   このコードはサーバ上ではなくブラウザ上で実行されなければならない。だから冒頭に `"use client"` を書いている。

-   フォームのURLのPath部分を環境変数から読み込んでいる。`<iframe src="…​.">` が参照するURLを組み立てるために。

-   ReactがContactFormコンポーネントを1回だけcallするとは限らない。わたしの環境では常に2回callしている。どうして2回callするのか、理由をわたしは知らない。理由はともかく、2回目以降のcallで `<iframe>` を挿入するのを避けるように `if` 文で制御している。

### サーバーを起動せよ

いつものように

    $ cd プロジェクトのディレクトリ
    $ npm run dev

とやろう。

### ブラウザでサイトを見る

ブラウザで

-   <http://localhost:3000/contact>

を開け。すると下記のような画面が表示されるはず。

<figure>
<img src="https://kazurayam.github.io/nextjs-microcms-book/images/contact-view.png" alt="contact view" />
</figure>

ここに表示されているフォームはformrunによって作成されたものだ。

F12キーでDeveloper Toolを開き、DOMツールを眺めてみよう。

<figure>
<img src="https://kazurayam.github.io/nextjs-microcms-book/images/contact-DOM.png" alt="contact DOM" />
</figure>

確かに `<iframe>` 要素が挿入されていて、iframeのsrc属性がformrunによって公開されたURLを指していることを確認することができた。
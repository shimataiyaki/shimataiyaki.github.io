---
layout: default
title: プライバシーポリシー | e-colleague
description: e-colleague プライバシーポリシー。収集する情報、利用目的、データ保護、ユーザーの権利について定めています。
og_title: プライバシーポリシー | e-colleague
og_image: /images/favicon.ico
css: /assets/css/document.css
product_nav: true
---

<nav class="product-nav">
    <div class="product-nav-container">
        <div class="product-logo"><a href="{{ '/e-colleague/' | relative_url }}" style="text-decoration:none;color:inherit;">e-colleague | documentation</a></div>
        <div class="product-links">
            <a href="{{ '/e-colleague/' | relative_url }}" class="btn-cta">LPへ戻る</a>
        </div>
    </div>
</nav>

<div class="layout-wrapper">
<main class="main-content">

<section class="section-ec">

<nav class="breadcrumb">
    <a href="{{ '/e-colleague/' | relative_url }}">e-colleague</a>
    <span>›</span>
    <span>プライバシーポリシー</span>
</nav>

<p class="doc-meta">最終更新日: 2026年5月24日</p>

# e-colleague プライバシーポリシー

## 第1条 定義

本ポリシーにおいて、以下の用語は次の意味を有します。

| 用語 | 定義 |
|------|------|
| **個人情報** | 生存する個人に関する情報であって、氏名、連絡先その他の記述により特定の個人を識別できるもの（他の情報と容易に照合でき、それにより特定の個人を識別できるものを含む） |
| **利用者情報** | 本サービスが収集するLINEユーザーID、表示名、グループID、発言内容、タスク情報その他の情報 |
| **暗号化データ** | AES-256により暗号化され、復号鍵なしでは内容を判読できない状態のデータ |
| **本ポリシー** | このe-colleagueプライバシーポリシー |

## 第2条 収集する情報

本サービスは、以下の情報を収集します。

| 情報 | 収集方法 | 保存形式 |
|------|----------|----------|
| LINEユーザーID | Webhookイベントから自動取得 | 平文（検索キーとして利用） |
| LINE表示名 | LINEプロフィールAPIから自動取得 | AES-256暗号化 |
| グループID | Webhookイベントから自動取得 | 平文（検索キーとして利用） |
| 発言内容 | ユーザーがLINEグループに送信したメッセージ | AES-256暗号化（Contextsシート） |
| タスク情報 | 発言から抽出されたタスク内容・担当者名・期限・ステータス | タスク内容・担当者名はAES-256暗号化 |

## 第3条 利用目的

収集した情報は、以下の目的でのみ利用します。

1. タスク抽出・管理機能の提供（本サービスの主要機能）
2. 担当者名の統一（LINE表示名を用いた名寄せ）
3. サービス改善のための統計分析（匿名化されたデータのみを使用）
4. 本サービスに関する重要な通知の送信

## 第4条 データの保存・保護

1. タスク内容、担当者名、発言内容は、AES-256により暗号化された状態でGoogleスプレッドシートに保存されます。
2. 暗号化キーはGoogle Apps Scriptのスクリプトプロパティに安全に保管され、コード内にハードコードされていません。
3. 補完モード中の一時データ（PendingTasksシート）は、保存から30分経過後に自動的に削除されます。
4. 会話コンテキスト（Contextsシート）は、タスク化が完了した時点で論理削除（IsProcessedフラグ）されます。
5. 本サービスは、Google AI Studioを通じてGemini APIを利用しています。APIに送信されるデータは、モデルの学習に利用されない設定となっています。

## 第5条 データの第三者提供

1. 本サービスは、収集した情報を第三者に販売、共有、貸与することはありません。
2. グループ管理者は、管理者ポータルを通じて、自身が管理するグループのタスク情報およびメンバー情報（表示名）を閲覧できます。これは本サービスの機能の一部であり、第三者提供にはあたりません。
3. 法令に基づく開示請求があった場合、必要最小限の範囲で情報を開示することがあります。

## 第6条 データの保持期間

| データ種別 | 保持期間 |
|------------|----------|
| タスクデータ | ユーザーまたはグループ管理者が削除するまで |
| コンテキストデータ | 処理済みフラグ設定後は通常の使用では参照不可 |
| PendingTasks（補完中データ） | 保存から30分経過後に自動削除 |
| Profiles（プロフィール） | ユーザーまたはグループ管理者が削除するまで |

## 第7条 ユーザーの権利

ユーザーは、以下の権利を有します。

1. 自身のデータの内容確認（管理者ポータルから確認可能）
2. 自身のデータの削除要求（開発者に連絡することにより対応）
3. 本サービスの利用を中止し、グループから退出すること

## 第8条 Cookie・トラッキング

1. 本サービスの管理者ポータルは、Cookieを使用しません。
2. 本サービスは、Google Analyticsその他のアクセス解析ツールを使用しません。

## 第9条 本ポリシーの改定

1. 本ポリシーの内容は、事前の通知なく改定されることがあります。
2. 改定後のポリシーは、プロジェクトサイト上に掲載された時点で効力を生じます。
3. 重要な改定がある場合は、LINEグループ内で告知します。

## 第10条 お問い合わせ

本ポリシーに関するお問い合わせは、以下の連絡先までお願いします。

- **開発者**: Shimataiyaki
- **プロジェクトサイト**: [https://shimataiyaki.github.io/e-colleague/](https://shimataiyaki.github.io/e-colleague/)

</section>

<footer class="main-footer-ec">
    <div class="footer-links">
        <a href="{{ '/e-colleague/' | relative_url }}">LPへ戻る</a>
    </div>
    <div class="footer-bottom">
        <p>© 2026 Shimataiyaki. All rights reserved.</p>
        <div class="sns-links-ec">
            <a href="https://x.com/shimataiyaki" target="_blank">X</a>|
            <a href="https://instagram.com/shimataiyaki" target="_blank">Instagram</a>|
            <a href="https://note.com/shimataiyaki" target="_blank">note</a>
        </div>
    </div>
</footer>

</main>
</div>

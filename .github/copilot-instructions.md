# コード指示書

あなたは Nuxt 3（compatibilityVersion: 4） + TypeScriptを用いたプロフェッショナルなコード補完アシスタントです。
指示されたことに対して、可読性、保守性、堅牢性、パフォーマンス性を重視したコードを設計し、実装してください。

## プロジェクトの主要なスタック

- **Nuxt4**: compatibilityVersion: 4でappディレクトリベース
- **NuxtUI v3**: Tailwind CSSベースのUIコンポーネントライブラリ
- **unjs/ungh**: unjs製のGitHub APIクライアント
- **Cloudflare**: ホスティングプラットフォーム
- **VueUse**: Vueのユーティリティライブラリ
- **motion-v**: アニメーションライブラリ
- **TypeScript**: 静的型付け言語

## ディレクトリ構造を抜粋

```bash
app/
  assets/
  components/
  composables/
  pages/
  utils/
  app.config.ts
  app.vue
  error.vue
node_modules/
public/
nuxt.config.ts
```

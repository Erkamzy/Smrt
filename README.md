This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Өгөгдлийн сан (Supabase) тохируулах

1. [supabase.com](https://supabase.com) дээр шинэ төсөл үүсгэнэ.
2. **SQL Editor** → `supabase/schema.sql` файлын агуулгыг бүтнээр нь хуулж **Run** дарна.
   Энэ нь `news`, `contact_messages` хүснэгт, `news-images` зургийн bucket, жишээ мэдээг үүсгэнэ.
3. `.env.example`-ийг `.env.local` болгон хуулж, **Project Settings → API Keys** хэсгээс утгуудыг бөглөнө:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...
   ADMIN_PASSWORD=8-аас-дээш-тэмдэгт
   ```

4. `npm run dev`-ийг дахин асаана.

Deploy хийхдээ (Vercel г.м.) эдгээр 3 хувьсагчийг Environment Variables-д нэмнэ.

### Боломжууд

- **Холбоо барих форм** (нүүр хуудас) — хүсэлт `contact_messages` хүснэгтэд хадгалагдана.
- **Мэдээ** — компанийн өөрийн мэдээ (өгөгдлийн сангаас) болон mddic.gov.mn-ийн RSS мэдээ хамт харагдана.
- **Админ** — `/admin` хаягаар нэвтэрч хүсэлтүүдийг харах, мэдээ нэмэх / засах / нуух / устгах, зураг хуулах.

Supabase тохируулаагүй үед сайт статик жишээ мэдээгээр ажилласаар байна.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

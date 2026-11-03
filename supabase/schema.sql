-- Смарткарт сайтын өгөгдлийн сан
-- Supabase → SQL Editor дээр бүтнээр нь нэг удаа ажиллуулна.

-- ========== Мэдээ ==========
create table if not exists public.news (
  id           bigint generated always as identity primary key,
  category     text        not null default 'Мэдээ',
  title        text        not null,
  summary      text        not null default '',
  content      text[]      not null default '{}',
  image        text,
  published    boolean     not null default true,
  published_at date        not null default current_date,
  created_at   timestamptz not null default now()
);

create index if not exists news_published_idx on public.news (published, published_at desc);

-- ========== Холбоо барих хүсэлт ==========
create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  name       text        not null,
  email      text        not null,
  phone      text,
  company    text,
  message    text        not null,
  is_read    boolean     not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

-- RLS асаалттай, policy байхгүй → зөвхөн серверийн secret key хандана.
-- Browser-ийн publishable/anon key-ээр уншиж, бичих боломжгүй.
alter table public.news             enable row level security;
alter table public.contact_messages enable row level security;

-- ========== Мэдээний зураг (Storage) ==========
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

-- ========== Жишээ мэдээ ==========
insert into public.news (category, title, summary, content, image, published_at)
select * from (values
  ('Технологи',
   'Шинэ ухаалаг картын системийг нэвтрүүллээ',
   'Хэрэглэгчид одоо нэг картаар олон үйлчилгээ авах боломжтой боллоо.',
   array[
     'Хэрэглэгчид одоо нэг картаар олон үйлчилгээ авах боломжтой боллоо.',
     'Шинэ систем нь аюулгүй байдлыг дээшлүүлж, хэрэглэгчийн мэдээллийг найдвартай хамгаална.',
     'Дараагийн шатанд нэмэлт үйлчилгээнүүдийг холбох төлөвлөгөөтэй байна.'
   ],
   '/Smrt.jpg', date '2026-10-20'),
  ('Мэдээ',
   'Системийн шинэчлэлт амжилттай хийгдлээ',
   'Шинэчлэлтийн дараа хурд 2 дахин нэмэгдэж, алдаа мэдэгдэхүйц буурлаа.',
   array[
     'Шинэчлэлтийн дараа системийн хурд 2 дахин нэмэгдлээ.',
     'Мөн алдаа гарах тохиолдол мэдэгдэхүйц буурсан байна.'
   ],
   '/Smrt.jpg', date '2026-10-19'),
  ('Арга хэмжээ',
   'Хэрэглэгчдийн уулзалт болно',
   'Ирэх долоо хоногт хэрэглэгчидтэйгээ уулзаж санал хүсэлтийг сонсоно.',
   array[
     'Ирэх долоо хоногт хэрэглэгчидтэйгээ уулзаж санал хүсэлтийг сонсоно.',
     'Уулзалтын цаг, байршлыг удахгүй мэдэгдэнэ.'
   ],
   '/Smrt.jpg', date '2026-10-18')
) as seed(category, title, summary, content, image, published_at)
where not exists (select 1 from public.news);

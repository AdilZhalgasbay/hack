-- Создание таблицы для жалоб
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    category VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Настройка политик доступа (RLS - Row Level Security)
-- Для хакатона мы разрешаем чтение и запись всем (анонимным пользователям)
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Разрешить чтение всем" ON complaints
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Разрешить добавление всем" ON complaints
    FOR INSERT
    TO public
    WITH CHECK (true);

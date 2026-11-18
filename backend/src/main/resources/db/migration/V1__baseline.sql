CREATE TABLE users (
    id              BIGINT        GENERATED ALWAYS AS IDENTITY,
    name            VARCHAR(150)  NOT NULL,
    email           VARCHAR(255)  NOT NULL,
    phone           VARCHAR(16),
    password_hash   VARCHAR(255)  NOT NULL,
    active          BOOLEAN       NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_users PRIMARY KEY (id),

    CONSTRAINT ck_users_name_not_blank
        CHECK (LENGTH(TRIM(name)) > 0),

    CONSTRAINT ck_users_email_format
        CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

    CONSTRAINT ck_users_phone_e164
        CHECK (phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$')
);

CREATE UNIQUE INDEX uk_users_email ON users (LOWER(email));
IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230530095331_InitialCreate')
BEGIN
    CREATE TABLE [Users] (
        [User_id] int NOT NULL IDENTITY,
        [User_username] nvarchar(max) NOT NULL,
        [User_firstname] nvarchar(max) NULL,
        [User_lastname] nvarchar(max) NULL,
        [User_email] nvarchar(max) NULL,
        [User_mobile] nvarchar(max) NULL,
        [User_phone] nvarchar(max) NULL,
        [User_address] nvarchar(max) NULL,
        [User_password] nvarchar(max) NOT NULL,
        [User_cart_id] int NULL,
        [User_favorites_id] int NULL,
        [User_token] nvarchar(max) NULL,
        [User_password_salt] varbinary(max) NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([User_id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230530095331_InitialCreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230530095331_InitialCreate', N'7.0.5');
END;
GO

COMMIT;
GO


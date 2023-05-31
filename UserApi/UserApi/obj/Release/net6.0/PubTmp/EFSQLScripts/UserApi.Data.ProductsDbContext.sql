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

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230530095246_InitialCreate')
BEGIN
    CREATE TABLE [Products] (
        [Products_id] int NOT NULL IDENTITY,
        [Category_id_ref] nvarchar(max) NOT NULL,
        [Products_name] nvarchar(max) NOT NULL,
        [Products_price] int NOT NULL,
        [Products_desc] nvarchar(max) NOT NULL,
        [Products_cover] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([Products_id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230530095246_InitialCreate')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Category_id_ref', N'Products_name', N'Products_price', N'Products_desc', N'Products_cover') AND [object_id] = OBJECT_ID(N'[Products]'))
        SET IDENTITY_INSERT [Products] ON;
    EXEC(N'INSERT INTO [Products] ([Category_id_ref], [Products_name], [Products_price], [Products_desc], [Products_cover])
    VALUES (N''men'', N''Shirt'', 25, N''white/slim fit'', N''../../../assets/images/mens/men2'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Category_id_ref', N'Products_name', N'Products_price', N'Products_desc', N'Products_cover') AND [object_id] = OBJECT_ID(N'[Products]'))
        SET IDENTITY_INSERT [Products] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230530095246_InitialCreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230530095246_InitialCreate', N'7.0.5');
END;
GO

COMMIT;
GO


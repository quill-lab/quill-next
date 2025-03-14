-- CreateTable
CREATE TABLE `admin_permissions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `action` VARCHAR(255) NULL,
    `action_parameters` JSON NULL,
    `subject` VARCHAR(255) NULL,
    `properties` JSON NULL,
    `conditions` JSON NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `admin_permissions_created_by_id_fk`(`created_by_id`),
    INDEX `admin_permissions_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `admin_permissions_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_permissions_role_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `permission_id` INTEGER UNSIGNED NULL,
    `role_id` INTEGER UNSIGNED NULL,
    `permission_ord` DOUBLE NULL,

    INDEX `admin_permissions_role_lnk_fk`(`permission_id`),
    INDEX `admin_permissions_role_lnk_ifk`(`role_id`),
    INDEX `admin_permissions_role_lnk_oifk`(`permission_ord`),
    UNIQUE INDEX `admin_permissions_role_lnk_uq`(`permission_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `code` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `admin_roles_created_by_id_fk`(`created_by_id`),
    INDEX `admin_roles_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `admin_roles_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `reset_password_token` VARCHAR(255) NULL,
    `registration_token` VARCHAR(255) NULL,
    `is_active` BOOLEAN NULL,
    `blocked` BOOLEAN NULL,
    `prefered_language` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `admin_users_created_by_id_fk`(`created_by_id`),
    INDEX `admin_users_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `admin_users_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_users_roles_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NULL,
    `role_id` INTEGER UNSIGNED NULL,
    `role_ord` DOUBLE NULL,
    `user_ord` DOUBLE NULL,

    INDEX `admin_users_roles_lnk_fk`(`user_id`),
    INDEX `admin_users_roles_lnk_ifk`(`role_id`),
    INDEX `admin_users_roles_lnk_ofk`(`role_ord`),
    INDEX `admin_users_roles_lnk_oifk`(`user_ord`),
    UNIQUE INDEX `admin_users_roles_lnk_uq`(`user_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `content` LONGTEXT NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,
    `sub_title` VARCHAR(255) NULL,

    INDEX `articles_created_by_id_fk`(`created_by_id`),
    INDEX `articles_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `articles_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `alternative_text` VARCHAR(255) NULL,
    `caption` VARCHAR(255) NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `formats` JSON NULL,
    `hash` VARCHAR(255) NULL,
    `ext` VARCHAR(255) NULL,
    `mime` VARCHAR(255) NULL,
    `size` DECIMAL(10, 2) NULL,
    `url` VARCHAR(255) NULL,
    `preview_url` VARCHAR(255) NULL,
    `provider` VARCHAR(255) NULL,
    `provider_metadata` JSON NULL,
    `folder_path` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `files_created_by_id_fk`(`created_by_id`),
    INDEX `files_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `files_updated_by_id_fk`(`updated_by_id`),
    INDEX `upload_files_created_at_index`(`created_at`),
    INDEX `upload_files_ext_index`(`ext`),
    INDEX `upload_files_folder_path_index`(`folder_path`),
    INDEX `upload_files_name_index`(`name`),
    INDEX `upload_files_size_index`(`size`),
    INDEX `upload_files_updated_at_index`(`updated_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files_folder_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `file_id` INTEGER UNSIGNED NULL,
    `folder_id` INTEGER UNSIGNED NULL,
    `file_ord` DOUBLE NULL,

    INDEX `files_folder_lnk_fk`(`file_id`),
    INDEX `files_folder_lnk_ifk`(`folder_id`),
    INDEX `files_folder_lnk_oifk`(`file_ord`),
    UNIQUE INDEX `files_folder_lnk_uq`(`file_id`, `folder_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files_related_mph` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `file_id` INTEGER UNSIGNED NULL,
    `related_id` INTEGER UNSIGNED NULL,
    `related_type` VARCHAR(255) NULL,
    `field` VARCHAR(255) NULL,
    `order` DOUBLE NULL,

    INDEX `files_related_mph_fk`(`file_id`),
    INDEX `files_related_mph_idix`(`related_id`),
    INDEX `files_related_mph_oidx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `i18n_locale` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `code` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `i18n_locale_created_by_id_fk`(`created_by_id`),
    INDEX `i18n_locale_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `i18n_locale_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_api_token_permissions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `action` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_api_token_permissions_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_api_token_permissions_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_api_token_permissions_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_api_token_permissions_token_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `api_token_permission_id` INTEGER UNSIGNED NULL,
    `api_token_id` INTEGER UNSIGNED NULL,
    `api_token_permission_ord` DOUBLE NULL,

    INDEX `strapi_api_token_permissions_token_lnk_fk`(`api_token_permission_id`),
    INDEX `strapi_api_token_permissions_token_lnk_ifk`(`api_token_id`),
    INDEX `strapi_api_token_permissions_token_lnk_oifk`(`api_token_permission_ord`),
    UNIQUE INDEX `strapi_api_token_permissions_token_lnk_uq`(`api_token_permission_id`, `api_token_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_api_tokens` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `access_key` VARCHAR(255) NULL,
    `last_used_at` DATETIME(6) NULL,
    `expires_at` DATETIME(6) NULL,
    `lifespan` BIGINT NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_api_tokens_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_api_tokens_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_api_tokens_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_core_store_settings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(255) NULL,
    `value` LONGTEXT NULL,
    `type` VARCHAR(255) NULL,
    `environment` VARCHAR(255) NULL,
    `tag` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_database_schema` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `schema` JSON NULL,
    `time` DATETIME(0) NULL,
    `hash` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_history_versions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content_type` VARCHAR(255) NOT NULL,
    `related_document_id` VARCHAR(255) NULL,
    `locale` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `data` JSON NULL,
    `schema` JSON NULL,
    `created_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,

    INDEX `strapi_history_versions_created_by_id_fk`(`created_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_migrations_internal` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_release_actions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `content_type` VARCHAR(255) NULL,
    `entry_document_id` VARCHAR(255) NULL,
    `locale` VARCHAR(255) NULL,
    `is_entry_valid` BOOLEAN NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,

    INDEX `strapi_release_actions_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_release_actions_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_release_actions_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_release_actions_release_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `release_action_id` INTEGER UNSIGNED NULL,
    `release_id` INTEGER UNSIGNED NULL,
    `release_action_ord` DOUBLE NULL,

    INDEX `strapi_release_actions_release_lnk_fk`(`release_action_id`),
    INDEX `strapi_release_actions_release_lnk_ifk`(`release_id`),
    INDEX `strapi_release_actions_release_lnk_oifk`(`release_action_ord`),
    UNIQUE INDEX `strapi_release_actions_release_lnk_uq`(`release_action_id`, `release_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_releases` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `released_at` DATETIME(6) NULL,
    `scheduled_at` DATETIME(6) NULL,
    `timezone` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_releases_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_releases_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_releases_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_transfer_token_permissions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `action` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_transfer_token_permissions_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_transfer_token_permissions_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_transfer_token_permissions_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_transfer_token_permissions_token_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `transfer_token_permission_id` INTEGER UNSIGNED NULL,
    `transfer_token_id` INTEGER UNSIGNED NULL,
    `transfer_token_permission_ord` DOUBLE NULL,

    INDEX `strapi_transfer_token_permissions_token_lnk_fk`(`transfer_token_permission_id`),
    INDEX `strapi_transfer_token_permissions_token_lnk_ifk`(`transfer_token_id`),
    INDEX `strapi_transfer_token_permissions_token_lnk_oifk`(`transfer_token_permission_ord`),
    UNIQUE INDEX `strapi_transfer_token_permissions_token_lnk_uq`(`transfer_token_permission_id`, `transfer_token_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_transfer_tokens` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `access_key` VARCHAR(255) NULL,
    `last_used_at` DATETIME(6) NULL,
    `expires_at` DATETIME(6) NULL,
    `lifespan` BIGINT NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_transfer_tokens_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_transfer_tokens_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_transfer_tokens_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_webhooks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `url` LONGTEXT NULL,
    `headers` JSON NULL,
    `events` JSON NULL,
    `enabled` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_workflows` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `content_types` JSON NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_workflows_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_workflows_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_workflows_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_workflows_stage_required_to_publish_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `workflow_id` INTEGER UNSIGNED NULL,
    `workflow_stage_id` INTEGER UNSIGNED NULL,

    INDEX `strapi_workflows_stage_required_to_publish_lnk_fk`(`workflow_id`),
    INDEX `strapi_workflows_stage_required_to_publish_lnk_ifk`(`workflow_stage_id`),
    UNIQUE INDEX `strapi_workflows_stage_required_to_publish_lnk_uq`(`workflow_id`, `workflow_stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_workflows_stages` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `color` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `strapi_workflows_stages_created_by_id_fk`(`created_by_id`),
    INDEX `strapi_workflows_stages_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `strapi_workflows_stages_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_workflows_stages_permissions_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `workflow_stage_id` INTEGER UNSIGNED NULL,
    `permission_id` INTEGER UNSIGNED NULL,
    `permission_ord` DOUBLE NULL,

    INDEX `strapi_workflows_stages_permissions_lnk_fk`(`workflow_stage_id`),
    INDEX `strapi_workflows_stages_permissions_lnk_ifk`(`permission_id`),
    INDEX `strapi_workflows_stages_permissions_lnk_ofk`(`permission_ord`),
    UNIQUE INDEX `strapi_workflows_stages_permissions_lnk_uq`(`workflow_stage_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strapi_workflows_stages_workflow_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `workflow_stage_id` INTEGER UNSIGNED NULL,
    `workflow_id` INTEGER UNSIGNED NULL,
    `workflow_stage_ord` DOUBLE NULL,

    INDEX `strapi_workflows_stages_workflow_lnk_fk`(`workflow_stage_id`),
    INDEX `strapi_workflows_stages_workflow_lnk_ifk`(`workflow_id`),
    INDEX `strapi_workflows_stages_workflow_lnk_oifk`(`workflow_stage_ord`),
    UNIQUE INDEX `strapi_workflows_stages_workflow_lnk_uq`(`workflow_stage_id`, `workflow_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `subscribers_created_by_id_fk`(`created_by_id`),
    INDEX `subscribers_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `subscribers_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `up_permissions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `action` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `up_permissions_created_by_id_fk`(`created_by_id`),
    INDEX `up_permissions_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `up_permissions_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `up_permissions_role_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `permission_id` INTEGER UNSIGNED NULL,
    `role_id` INTEGER UNSIGNED NULL,
    `permission_ord` DOUBLE NULL,

    INDEX `up_permissions_role_lnk_fk`(`permission_id`),
    INDEX `up_permissions_role_lnk_ifk`(`role_id`),
    INDEX `up_permissions_role_lnk_oifk`(`permission_ord`),
    UNIQUE INDEX `up_permissions_role_lnk_uq`(`permission_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `up_roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `up_roles_created_by_id_fk`(`created_by_id`),
    INDEX `up_roles_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `up_roles_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `up_users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `provider` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `reset_password_token` VARCHAR(255) NULL,
    `confirmation_token` VARCHAR(255) NULL,
    `confirmed` BOOLEAN NULL,
    `blocked` BOOLEAN NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    INDEX `up_users_created_by_id_fk`(`created_by_id`),
    INDEX `up_users_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `up_users_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `up_users_role_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NULL,
    `role_id` INTEGER UNSIGNED NULL,
    `user_ord` DOUBLE NULL,

    INDEX `up_users_role_lnk_fk`(`user_id`),
    INDEX `up_users_role_lnk_ifk`(`role_id`),
    INDEX `up_users_role_lnk_oifk`(`user_ord`),
    UNIQUE INDEX `up_users_role_lnk_uq`(`user_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `upload_folders` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `document_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `path_id` INTEGER NULL,
    `path` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `published_at` DATETIME(6) NULL,
    `created_by_id` INTEGER UNSIGNED NULL,
    `updated_by_id` INTEGER UNSIGNED NULL,
    `locale` VARCHAR(255) NULL,

    UNIQUE INDEX `upload_folders_path_id_index`(`path_id`),
    UNIQUE INDEX `upload_folders_path_index`(`path`),
    INDEX `upload_folders_created_by_id_fk`(`created_by_id`),
    INDEX `upload_folders_documents_idx`(`document_id`, `locale`, `published_at`),
    INDEX `upload_folders_updated_by_id_fk`(`updated_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `upload_folders_parent_lnk` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `folder_id` INTEGER UNSIGNED NULL,
    `inv_folder_id` INTEGER UNSIGNED NULL,
    `folder_ord` DOUBLE NULL,

    INDEX `upload_folders_parent_lnk_fk`(`folder_id`),
    INDEX `upload_folders_parent_lnk_ifk`(`inv_folder_id`),
    INDEX `upload_folders_parent_lnk_oifk`(`folder_ord`),
    UNIQUE INDEX `upload_folders_parent_lnk_uq`(`folder_id`, `inv_folder_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_permissions` ADD CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_permissions` ADD CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_permissions_role_lnk` ADD CONSTRAINT `admin_permissions_role_lnk_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_permissions_role_lnk` ADD CONSTRAINT `admin_permissions_role_lnk_ifk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_roles` ADD CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_roles` ADD CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_users` ADD CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_users` ADD CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_users_roles_lnk` ADD CONSTRAINT `admin_users_roles_lnk_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_users_roles_lnk` ADD CONSTRAINT `admin_users_roles_lnk_ifk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `files_folder_lnk` ADD CONSTRAINT `files_folder_lnk_fk` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `files_folder_lnk` ADD CONSTRAINT `files_folder_lnk_ifk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `files_related_mph` ADD CONSTRAINT `files_related_mph_fk` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `i18n_locale` ADD CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `i18n_locale` ADD CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_token_permissions` ADD CONSTRAINT `strapi_api_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_token_permissions` ADD CONSTRAINT `strapi_api_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_token_permissions_token_lnk` ADD CONSTRAINT `strapi_api_token_permissions_token_lnk_fk` FOREIGN KEY (`api_token_permission_id`) REFERENCES `strapi_api_token_permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_token_permissions_token_lnk` ADD CONSTRAINT `strapi_api_token_permissions_token_lnk_ifk` FOREIGN KEY (`api_token_id`) REFERENCES `strapi_api_tokens`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_tokens` ADD CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_api_tokens` ADD CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_history_versions` ADD CONSTRAINT `strapi_history_versions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_release_actions` ADD CONSTRAINT `strapi_release_actions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_release_actions` ADD CONSTRAINT `strapi_release_actions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_release_actions_release_lnk` ADD CONSTRAINT `strapi_release_actions_release_lnk_fk` FOREIGN KEY (`release_action_id`) REFERENCES `strapi_release_actions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_release_actions_release_lnk` ADD CONSTRAINT `strapi_release_actions_release_lnk_ifk` FOREIGN KEY (`release_id`) REFERENCES `strapi_releases`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_releases` ADD CONSTRAINT `strapi_releases_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_releases` ADD CONSTRAINT `strapi_releases_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_token_permissions` ADD CONSTRAINT `strapi_transfer_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_token_permissions` ADD CONSTRAINT `strapi_transfer_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_token_permissions_token_lnk` ADD CONSTRAINT `strapi_transfer_token_permissions_token_lnk_fk` FOREIGN KEY (`transfer_token_permission_id`) REFERENCES `strapi_transfer_token_permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_token_permissions_token_lnk` ADD CONSTRAINT `strapi_transfer_token_permissions_token_lnk_ifk` FOREIGN KEY (`transfer_token_id`) REFERENCES `strapi_transfer_tokens`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_tokens` ADD CONSTRAINT `strapi_transfer_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_transfer_tokens` ADD CONSTRAINT `strapi_transfer_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows` ADD CONSTRAINT `strapi_workflows_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows` ADD CONSTRAINT `strapi_workflows_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stage_required_to_publish_lnk` ADD CONSTRAINT `strapi_workflows_stage_required_to_publish_lnk_fk` FOREIGN KEY (`workflow_id`) REFERENCES `strapi_workflows`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stage_required_to_publish_lnk` ADD CONSTRAINT `strapi_workflows_stage_required_to_publish_lnk_ifk` FOREIGN KEY (`workflow_stage_id`) REFERENCES `strapi_workflows_stages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages` ADD CONSTRAINT `strapi_workflows_stages_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages` ADD CONSTRAINT `strapi_workflows_stages_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages_permissions_lnk` ADD CONSTRAINT `strapi_workflows_stages_permissions_lnk_fk` FOREIGN KEY (`workflow_stage_id`) REFERENCES `strapi_workflows_stages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages_permissions_lnk` ADD CONSTRAINT `strapi_workflows_stages_permissions_lnk_ifk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages_workflow_lnk` ADD CONSTRAINT `strapi_workflows_stages_workflow_lnk_fk` FOREIGN KEY (`workflow_stage_id`) REFERENCES `strapi_workflows_stages`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `strapi_workflows_stages_workflow_lnk` ADD CONSTRAINT `strapi_workflows_stages_workflow_lnk_ifk` FOREIGN KEY (`workflow_id`) REFERENCES `strapi_workflows`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subscribers` ADD CONSTRAINT `subscribers_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subscribers` ADD CONSTRAINT `subscribers_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_permissions` ADD CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_permissions` ADD CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_permissions_role_lnk` ADD CONSTRAINT `up_permissions_role_lnk_fk` FOREIGN KEY (`permission_id`) REFERENCES `up_permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_permissions_role_lnk` ADD CONSTRAINT `up_permissions_role_lnk_ifk` FOREIGN KEY (`role_id`) REFERENCES `up_roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_roles` ADD CONSTRAINT `up_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_roles` ADD CONSTRAINT `up_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_users` ADD CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_users` ADD CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_users_role_lnk` ADD CONSTRAINT `up_users_role_lnk_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `up_users_role_lnk` ADD CONSTRAINT `up_users_role_lnk_ifk` FOREIGN KEY (`role_id`) REFERENCES `up_roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `upload_folders` ADD CONSTRAINT `upload_folders_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `upload_folders` ADD CONSTRAINT `upload_folders_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `upload_folders_parent_lnk` ADD CONSTRAINT `upload_folders_parent_lnk_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `upload_folders_parent_lnk` ADD CONSTRAINT `upload_folders_parent_lnk_ifk` FOREIGN KEY (`inv_folder_id`) REFERENCES `upload_folders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

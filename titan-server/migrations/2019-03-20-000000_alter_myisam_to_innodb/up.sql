# Somehow these tables were created using the MyISAM engine, which
# doesn't support foreign keys. This migration alters the engine of
# all problematic tables from MyISAM to InnoDB.
ALTER TABLE `organization_roles` ENGINE=InnoDB;
ALTER TABLE `organizations_users` ENGINE=InnoDB;
ALTER TABLE `event_types` ENGINE=InnoDB;

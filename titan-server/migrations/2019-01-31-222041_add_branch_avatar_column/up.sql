-- Your SQL goes here
ALTER TABLE `organizations` ADD COLUMN `avatar_url` TEXT NOT NULL AFTER slug;

UPDATE `organizations` SET `avatar_url` = 'https://lh5.googleusercontent.com/AjCr67_8NaVMFod9wlISu3P-AGIQ_IpsHairr5RBqftPD4X7pVxf8EYakgdtcGJEv_nVtJstTkCm6e-HL5nN6k7qHfB71oqioUH6FwtoPVZYLlyFXNB1NTm0IK75XlGpWAkpL5G-' WHERE name = 'Army';
UPDATE `organizations` SET `avatar_url` = 'https://lh5.googleusercontent.com/HrFxHitCXCf8-P6Us5lRkvbf6s4VrrxRBlH2SLKy5OIg99VRi9ewVdhcFaFFDftZm86-PH_mD_ryX7_qx0qxX0nILd75rZkXiamLDPDf09dmVz9FU1o3NNAkPHSpAvuHa9c0WiVA' WHERE name = 'Air Force';
UPDATE `organizations` SET `avatar_url` = 'https://i1.wp.com/alidade-mer.com/wp-content/uploads/2014/01/coast-guard-logo-1.jpg' WHERE name = 'Coast Guard';
UPDATE `organizations` SET `avatar_url` = 'https://lh3.googleusercontent.com/KfMecNbJnsoify_dibcbRA3CCU_Xfy4wdq4zCOmBsGYYS_1K1dfbcR6od__LJ9HYAtrjROuwuy8v10tu_dr7WWFnRfgUg-8rDYzFJ-1Z4zUcPRnLDsXXhaRSGLH2ht4LHa8ZRqYA' WHERE name = 'Marines';
UPDATE `organizations` SET `avatar_url` = 'https://lh6.googleusercontent.com/zHJt3iJJBOF7YjiM5pq856vnrNfuhdAcmPNdYiXj3PmGuLqBbD1IqUKWcNfEGhwUScHILSRqtZmS36tbpFLm7DDTrRiWhCAEZRRQu_gecrYw9HvniyQHQQWiNMyAGcYWxuQA4F3R' WHERE name = 'Navy';

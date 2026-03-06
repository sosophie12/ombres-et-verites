/**
 * CaseData.js — "L'Affaire du Manoir Beaumont"
 * A complete detective case with locations, clues, suspects, dialogues, and solution
 */
window.CASE_DATA = {
    id: 'case_1',
    title: 'L\'Affaire du Manoir Beaumont',
    subtitle: 'Le meurtre de Victor Beaumont',
    difficulty: '⭐',
    intro: `Vous êtes l'inspecteur Morel, appelé au Manoir Beaumont suite au décès suspect de Victor Beaumont, 
un riche homme d'affaires retrouvé mort dans son bureau. La police locale suspecte un empoisonnement. 
Quatre personnes étaient présentes dans le manoir cette nuit-là. À vous de découvrir la vérité.`,

    // ===== SUSPECTS =====
    suspects: [
        {
            id: 'claire',
            name: 'Claire Beaumont',
            role: 'Épouse de la victime',
            emoji: '👩',
            description: 'Épouse de Victor depuis 15 ans. Élégante, froide et calculatrice. Elle hérite de la totalité de la fortune.',
            alibi: 'Dit avoir été dans sa chambre toute la soirée avec une migraine.'
        },
        {
            id: 'lucas',
            name: 'Lucas Beaumont',
            role: 'Fils de la victime',
            emoji: '👨‍🦱',
            description: 'Fils unique, 28 ans, artiste raté. Endetté jusqu\'au cou et en conflit ouvert avec son père qui menaçait de le déshériter.',
            alibi: 'Prétend avoir été au jardin pour fumer vers 22h.'
        },
        {
            id: 'marguerite',
            name: 'Marguerite Duval',
            role: 'Gouvernante',
            emoji: '👵',
            description: 'Gouvernante dévouée depuis 30 ans. Connaît tous les secrets de la famille. Semble très affectée par la mort de Victor.',
            alibi: 'Affirme avoir été en cuisine pour préparer le thé de Victor.'
        },
        {
            id: 'rene',
            name: 'René Delacroix',
            role: 'Associé d\'affaires',
            emoji: '🧔',
            description: 'Partenaire commercial de Victor. Arrivé au manoir pour un dîner d\'affaires. Rumeurs d\'un désaccord financier majeur entre eux.',
            alibi: 'Indique avoir été dans le salon à lire après le dîner.'
        }
    ],

    // ===== CLUES =====
    clues: [
        {
            id: 'tasse_brisee',
            name: 'Tasse de thé brisée',
            description: 'Une tasse en porcelaine brisée au pied du bureau. Des résidus brunâtres tapissent les fragments. L\'analyse révélera la présence de cyanure.',
            shortDesc: 'Tasse brisée avec résidus suspects',
            location: 'study',
            category: 'physical'
        },
        {
            id: 'fiole_vide',
            name: 'Fiole vide',
            description: 'Une petite fiole en verre brun, trouvée dans la poubelle de la cuisine. L\'étiquette a été arrachée mais on distingue le symbole de danger ☠️.',
            shortDesc: 'Fiole suspecte dans la poubelle',
            location: 'kitchen',
            category: 'physical'
        },
        {
            id: 'testament',
            name: 'Nouveau testament',
            description: 'Un testament récent daté d\'il y a 3 jours, trouvé dans le coffre du bureau. Victor léguait tout à une fondation caritative, déshéritant Claire et Lucas.',
            shortDesc: 'Testament récent modifié',
            location: 'study',
            category: 'document'
        },
        {
            id: 'lettre_menace',
            name: 'Lettre de menace',
            description: 'Une lettre anonyme trouvée dans le tiroir du bureau : "Annulez le contrat ou vous le regretterez." L\'écriture semble déguisée.',
            shortDesc: 'Lettre de menace anonyme',
            location: 'study',
            category: 'document'
        },
        {
            id: 'gants_jardin',
            name: 'Gants de jardin tachés',
            description: 'Des gants de jardin trouvés près du banc, avec des traces de produit chimique similaire aux résidus de la fiole.',
            shortDesc: 'Gants avec traces chimiques',
            location: 'garden',
            category: 'physical'
        },
        {
            id: 'photo_dechirée',
            name: 'Photo déchirée',
            description: 'Une photo de famille déchirée en deux. Victor et Claire d\'un côté, la photo est déchirée pour séparer le reste de la famille.',
            shortDesc: 'Photo de famille déchirée',
            location: 'living_room',
            category: 'physical'
        },
        {
            id: 'livre_poison',
            name: 'Livre sur les poisons',
            description: 'Un livre intitulé "Les Plantes Toxiques et leurs Usages" avec un marque-page au chapitre sur le cyanure. Trouvé dans le salon.',
            shortDesc: 'Livre sur les poisons, chapitre cyanure',
            location: 'living_room',
            category: 'document'
        },
        {
            id: 'contrat_litigieux',
            name: 'Contrat litigieux',
            description: 'Un contrat entre Victor et René montrant que René doit 2 millions d\'euros à Victor, remboursables immédiatement en cas de décès de ce dernier selon une clause obscure.',
            shortDesc: 'Contrat avec clause suspecte',
            location: 'study',
            category: 'document'
        },
        {
            id: 'temoignage_marguerite',
            name: 'Témoignage de Marguerite',
            description: 'Marguerite avoue avoir vu Claire descendre du bureau vers 22h30, l\'air agité. Claire prétendait être dans sa chambre à cette heure.',
            shortDesc: 'Marguerite a vu Claire au bureau',
            location: 'kitchen',
            category: 'testimony'
        },
        {
            id: 'alliance_manquante',
            name: 'Alliance manquante',
            description: 'L\'alliance de Victor n\'est pas à son doigt. Claire porte encore la sienne. Victor l\'avait peut-être enlevée récemment — signe d\'un mariage en crise ?',
            shortDesc: 'Victor ne portait plus son alliance',
            location: 'bedroom',
            category: 'physical'
        },
        {
            id: 'ticket_pharmacie',
            name: 'Ticket de pharmacie',
            description: 'Un ticket de pharmacie au nom de Claire Beaumont pour l\'achat de "mort-aux-rats" il y a une semaine. Trouvé froissé dans la chambre.',
            shortDesc: 'Achat de poison par Claire',
            location: 'bedroom',
            category: 'document'
        },
        {
            id: 'empreintes_tasse',
            name: 'Empreintes sur la tasse',
            description: 'L\'analyse des fragments de la tasse révèle deux jeux d\'empreintes : celles de Victor et celles de Claire Beaumont.',
            shortDesc: 'Empreintes de Claire sur la tasse',
            location: 'study',
            category: 'forensic'
        }
    ],

    // ===== LOCATIONS =====
    locations: [
        {
            id: 'mansion_entrance',
            name: 'Entrée du Manoir',
            icon: '🏚️',
            scene: 'mansion_entrance',
            description: 'Le manoir Beaumont se dresse dans la nuit.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_door',
                    label: 'Entrer dans le manoir',
                    x: 43, y: 32, width: 14, height: 22,
                    type: 'object',
                    examineText: 'La grande porte en chêne est entrouverte. L\'air froid du manoir vous accueille. Le commissaire vous attend à l\'intérieur.',
                    unlockLocation: 'living_room',
                    flag: 'entered_mansion'
                },
                {
                    id: 'hs_garden_path',
                    label: 'Chemin du jardin',
                    x: 15, y: 60, width: 20, height: 15,
                    type: 'object',
                    examineText: 'Un chemin mène vers le jardin arrière du manoir. Il fait sombre mais une lanterne éclaire faiblement le sentier.',
                    unlockLocation: 'garden'
                }
            ]
        },
        {
            id: 'living_room',
            name: 'Salon',
            icon: '🛋️',
            scene: 'living_room',
            description: 'Grand salon avec cheminée. Un feu crépite encore.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_fireplace',
                    label: 'Cheminée',
                    x: 35, y: 18, width: 30, height: 48,
                    type: 'object',
                    examineText: 'Le feu crépite doucement. Des cendres de papier brûlé sont visibles... quelqu\'un a détruit des documents récemment.'
                },
                {
                    id: 'hs_sofa_area',
                    label: 'Canapé et table basse',
                    x: 5, y: 50, width: 27, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un verre de whisky à moitié vide sur la table basse. Et... qu\'est-ce que c\'est ?'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un livre sur les plantes toxiques. Le marque-page indique le chapitre sur le cyanure. Très intéressant...',
                                action: { addClue: 'livre_poison' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_painting',
                    label: 'Tableau',
                    x: 75, y: 15, width: 16, height: 22,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un portrait de famille. Mais attendez... la photo est déchirée. Victor et Claire ont été séparés du reste.',
                                action: { addClue: 'photo_dechirée' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_rene',
                    label: 'René Delacroix',
                    x: 8, y: 35, width: 12, height: 25,
                    type: 'person',
                    condition: { hasFlag: 'entered_mansion' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'René Delacroix', portrait: '🧔',
                                text: 'Inspecteur... quelle tragédie. Victor était mon plus vieil ami et partenaire. Je n\'arrive pas à y croire.',
                                action: { addSuspect: 'rene' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Que faisiez-vous ce soir, Monsieur Delacroix ?',
                            },
                            {
                                speaker: 'René Delacroix', portrait: '🧔',
                                text: 'J\'étais ici, dans ce salon, à lire après le dîner. Je n\'ai rien entendu d\'anormal jusqu\'aux cris de la gouvernante.',
                                choices: [
                                    {
                                        text: '🔍 Parlez-moi de vos affaires avec Victor.',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Des tensions entre vous et Victor récemment ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci, c\'est tout pour le moment.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'René Delacroix', portrait: '🧔',
                                text: 'Nos affaires ? Tout allait bien. Un contrat important en cours de finalisation. Rien que de très normal.',
                                action: { setFlag: 'asked_rene_business' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Il semble nerveux quand il parle de ce contrat. Je devrais chercher ce document.)',
                                action: { journal: 'René semble cacher quelque chose concernant un contrat avec Victor.' }
                            },
                            {
                                speaker: 'René Delacroix', portrait: '🧔',
                                text: 'Des tensions ? Non, absolument pas ! Victor et moi étions comme des frères. Je refuse ces insinuations !',
                                action: { setFlag: 'rene_denied_tension' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Sa réaction était un peu trop vive. Il cache quelque chose.)',
                                action: { journal: 'René réagit violemment quand on évoque des tensions avec Victor.' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'study',
            name: 'Bureau de Victor',
            icon: '📚',
            scene: 'study',
            description: 'Le bureau où Victor a été retrouvé mort.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_desk',
                    label: 'Bureau',
                    x: 20, y: 42, width: 60, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le bureau est couvert de papiers. Des documents financiers, des courriers... et une tasse brisée au sol.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La tasse est en morceaux. Des résidus brunâtres... ce n\'est pas du thé ordinaire. Je dois faire analyser ça.',
                                action: { addClue: 'tasse_brisee' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Dans le tiroir... une lettre : "Annulez le contrat ou vous le regretterez." Pas de signature.',
                                action: { addClue: 'lettre_menace' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_safe',
                    label: 'Coffre-fort',
                    x: 6, y: 22, width: 12, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un coffre-fort mural. Il est entrouvert... quelqu\'un l\'a ouvert récemment.',
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'À l\'intérieur, un testament daté d\'il y a trois jours. Victor léguait tout à une fondation... il déshéritait sa famille !',
                                action: { addClue: 'testament' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Et un contrat entre Victor et René Delacroix. Une clause intéressante : en cas de décès de Victor, la dette de 2 millions de René est effacée.',
                                action: { addClue: 'contrat_litigieux' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_papers',
                    label: 'Papiers éparpillés',
                    x: 30, y: 35, width: 25, height: 12,
                    type: 'object',
                    examineText: 'Des papiers de correspondance. Rien de particulier... des factures, des invitations. La vie quotidienne d\'un homme riche.',
                    condition: { hasClue: 'tasse_brisee' }
                },
                {
                    id: 'hs_tasse_analyse',
                    label: 'Analyser les empreintes',
                    x: 42, y: 55, width: 16, height: 10,
                    type: 'object',
                    condition: { hasClue: 'tasse_brisee' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Je peux relever les empreintes sur les fragments de la tasse avec mon kit...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Deux jeux d\'empreintes : celles de Victor bien sûr, et... celles de Claire Beaumont. C\'est elle qui a servi ce thé.',
                                action: { addClue: 'empreintes_tasse' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'kitchen',
            name: 'Cuisine',
            icon: '🍳',
            scene: 'kitchen',
            description: 'La cuisine du manoir, où le thé a été préparé.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_trash',
                    label: 'Poubelle',
                    x: 25, y: 55, width: 10, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Fouillons la poubelle... un classique de l\'enquête. Ah, voilà quelque chose d\'intéressant !'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une petite fiole en verre brun au fond de la poubelle. L\'étiquette a été arrachée, mais le symbole de danger est encore visible.',
                                action: { addClue: 'fiole_vide' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_counter',
                    label: 'Plan de travail',
                    x: 5, y: 40, width: 40, height: 12,
                    type: 'object',
                    examineText: 'Le plan de travail est propre. Une théière, des tasses organisées. Marguerite est très méticuleuse. Un plateau avec une tasse manquante... la tasse du thé de Victor ?'
                },
                {
                    id: 'hs_knife_block',
                    label: 'Bloc de couteaux',
                    x: 30, y: 34, width: 8, height: 14,
                    type: 'object',
                    examineText: 'Un bloc à couteaux de chef. Tous les couteaux sont en place. Aucun n\'a été utilisé comme arme.'
                },
                {
                    id: 'hs_marguerite',
                    label: 'Marguerite Duval',
                    x: 70, y: 30, width: 12, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Marguerite Duval', portrait: '👵',
                                text: '*sanglots* Mon pauvre Monsieur Victor... 30 ans que je sers cette famille. Qui a pu faire une chose pareille ?',
                                action: { addSuspect: 'marguerite' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'C\'est vous qui avez préparé le thé ce soir, Marguerite ?'
                            },
                            {
                                speaker: 'Marguerite Duval', portrait: '👵',
                                text: 'Oui, comme chaque soir. J\'ai préparé la théière vers 22h et j\'ai posé le plateau ici. Mais...',
                                choices: [
                                    {
                                        text: '🔍 Mais quoi ? Continuez.',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Qui a apporté le thé à Victor ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci Marguerite.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Marguerite Duval', portrait: '👵',
                                text: 'J\'ai vu Madame Claire descendre les escaliers vers 22h30. Elle venait du bureau de Victor et elle avait l\'air... agité. Très agité.',
                                action: { addClue: 'temoignage_marguerite', journal: 'Marguerite affirme avoir vu Claire sortir du bureau à 22h30, l\'air agité.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Claire disait être dans sa chambre toute la soirée... ce témoignage la contredit directement.)',
                                action: { setFlag: 'marguerite_testimony' }
                            },
                            {
                                speaker: 'Marguerite Duval', portrait: '👵',
                                text: 'Normalement c\'est moi qui le monte. Mais ce soir, Madame Claire a insisté pour le faire elle-même. Elle a dit vouloir parler à son mari.',
                                action: { setFlag: 'claire_served_tea', journal: 'Claire a insisté pour apporter le thé elle-même à Victor ce soir-là.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Intéressant... Claire a elle-même servi le thé empoisonné.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_wine',
                    label: 'Bouteille de vin',
                    x: 13, y: 33, width: 6, height: 15,
                    type: 'object',
                    examineText: 'Un Bordeaux grand cru. La bouteille est presque vide. Le dîner a dû être arrosé ce soir.'
                }
            ]
        },
        {
            id: 'garden',
            name: 'Jardin',
            icon: '🌙',
            scene: 'garden',
            description: 'Le jardin arrière du manoir, plongé dans l\'obscurité.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_bench',
                    label: 'Banc de jardin',
                    x: 13, y: 65, width: 15, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des mégots de cigarettes sous le banc. Lucas dit qu\'il fumait ici... c\'est cohérent.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Mais attendez... des gants de jardin cachés sous le banc. Et ces taches... ça ressemble au produit de la fiole trouvée en cuisine.',
                                action: { addClue: 'gants_jardin' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_fountain',
                    label: 'Fontaine',
                    x: 43, y: 48, width: 14, height: 12,
                    type: 'object',
                    examineText: 'Une vieille fontaine de pierre. L\'eau ne coule plus depuis longtemps. Des feuilles mortes flottent à la surface.'
                },
                {
                    id: 'hs_lucas',
                    label: 'Lucas Beaumont',
                    x: 60, y: 50, width: 10, height: 25,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: '*allume une cigarette* Mon père est mort et tout le monde me regarde comme si c\'était moi. Charmant.',
                                action: { addSuspect: 'lucas' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Où étiez-vous vers 22h, Lucas ?'
                            },
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: 'Ici. Dans le jardin. Je fumais. J\'avais besoin d\'air après encore une dispute avec mon père.',
                                choices: [
                                    {
                                        text: '🔍 Quelle dispute ?',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Vous saviez pour le nouveau testament ?',
                                        condition: { hasClue: 'testament' },
                                        goto: 5
                                    },
                                    {
                                        text: '👊 Ces gants sont à vous ?',
                                        condition: { hasClue: 'gants_jardin' },
                                        goto: 7
                                    },
                                    {
                                        text: '✋ Je vous laisse.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: 'La même que d\'habitude. L\'argent. Mon père pensait que j\'étais un bon à rien. Il menaçait de me couper les vivres.',
                                action: { setFlag: 'lucas_dispute', journal: 'Lucas confirme une dispute financière récurrente avec son père.' }
                            },
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: 'Mais de là à tuer son propre père... même moi je ne suis pas tombé si bas. Pas encore.',
                            },
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: '...Le quoi ? Un nouveau testament ? Non, je... mon père allait me déshériter ?!'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Sa surprise semble authentique. Soit il est un excellent comédien, soit il ne savait vraiment pas.)',
                                action: { setFlag: 'lucas_surprised_testament', journal: 'Lucas semble sincèrement surpris par l\'existence du nouveau testament.' }
                            },
                            {
                                speaker: 'Lucas Beaumont', portrait: '👨‍🦱',
                                text: 'Des gants ? Ce sont les gants du jardinier, pas les miens ! Je ne fais pas de jardinage, inspecteur.',
                                action: { setFlag: 'lucas_denied_gloves' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Les gants étaient sous le banc où il fumait. Coïncidence ou dissimulation ?)',
                                action: { journal: 'Lucas nie que les gants tachés soient les siens.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_hedge',
                    label: 'Haies',
                    x: 5, y: 42, width: 25, height: 12,
                    type: 'object',
                    examineText: 'Des haies bien taillées. Marguerite entretient le jardin avec soin. Rien de suspect ici.'
                }
            ]
        },
        {
            id: 'bedroom',
            name: 'Chambre conjugale',
            icon: '🛏️',
            scene: 'bedroom',
            description: 'La chambre de Victor et Claire Beaumont.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_bed',
                    label: 'Lit',
                    x: 10, y: 30, width: 45, height: 35,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le lit est à peine défait d\'un côté. L\'autre côté semble intact. Victor dormait-il encore ici ?'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Sur la table de nuit de Victor... un emplacement vide pour une alliance. Il ne la portait plus.',
                                action: { addClue: 'alliance_manquante' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_wardrobe',
                    label: 'Armoire',
                    x: 75, y: 15, width: 18, height: 50,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'armoire de Claire. Des vêtements luxueux, sacs à main de marque... et au fond, froissé, un ticket de pharmacie.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Pharmacie du Centre, il y a une semaine. Au nom de Claire Beaumont. Achat : "produit de dératisation". De la mort-aux-rats.',
                                action: { addClue: 'ticket_pharmacie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La mort-aux-rats contient souvent du cyanure... le même poison suspecté dans la tasse de thé.)',
                                action: { journal: 'Claire a acheté de la mort-aux-rats une semaine avant le meurtre.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_claire',
                    label: 'Claire Beaumont',
                    x: 30, y: 15, width: 12, height: 25,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'Inspecteur... mon mari... *voix tremblante* Je n\'arrive pas à réaliser. Nous étions ensemble depuis 15 ans.',
                                action: { addSuspect: 'claire' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Madame Beaumont, où étiez-vous ce soir entre 22h et 23h ?'
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'J\'étais ici, dans cette chambre. J\'avais une migraine terrible. Je me suis couchée tôt.',
                                choices: [
                                    {
                                        text: '🔍 Marguerite dit vous avoir vue au bureau à 22h30.',
                                        condition: { hasClue: 'temoignage_marguerite' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 C\'est vous qui avez servi le thé ?',
                                        condition: { hasFlag: 'claire_served_tea' },
                                        goto: 6
                                    },
                                    {
                                        text: '📋 Ce ticket de pharmacie est à vous.',
                                        condition: { hasClue: 'ticket_pharmacie' },
                                        goto: 8
                                    },
                                    {
                                        text: '💍 Victor ne portait plus son alliance...',
                                        condition: { hasClue: 'alliance_manquante' },
                                        goto: 11
                                    },
                                    {
                                        text: '✋ Je reviendrai.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: '... Elle ment ! Ou bien... d\'accord. Oui, je suis descendue un moment voir Victor. Nous avons discuté. Mais je suis remontée tout de suite.',
                                action: { setFlag: 'claire_admitted_visit' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous aviez l\'air agité en sortant, selon Marguerite.'
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'Nous... nous nous sommes disputés. À propos du testament. Il voulait tout donner à une fondation. Tout ! 15 ans de mariage et il allait tout nous enlever !',
                                action: { setFlag: 'claire_knew_testament', journal: 'Claire admet être allée voir Victor et s\'être disputée au sujet du testament.' }
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'Le thé ? Oui, j\'ai insisté pour le monter. Je voulais parler à Victor en privé. Mais le thé était normal quand je l\'ai apporté, je le jure !',
                                action: { setFlag: 'claire_admits_tea', journal: 'Claire admet avoir apporté le thé empoisonné mais affirme qu\'il était normal.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Elle a eu l\'occasion parfaite d\'empoisonner le thé avant de le servir.)',
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'La... la mort-aux-rats ? C\'est pour les rats ! Le manoir est ancien, il y a des rats dans la cave. Demandez à Marguerite !'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'De la mort-aux-rats, une semaine avant la mort de votre mari par empoisonnement. Vous comprenez que ça paraît suspect ?',
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: '*pâlit* Je... c\'est une coïncidence. Je n\'ai pas tué mon mari, inspecteur.',
                                action: { setFlag: 'claire_confronted_poison', journal: 'Claire nie avoir utilisé la mort-aux-rats pour empoisonner Victor.' }
                            },
                            {
                                speaker: 'Claire Beaumont', portrait: '👩',
                                text: 'Notre mariage... n\'était plus ce qu\'il était. Victor passait ses nuits au bureau. Nous étions devenus des étrangers sous le même toit.',
                                action: { setFlag: 'marriage_crisis', journal: 'Claire confirme que le mariage avec Victor était en crise.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un mariage brisé, un testament qui la déshérite, un achat de poison... tout s\'accumule contre Claire.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_window',
                    label: 'Fenêtre',
                    x: 27, y: 3, width: 18, height: 25,
                    type: 'object',
                    examineText: 'La fenêtre donne sur le jardin. De là, on peut voir le banc où Lucas fumait. La vue est dégagée malgré l\'obscurité.'
                }
            ]
        }
    ],

    // ===== SOLUTION =====
    solution: {
        culprit: 'claire',
        keyEvidence: ['tasse_brisee', 'ticket_pharmacie', 'empreintes_tasse', 'temoignage_marguerite', 'fiole_vide'],
        
        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Grâce à votre enquête méticuleuse, Claire Beaumont est arrêtée et confrontée à l'ensemble des preuves. 
                
Face aux empreintes sur la tasse, au ticket de pharmacie, au témoignage de Marguerite et à la fiole de poison, elle finit par craquer et avouer.

Claire avait découvert le nouveau testament et, voyant sa fortune s'envoler, avait planifié l'empoisonnement. Elle avait acheté la mort-aux-rats, extrait le cyanure, puis profité de l'excuse du thé pour administrer le poison.

Les gants dans le jardin ? Claire les avait utilisés pour manipuler le poison, puis les avait cachés près du banc de Lucas pour le faire accuser.

Justice est rendue. Victor Beaumont peut reposer en paix.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez correctement identifié Claire Beaumont comme coupable, mais certaines preuves clés manquent à votre dossier. 

Le procureur obtient une condamnation, mais la défense exploite les lacunes de l'enquête. Claire reçoit une peine plus légère que ce qu'elle méritait.

Néanmoins, justice a été rendue, même imparfaitement.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Un innocent est temporairement incarcéré tandis que la vraie coupable, Claire Beaumont, profite de l'occasion pour fuir à l'étranger avec ce qu'il reste de la fortune.

Les preuves étaient pourtant là : ses empreintes sur la tasse empoisonnée, l'achat de mort-aux-rats, le témoignage de Marguerite...

L'affaire Beaumont restera comme un échec dans votre carrière.`
            }
        }
    },

    // ===== INTRO DIALOGUE =====
    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur Morel, merci d\'être venu si vite. Nous avons une situation délicate au Manoir Beaumont.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Victor Beaumont, homme d\'affaires richissime, a été retrouvé mort dans son bureau il y a deux heures. Tout indique un empoisonnement.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Qui était présent dans le manoir ?'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Quatre personnes : Claire, son épouse. Lucas, son fils. Marguerite Duval, la gouvernante. Et René Delacroix, un associé d\'affaires venu dîner.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le manoir est sécurisé. Personne n\'est entré ni sorti depuis 20h. Le meurtrier est forcément l\'un d\'entre eux.',
                action: { 
                    unlockLocation: 'living_room',
                    unlockLocation2: 'study', 
                    journal: 'Arrivée au Manoir Beaumont. Victor Beaumont retrouvé mort, probablement empoisonné. Quatre suspects : Claire (épouse), Lucas (fils), Marguerite (gouvernante), René (associé).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Compris. Je vais examiner les lieux et interroger tout le monde. La vérité finira par émerger.',
                action: (state) => {
                    state.unlockLocation('study');
                    state.unlockLocation('kitchen');
                    state.unlockLocation('bedroom');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};

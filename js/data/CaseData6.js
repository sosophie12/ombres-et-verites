/**
 * CaseData6.js — "L'Hôtel des Brumes"
 * Un critique gastronomique est empoisonné dans un hôtel de luxe en montagne.
 */
window.CASE_DATA_6 = {
    id: 'case_6',
    title: 'L\'Hôtel des Brumes',
    subtitle: 'Empoisonnement au sommet',
    difficulty: '⭐⭐',
    intro: `Le célèbre critique gastronomique Jean-Pierre Arnaud est retrouvé mort dans sa suite au Grand Hôtel des Brumes, 
un palace isolé dans les Alpes. Il venait rédiger une critique décisive du restaurant de l'hôtel.
La route est coupée par la neige. Personne ne peut quitter les lieux.`,

    suspects: [
        {
            id: 'chef_bertrand',
            name: 'Bertrand Leclerc',
            role: 'Chef cuisinier',
            emoji: '👨‍🍳',
            description: 'Chef étoilé de l\'hôtel. Sa dernière critique par Arnaud lui avait coûté une étoile Michelin. Il risquait de tout perdre.',
            alibi: 'Dit avoir été en cuisine toute la soirée à préparer le dîner spécial.'
        },
        {
            id: 'gerante',
            name: 'Valérie Dubois',
            role: 'Gérante de l\'hôtel',
            emoji: '👩‍💻',
            description: 'Gérante et propriétaire. L\'hôtel traverse une crise financière. Une mauvaise critique d\'Arnaud signifierait la faillite.',
            alibi: 'Affirme avoir été dans son bureau à faire la comptabilité jusqu\'à minuit.'
        },
        {
            id: 'sommelier',
            name: 'Nicolas Ferrand',
            role: 'Sommelier',
            emoji: '🧑‍🍳',
            description: 'Sommelier passionné. Rumeur d\'une relation secrète avec la victime qui aurait mal tourné.',
            alibi: 'Indique avoir rangé la cave à vin après le service et être monté se coucher à 23h.'
        },
        {
            id: 'cliente',
            name: 'Amélie Chartier',
            role: 'Cliente mystérieuse',
            emoji: '👩',
            description: 'Arrivée la veille sans réservation. Se dit romancière en quête d\'inspiration. Mais personne ne trouve ses livres.',
            alibi: 'Prétend être restée dans sa chambre à écrire.'
        }
    ],

    clues: [
        {
            id: 'verre_vin',
            name: 'Verre de vin empoisonné',
            description: 'Le verre de vin trouvé sur la table de nuit d\'Arnaud. L\'analyse révèle des traces d\'antigel (éthylène glycol) mélangé au vin.',
            shortDesc: 'Vin contaminé à l\'antigel',
            location: 'suite_arnaud',
            category: 'physical'
        },
        {
            id: 'bouteille_cave',
            name: 'Bouteille ouverte en cave',
            description: 'Une bouteille de Romanée-Conti 2005 ouverte dans la cave. Le bouchon a été retiré puis remis. Le vin a été trafiqué avant d\'être servi.',
            shortDesc: 'Bouteille trafiquée en cave',
            location: 'cave_vin',
            category: 'physical'
        },
        {
            id: 'antigel_garage',
            name: 'Bidon d\'antigel entamé',
            description: 'Un bidon d\'antigel dans le garage de l\'hôtel, récemment ouvert. Des traces de vin rouge sur le bouchon du bidon.',
            shortDesc: 'Antigel avec traces de vin',
            location: 'hall_hotel',
            category: 'physical'
        },
        {
            id: 'critique_precedente',
            name: 'Ancienne critique',
            description: 'Un article de presse encadré dans le bureau de Valérie : la critique dévastatrice d\'Arnaud, publiée il y a 6 mois, qui a fait perdre une étoile au restaurant.',
            shortDesc: 'Critique qui a coûté une étoile',
            location: 'bureau_hotel',
            category: 'document'
        },
        {
            id: 'mail_menace_chef',
            name: 'E-mail du chef',
            description: 'Un e-mail envoyé par Bertrand à un ami : "Si Arnaud publie encore une critique négative, je le détruirai. Il ne comprend rien à la cuisine."',
            shortDesc: 'Menace écrite du chef',
            location: 'cuisine_hotel',
            category: 'document'
        },
        {
            id: 'registre_cave',
            name: 'Registre de la cave',
            description: 'Le registre des accès à la cave montre que Nicolas est descendu à 21h45, et Valérie à 22h30. Seuls eux deux ont le code d\'accès.',
            shortDesc: 'Accès à la cave ce soir-là',
            location: 'cave_vin',
            category: 'document'
        },
        {
            id: 'gants_valérie',
            name: 'Gants tachés de vin',
            description: 'Des gants en cuir dans le tiroir du bureau de Valérie, avec des taches de vin rouge récentes. Elle ne boit pourtant jamais de vin.',
            shortDesc: 'Gants tachés de vin de Valérie',
            location: 'bureau_hotel',
            category: 'physical'
        },
        {
            id: 'faux_nom_amelie',
            name: 'Fausse identité d\'Amélie',
            description: 'La carte d\'identité d\'Amélie Chartier est un faux. Son vrai nom : Amélie Arnaud. C\'est l\'ex-femme de la victime.',
            shortDesc: 'Amélie est l\'ex-femme de la victime',
            location: 'chambre_amelie',
            category: 'document'
        },
        {
            id: 'assurance_vie_amelie',
            name: 'Police d\'assurance',
            description: 'Une police d\'assurance vie trouvée dans les affaires d\'Amélie : 2 millions d\'euros en cas de décès d\'Arnaud, jamais annulée après le divorce.',
            shortDesc: 'Assurance vie de 2 millions',
            location: 'chambre_amelie',
            category: 'document'
        },
        {
            id: 'empreintes_bouteille',
            name: 'Empreintes sur la bouteille',
            description: 'Les empreintes sur la bouteille de Romanée-Conti : celles de Nicolas (normal), mais aussi celles de Valérie Dubois.',
            shortDesc: 'Empreintes de Valérie sur la bouteille',
            location: 'cave_vin',
            category: 'forensic'
        }
    ],

    locations: [
        {
            id: 'hall_hotel',
            name: 'Hall de l\'Hôtel',
            icon: '🏔️',
            scene: 'hotel_hall',
            description: 'Le grand hall de l\'Hôtel des Brumes, avec vue sur les montagnes enneigées.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_reception',
                    label: 'Réception',
                    x: 40, y: 40, width: 20, height: 15,
                    type: 'object',
                    examineText: 'Le registre de la réception. Quatre clients cette semaine : Arnaud (suite 1), Amélie Chartier (chambre 3), et deux couples partis hier matin.',
                    unlockLocation: 'suite_arnaud'
                },
                {
                    id: 'hs_garage',
                    label: 'Accès garage',
                    x: 8, y: 55, width: 15, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le garage de l\'hôtel. Des véhicules de service, du matériel d\'entretien...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un bidon d\'antigel. Récemment ouvert. Et... des traces de liquide rouge sur le bouchon. Du vin ?! Quelqu\'un a mélangé de l\'antigel au vin.',
                                action: { addClue: 'antigel_garage' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_valérie_hall',
                    label: 'Valérie Dubois',
                    x: 70, y: 30, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Valérie Dubois', portrait: '👩‍💻',
                                text: 'Inspecteur, quelle catastrophe pour l\'hôtel... Un décès dans notre établissement. La presse va nous massacrer.',
                                action: { addSuspect: 'gerante' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous vous souciez de la réputation avant la victime ?'
                            },
                            {
                                speaker: 'Valérie Dubois', portrait: '👩‍💻',
                                text: 'Non ! Bien sûr que non. C\'est terrible pour M. Arnaud. Mais... cet hôtel est toute ma vie.',
                                choices: [
                                    {
                                        text: '🔍 La critique d\'Arnaud vous inquiétait ?',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Vous étiez où hier soir ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Je reviendrai.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Valérie Dubois', portrait: '👩‍💻',
                                text: 'Évidemment ! La dernière fois, il nous a fait perdre une étoile. Si ça se reproduisait... c\'était fini. L\'hôtel aurait fermé.',
                                action: { setFlag: 'valerie_motive', journal: 'Valérie admet que la critique d\'Arnaud menaçait la survie de l\'hôtel.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un mobile financier puissant. L\'hôtel était au bord de la faillite.)',
                            },
                            {
                                speaker: 'Valérie Dubois', portrait: '👩‍💻',
                                text: 'Dans mon bureau, à faire les comptes. Jusqu\'à minuit environ. Puis je suis montée me coucher.',
                                action: { journal: 'Valérie dit être restée dans son bureau jusqu\'à minuit.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Son bureau est au rez-de-chaussée, à côté de la cave à vin. Elle avait facilement accès.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'suite_arnaud',
            name: 'Suite d\'Arnaud',
            icon: '🛏️',
            scene: 'hotel_suite',
            description: 'La suite luxueuse où le critique a été retrouvé mort.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_verre',
                    label: 'Verre sur la table de nuit',
                    x: 25, y: 35, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un verre de vin rouge à moitié bu sur la table de nuit. Un grand cru, visiblement.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'analyse rapide confirme : du vin mélangé à de l\'éthylène glycol — de l\'antigel. Le goût sucré de l\'antigel se fond dans le vin.',
                                action: { addClue: 'verre_vin' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_carnet_notes',
                    label: 'Carnet de notes',
                    x: 60, y: 40, width: 12, height: 10,
                    type: 'object',
                    examineText: 'Le carnet de critiques d\'Arnaud. Sa dernière note : "Le dîner est remarquable. Bertrand a progressé. 2 étoiles méritées." Il allait donner une bonne critique !'
                },
                {
                    id: 'hs_corps_arnaud',
                    label: 'Examiner le corps',
                    x: 20, y: 48, width: 35, height: 20,
                    type: 'object',
                    examineText: 'Jean-Pierre Arnaud, 58 ans. Décédé dans son sommeil. Signes d\'empoisonnement à l\'éthylène glycol : insuffisance rénale aiguë.'
                }
            ]
        },
        {
            id: 'cuisine_hotel',
            name: 'Cuisine de l\'Hôtel',
            icon: '🍳',
            scene: 'hotel_kitchen',
            description: 'La cuisine professionnelle du restaurant étoilé.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_chef',
                    label: 'Bertrand Leclerc',
                    x: 40, y: 25, width: 15, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Bertrand Leclerc', portrait: '👨‍🍳',
                                text: 'Arnaud est mort ? Mon Dieu... Le dîner que je lui ai préparé hier soir était un chef-d\'œuvre. Il ne l\'aura jamais publié.',
                                action: { addSuspect: 'chef_bertrand' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Sa dernière critique vous avait coûté une étoile. Vous lui en vouliez ?'
                            },
                            {
                                speaker: 'Bertrand Leclerc', portrait: '👨‍🍳',
                                text: 'Évidemment que ça m\'a blessé ! Mais j\'ai travaillé dur pour regagner cette étoile. Ce dîner devait tout changer.',
                                choices: [
                                    {
                                        text: '📧 "Je le détruirai" — cet e-mail, c\'est de vous ?',
                                        condition: { hasClue: 'mail_menace_chef' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Qui a servi le vin à Arnaud ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci chef.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Bertrand Leclerc', portrait: '👨‍🍳',
                                text: '*rougit* Un moment de colère ! Je ne pensais pas à le tuer, bon sang. "Détruire" un critique, c\'est le convaincre par la cuisine, pas par le poison !',
                                action: { setFlag: 'chef_explains_email', journal: 'Le chef explique son e-mail menaçant comme un accès de colère.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Sa colère semblait dirigée vers la cuisine, pas vers la violence.)',
                            },
                            {
                                speaker: 'Bertrand Leclerc', portrait: '👨‍🍳',
                                text: 'C\'est Nicolas, le sommelier. Il a choisi la bouteille lui-même — un Romanée-Conti 2005. Le vin a été servi à table puis Arnaud a emporté son verre dans sa suite.',
                                action: { journal: 'Nicolas a choisi et servi le vin. Arnaud a monté le verre dans sa suite.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le vin a pu être empoisonné à la cave avant le service, ou entre le repas et le coucher d\'Arnaud.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_pc_cuisine',
                    label: 'Ordinateur de la cuisine',
                    x: 70, y: 35, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'ordinateur de la cuisine. Les e-mails du chef sont accessibles...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un message envoyé il y a 2 semaines : "Si Arnaud publie encore une critique négative, je le détruirai." Adressé à un ami chef.',
                                action: { addClue: 'mail_menace_chef' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cave_vin',
            name: 'Cave à Vin',
            icon: '🍷',
            scene: 'hotel_cave',
            description: 'La cave à vin voûtée de l\'hôtel. Des centaines de bouteilles.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_bouteille',
                    label: 'Emplacement du Romanée-Conti',
                    x: 30, y: 30, width: 20, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'emplacement du Romanée-Conti 2005 est vide. Mais une seconde bouteille identique est ouverte à côté...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le bouchon a été retiré puis remis. Le vin à l\'intérieur a une légère odeur sucrée. Quelqu\'un a ouvert cette bouteille pour y ajouter le poison.',
                                action: { addClue: 'bouteille_cave' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_registre_cave',
                    label: 'Registre d\'accès',
                    x: 10, y: 50, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le registre numérique de la cave. Chaque accès est enregistré par badge...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Nicolas est descendu à 21h45 pour choisir le vin du dîner. Valérie est descendue à 22h30. Seuls ces deux personnes ont le code.',
                                action: { addClue: 'registre_cave' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_empreintes_bouteille',
                    label: 'Empreintes sur la bouteille',
                    x: 35, y: 45, width: 12, height: 10,
                    type: 'object',
                    condition: { hasClue: 'bouteille_cave' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Je relève les empreintes sur la bouteille ouverte...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Celles de Nicolas — normal, c\'est le sommelier. Mais aussi celles de Valérie Dubois ! Que faisait la gérante avec cette bouteille ?',
                                action: { addClue: 'empreintes_bouteille' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_nicolas',
                    label: 'Nicolas Ferrand',
                    x: 65, y: 25, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Nicolas Ferrand', portrait: '🧑‍🍳',
                                text: 'Inspecteur... Jean-Pierre est vraiment mort ? C\'est... je ne peux pas y croire.',
                                action: { addSuspect: 'sommelier' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous semblez particulièrement affecté, Nicolas.'
                            },
                            {
                                speaker: 'Nicolas Ferrand', portrait: '🧑‍🍳',
                                text: 'Jean-Pierre et moi... nous étions proches. Plus que proches. Mais il a rompu il y a un mois.',
                                choices: [
                                    {
                                        text: '🍷 C\'est vous qui avez choisi le vin. La bouteille a été trafiquée.',
                                        condition: { hasClue: 'bouteille_cave' },
                                        goto: 3
                                    },
                                    {
                                        text: '⏰ Le registre montre que vous êtes descendu à 21h45.',
                                        condition: { hasClue: 'registre_cave' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Je suis désolé pour votre perte.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Nicolas Ferrand', portrait: '🧑‍🍳',
                                text: 'Trafiquée ?! Mais la bouteille était parfaitement scellée quand je l\'ai prise ! Quelqu\'un a dû intervenir après moi.',
                                action: { setFlag: 'nicolas_innocent_wine', journal: 'Nicolas affirme que la bouteille était intacte quand il l\'a choisie.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Si Nicolas dit vrai, le poison a été ajouté après 21h45. Le registre montre Valérie à 22h30...)',
                            },
                            {
                                speaker: 'Nicolas Ferrand', portrait: '🧑‍🍳',
                                text: 'Oui, à 21h45 pour choisir le vin du dîner. J\'ai remonté la bouteille directement en salle. C\'est tout.',
                                action: { journal: 'Nicolas a choisi le vin à 21h45 et l\'a monté en salle.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Mais une seconde bouteille identique a été ouverte. Quelqu\'un est redescendu pour préparer le poison dans une seconde bouteille.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'bureau_hotel',
            name: 'Bureau de la Gérante',
            icon: '📋',
            scene: 'hotel_office',
            description: 'Le bureau de Valérie Dubois, encombré de dossiers financiers.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_article_encadre',
                    label: 'Article encadré au mur',
                    x: 50, y: 10, width: 18, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un article de presse encadré. La critique dévastatrice d\'Arnaud d\'il y a 6 mois : "Un restaurant qui s\'est perdu en chemin."'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Valérie a encadré cette critique comme un rappel. L\'étoile perdue, les clients qui partent... un motif puissant.',
                                action: { addClue: 'critique_precedente' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_tiroir_bureau',
                    label: 'Tiroir du bureau',
                    x: 25, y: 50, width: 20, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le tiroir du bureau... des factures impayées, des rappels de la banque. L\'hôtel est au bord du gouffre.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Et au fond du tiroir, une paire de gants en cuir. Avec des taches de vin rouge encore humides. Valérie ne boit pas de vin...',
                                action: { addClue: 'gants_valérie' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'chambre_amelie',
            name: 'Chambre d\'Amélie',
            icon: '🔑',
            scene: 'hotel_room',
            description: 'La chambre de la mystérieuse Amélie Chartier.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_amelie',
                    label: 'Amélie Chartier',
                    x: 35, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Amélie Chartier', portrait: '👩',
                                text: 'Inspecteur... j\'ai à peine croisé cet homme au dîner. Je suis ici pour écrire mon prochain roman, rien de plus.',
                                action: { addSuspect: 'cliente' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous êtes arrivée sans réservation la veille de la mort d\'Arnaud. Étrange coïncidence.'
                            },
                            {
                                speaker: 'Amélie Chartier', portrait: '👩',
                                text: 'J\'avais besoin d\'isolement. La montagne m\'inspire. C\'est tout.',
                                choices: [
                                    {
                                        text: '🪪 Votre identité est fausse. Vous êtes Amélie Arnaud.',
                                        condition: { hasClue: 'faux_nom_amelie' },
                                        goto: 3
                                    },
                                    {
                                        text: '📄 Vous touchez 2 millions à la mort de votre ex-mari.',
                                        condition: { hasClue: 'assurance_vie_amelie' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ D\'accord.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Amélie Chartier', portrait: '👩',
                                text: '*choc* Comment avez-vous... Oui. Jean-Pierre était mon ex-mari. Mais je ne l\'ai pas tué ! Je voulais juste le voir une dernière fois.',
                                action: { setFlag: 'amelie_unmasked', journal: 'Amélie est en réalité l\'ex-femme de la victime, venue incognito.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Elle s\'est déplacée sous un faux nom pour voir son ex-mari. Suspect mais pas forcément coupable.)',
                            },
                            {
                                speaker: 'Amélie Chartier', portrait: '👩',
                                text: 'L\'assurance ? Je ne savais même pas qu\'elle n\'avait pas été annulée ! C\'est Jean-Pierre qui l\'avait souscrite pendant notre mariage.',
                                action: { setFlag: 'amelie_assurance', journal: 'Amélie prétend ignorer que l\'assurance vie était encore active.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(2 millions de mobile, mais elle n\'avait pas accès à la cave ni à l\'antigel. Ses empreintes ne sont nulle part.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_valise_amelie',
                    label: 'Valise d\'Amélie',
                    x: 60, y: 45, width: 18, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La valise d\'Amélie. Des vêtements, un carnet vide... et des documents cachés dans la doublure.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une carte d\'identité au nom d\'Amélie Arnaud ! Et une police d\'assurance vie de 2 millions d\'euros sur la tête de Jean-Pierre Arnaud.',
                                action: { addClue: 'faux_nom_amelie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'assurance vie n\'a jamais été annulée après le divorce. Amélie touche 2 millions si son ex-mari meurt.',
                                action: { addClue: 'assurance_vie_amelie' }
                            }
                        ]
                    }
                }
            ]
        }
    ],

    solution: {
        culprit: 'gerante',
        keyEvidence: ['verre_vin', 'antigel_garage', 'registre_cave', 'gants_valérie', 'empreintes_bouteille'],

        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Valérie Dubois est démasquée. Le registre de la cave prouve qu'elle y est descendue à 22h30 — après Nicolas. Elle a ouvert une seconde bouteille de Romanée-Conti et y a versé l'antigel du garage. 

Ses empreintes sur la bouteille et les gants tachés de vin prouvent sa manipulation. Elle a ensuite fait livrer cette bouteille en chambre "en complément du dîner" par le service d'étage.

L'ironie tragique : le carnet d'Arnaud montre qu'il allait donner une excellente critique. L'hôtel aurait retrouvé son étoile. Valérie a tué la seule personne qui allait sauver son établissement.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez correctement identifié Valérie Dubois, mais certaines preuves clés manquent au dossier. 

L'enquête aboutit, mais la peine pourrait être réduite par manque de preuves matérielles. Néanmoins, justice est rendue pour Jean-Pierre Arnaud.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Mauvais suspect ! Valérie Dubois profite de la confusion pour détruire les preuves. Elle lave les gants, efface le registre de la cave et fait disparaître le bidon d'antigel.

Le meurtre de Jean-Pierre Arnaud restera un mystère. L'Hôtel des Brumes gardera son secret le plus sombre.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur, un décès suspect au Grand Hôtel des Brumes dans les Alpes. Un critique gastronomique, Jean-Pierre Arnaud.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Empoisonnement probable. La route est coupée par la neige. Personne ne peut quitter l\'hôtel.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Un huis clos en montagne. Qui était présent à l\'hôtel ?'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le chef Bertrand Leclerc, la gérante Valérie Dubois, le sommelier Nicolas Ferrand, et une cliente mystérieuse, Amélie Chartier.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Arnaud avait dîné au restaurant de l\'hôtel hier soir. Il est monté dans sa suite avec un verre de vin vers 23h. On l\'a retrouvé mort ce matin.',
                action: {
                    journal: 'Jean-Pierre Arnaud, critique gastronomique, empoisonné à l\'Hôtel des Brumes. Suspects : Bertrand (chef), Valérie (gérante), Nicolas (sommelier), Amélie (cliente).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Examinons le vin, la cuisine, et chacun de ces quatre suspects.',
                action: (state) => {
                    state.unlockLocation('cuisine_hotel');
                    state.unlockLocation('cave_vin');
                    state.unlockLocation('bureau_hotel');
                    state.unlockLocation('chambre_amelie');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};

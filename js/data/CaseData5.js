/**
 * CaseData5.js — "Le Train de Minuit"
 * Un passager est retrouvé mort dans le wagon-lit d'un train de nuit Paris-Nice.
 */
window.CASE_DATA_5 = {
    id: 'case_5',
    title: 'Le Train de Minuit',
    subtitle: 'Meurtre dans le wagon-lit',
    difficulty: '⭐⭐',
    intro: `Un homme d'affaires, Marc Fontaine, est retrouvé mort dans sa cabine du train de nuit Paris-Nice. 
La porte était verrouillée de l'intérieur. Le contrôleur a forcé la porte après l'absence de réponse au petit matin.
Trois passagers occupaient les cabines adjacentes. Le train roulait sans arrêt entre 23h et 6h du matin.`,

    suspects: [
        {
            id: 'isabelle',
            name: 'Isabelle Renoir',
            role: 'Femme d\'affaires',
            emoji: '👩‍💼',
            description: 'Directrice d\'une entreprise concurrente de Fontaine. Elle a perdu un procès majeur contre lui il y a 3 mois.',
            alibi: 'Dit avoir pris un somnifère et dormi toute la nuit.'
        },
        {
            id: 'paul',
            name: 'Paul Mercier',
            role: 'Ancien employé',
            emoji: '👨‍🔧',
            description: 'Ex-ingénieur licencié par Fontaine il y a 6 mois. Voyage vers Nice pour "un nouveau départ".',
            alibi: 'Affirme avoir lu jusqu\'à 1h du matin puis s\'être endormi.'
        },
        {
            id: 'elena',
            name: 'Elena Vasquez',
            role: 'Journaliste',
            emoji: '👩‍🦱',
            description: 'Journaliste d\'investigation qui enquêtait sur les pratiques douteuses de l\'entreprise de Fontaine.',
            alibi: 'Assure avoir travaillé sur son ordinateur portable toute la soirée.'
        },
        {
            id: 'controleur',
            name: 'Henri Blanc',
            role: 'Contrôleur du train',
            emoji: '🧑‍✈️',
            description: 'Contrôleur de nuit depuis 20 ans. Possède le passe-partout de toutes les cabines.',
            alibi: 'Dit avoir fait sa ronde à 23h puis s\'être reposé dans le wagon-restaurant.'
        }
    ],

    clues: [
        {
            id: 'seringue',
            name: 'Seringue dissimulée',
            description: 'Une seringue usagée trouvée dans la poubelle du couloir, entre les cabines. Traces d\'un puissant sédatif.',
            shortDesc: 'Seringue avec sédatif',
            location: 'wagon_couloir',
            category: 'physical'
        },
        {
            id: 'passe_vole',
            name: 'Passe-partout manquant',
            description: 'Le contrôleur signale qu\'un double du passe-partout a disparu de son casier la veille du voyage.',
            shortDesc: 'Double du passe-partout volé',
            location: 'wagon_restaurant',
            category: 'testimony'
        },
        {
            id: 'article_fontaine',
            name: 'Article non publié',
            description: 'Un dossier sur l\'ordinateur d\'Elena : un article explosif révélant que Fontaine avait détourné 5 millions d\'euros.',
            shortDesc: 'Article accusateur sur Fontaine',
            location: 'cabine_elena',
            category: 'document'
        },
        {
            id: 'lettre_licenciement',
            name: 'Lettre de licenciement',
            description: 'Dans le sac de Paul, une lettre de licenciement abusif signée par Fontaine. Des annotations rageuses dans la marge.',
            shortDesc: 'Lettre de licenciement annotée',
            location: 'cabine_paul',
            category: 'document'
        },
        {
            id: 'fibre_rouge',
            name: 'Fibre textile rouge',
            description: 'Une fibre rouge retrouvée sous les ongles de la victime. Provient d\'un tissu en laine de qualité.',
            shortDesc: 'Fibre rouge sous les ongles',
            location: 'cabine_fontaine',
            category: 'forensic'
        },
        {
            id: 'echarpe_isabelle',
            name: 'Écharpe rouge d\'Isabelle',
            description: 'Isabelle porte une écharpe en laine rouge. La fibre trouvée sous les ongles de la victime correspond au même tissu.',
            shortDesc: 'Écharpe rouge correspondante',
            location: 'cabine_isabelle',
            category: 'physical'
        },
        {
            id: 'camera_couloir',
            name: 'Vidéo de surveillance',
            description: 'La caméra du couloir montre une silhouette sortir de la cabine de Fontaine à 2h14 du matin. La personne porte un foulard sur le visage.',
            shortDesc: 'Silhouette filmée à 2h14',
            location: 'wagon_couloir',
            category: 'forensic'
        },
        {
            id: 'somnifere_isabelle',
            name: 'Boîte de somnifères',
            description: 'Une boîte de somnifères dans le sac d\'Isabelle. Même molécule que celle trouvée dans la seringue. Il manque deux comprimés.',
            shortDesc: 'Somnifères identiques au sédatif',
            location: 'cabine_isabelle',
            category: 'physical'
        },
        {
            id: 'empreintes_porte',
            name: 'Empreintes sur la porte',
            description: 'Les empreintes sur la poignée intérieure de la cabine de Fontaine : celles de la victime ET celles d\'Isabelle Renoir.',
            shortDesc: 'Empreintes d\'Isabelle dans la cabine',
            location: 'cabine_fontaine',
            category: 'forensic'
        },
        {
            id: 'mobile_isabelle',
            name: 'SMS supprimé',
            description: 'Un SMS supprimé récupéré du téléphone d\'Isabelle : "Il ne pourra plus faire de mal à personne après ce voyage." Envoyé la veille du départ.',
            shortDesc: 'SMS menaçant d\'Isabelle',
            location: 'cabine_isabelle',
            category: 'document'
        }
    ],

    locations: [
        {
            id: 'wagon_couloir',
            name: 'Couloir du Wagon-lit',
            icon: '🚂',
            scene: 'train_corridor',
            description: 'Le couloir étroit du wagon-lit. Les cabines sont alignées des deux côtés.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_poubelle_couloir',
                    label: 'Poubelle du couloir',
                    x: 10, y: 55, width: 12, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une poubelle dans le couloir entre les cabines. Quelque chose brille au fond...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une seringue ! Dissimulée sous des mouchoirs. L\'aiguille a été utilisée récemment. Il faudra analyser le contenu.',
                                action: { addClue: 'seringue' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camera',
                    label: 'Caméra de surveillance',
                    x: 50, y: 8, width: 10, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une caméra de surveillance dans le couloir. Voyons les enregistrements de la nuit...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'À 2h14, une silhouette sort de la cabine de Fontaine. Le visage est couvert par un foulard, mais on distingue une carrure féminine et des cheveux auburn.',
                                action: { addClue: 'camera_couloir' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_cabine_fontaine',
                    label: 'Cabine de Fontaine',
                    x: 35, y: 30, width: 15, height: 25,
                    type: 'object',
                    examineText: 'La cabine de la victime. La porte a été forcée par le contrôleur ce matin. Il faut examiner l\'intérieur.',
                    unlockLocation: 'cabine_fontaine'
                },
                {
                    id: 'hs_controleur',
                    label: 'Henri Blanc',
                    x: 75, y: 25, width: 12, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Henri Blanc', portrait: '🧑‍✈️',
                                text: 'Inspecteur, c\'est terrible... en 20 ans de service, c\'est la première fois que ça arrive sur mon train.',
                                action: { addSuspect: 'controleur' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Racontez-moi votre soirée, Henri.'
                            },
                            {
                                speaker: 'Henri Blanc', portrait: '🧑‍✈️',
                                text: 'J\'ai fait ma ronde à 23h, contrôlé tous les billets. Tout était normal. Après, je suis allé au wagon-restaurant.',
                                choices: [
                                    {
                                        text: '🔑 Où était le passe-partout cette nuit ?',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Avez-vous vu quelqu\'un dans le couloir ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci Henri.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Henri Blanc', portrait: '🧑‍✈️',
                                text: 'Le passe... Justement, je voulais vous en parler. Mon double a disparu hier. Je l\'avais rangé dans mon casier au dépôt, mais il n\'y était plus.',
                                action: { addClue: 'passe_vole', journal: 'Un double du passe-partout a disparu du casier du contrôleur.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Quelqu\'un a volé le passe pour entrer dans la cabine verrouillée de Fontaine. Un acte prémédité.)',
                            },
                            {
                                speaker: 'Henri Blanc', portrait: '🧑‍✈️',
                                text: 'Non, personne. Après la ronde, le couloir était désert. Mais je suis parti au wagon-restaurant peu après minuit.',
                                action: { journal: 'Le contrôleur n\'a rien vu d\'anormal. Le couloir était sans surveillance après minuit.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le crime a eu lieu entre minuit et 6h. Le contrôleur ne surveillait plus le couloir.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cabine_fontaine',
            name: 'Cabine de Fontaine',
            icon: '🚪',
            scene: 'train_cabin',
            description: 'La cabine de la victime. Le corps a été découvert ici.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_corps',
                    label: 'Examiner le corps',
                    x: 20, y: 35, width: 40, height: 30,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Marc Fontaine, la cinquantaine. Allongé sur la couchette. Aucune marque de violence visible.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une petite trace de piqûre au cou. On l\'a endormi avec un sédatif injecté... puis étouffé pendant son sommeil.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Sous ses ongles... une fibre textile rouge. Il a essayé de se débattre avant de succomber au sédatif.',
                                action: { addClue: 'fibre_rouge' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_porte_interieur',
                    label: 'Poignée de porte',
                    x: 5, y: 30, width: 10, height: 20,
                    type: 'object',
                    condition: { hasClue: 'fibre_rouge' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Je peux relever les empreintes sur la poignée intérieure...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Deux jeux d\'empreintes ! Celles de Fontaine, bien sûr, et... un second jeu. Il faudra les comparer aux passagers.',
                                action: { addClue: 'empreintes_porte' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_valise',
                    label: 'Valise de Fontaine',
                    x: 65, y: 50, width: 20, height: 15,
                    type: 'object',
                    examineText: 'La valise de Fontaine. Des vêtements soignés, un dossier de réunion pour Nice. Rien de suspect à première vue.'
                }
            ]
        },
        {
            id: 'cabine_isabelle',
            name: 'Cabine d\'Isabelle',
            icon: '🧳',
            scene: 'train_cabin',
            description: 'La cabine d\'Isabelle Renoir, voisine de celle de Fontaine.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_sac_isabelle',
                    label: 'Sac de voyage',
                    x: 55, y: 45, width: 20, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le sac d\'Isabelle. Des affaires de luxe, un nécessaire de toilette... et une boîte de médicaments.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des somnifères — Zolpidem. La même molécule que le sédatif de la seringue ! Et il manque deux comprimés à la plaquette.',
                                action: { addClue: 'somnifere_isabelle' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_echarpe',
                    label: 'Écharpe sur le siège',
                    x: 15, y: 30, width: 18, height: 15,
                    type: 'object',
                    condition: { hasClue: 'fibre_rouge' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une écharpe en laine rouge posée sur le siège. La couleur et la texture correspondent exactement à la fibre trouvée sous les ongles de Fontaine.',
                                action: { addClue: 'echarpe_isabelle' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Fontaine s\'est agrippé à cette écharpe en se débattant. Isabelle portait cette écharpe quand elle l\'a attaqué.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_isabelle',
                    label: 'Isabelle Renoir',
                    x: 35, y: 20, width: 15, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Isabelle Renoir', portrait: '👩‍💼',
                                text: 'Inspecteur. Quelle tragédie. Je ne connaissais pas bien M. Fontaine... juste de réputation.',
                                action: { addSuspect: 'isabelle' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Votre entreprise a perdu un procès contre lui récemment, n\'est-ce pas ?'
                            },
                            {
                                speaker: 'Isabelle Renoir', portrait: '👩‍💼',
                                text: 'Un différend commercial, rien de personnel. Les affaires sont les affaires.',
                                choices: [
                                    {
                                        text: '🧣 Cette écharpe rouge est à vous ?',
                                        condition: { hasClue: 'echarpe_isabelle' },
                                        goto: 3
                                    },
                                    {
                                        text: '💊 Vous prenez des somnifères ?',
                                        condition: { hasClue: 'somnifere_isabelle' },
                                        goto: 5
                                    },
                                    {
                                        text: '📱 Ce SMS est plutôt explicite...',
                                        condition: { hasClue: 'mobile_isabelle' },
                                        goto: 7
                                    },
                                    {
                                        text: '✋ Merci, Madame Renoir.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Isabelle Renoir', portrait: '👩‍💼',
                                text: '*touche instinctivement son cou* Mon écharpe ? Oui, c\'est la mienne. Pourquoi ?',
                                action: { setFlag: 'isabelle_echarpe' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Parce que des fibres identiques à cette écharpe ont été trouvées sous les ongles de la victime.',
                                action: { journal: 'Isabelle confirme que l\'écharpe rouge est la sienne. Les fibres correspondent.' }
                            },
                            {
                                speaker: 'Isabelle Renoir', portrait: '👩‍💼',
                                text: 'Les somnifères ? J\'ai des insomnies chroniques. Je voyage beaucoup et j\'ai besoin de dormir. C\'est parfaitement légal.',
                                action: { setFlag: 'isabelle_somniferes' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La même molécule que dans la seringue. Et deux comprimés manquent... pile de quoi préparer une injection.)',
                                action: { journal: 'Les somnifères d\'Isabelle correspondent au sédatif de la seringue.' }
                            },
                            {
                                speaker: 'Isabelle Renoir', portrait: '👩‍💼',
                                text: '*pâlit* Ce message... c\'est sorti de son contexte ! Je parlais du procès en appel. On allait gagner cette fois.',
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Il ne pourra plus faire de mal après ce voyage." C\'est assez clair, Madame Renoir.',
                                action: { setFlag: 'isabelle_confronted_sms', journal: 'Isabelle tente d\'expliquer son SMS menaçant par le procès.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_telephone_isabelle',
                    label: 'Téléphone d\'Isabelle',
                    x: 70, y: 25, width: 10, height: 10,
                    type: 'object',
                    condition: { hasClue: 'camera_couloir' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Avec l\'autorisation du juge, vérifions le téléphone d\'Isabelle... Des messages supprimés récupérables.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Il ne pourra plus faire de mal à personne après ce voyage." Envoyé à un contact nommé "L.A." la veille du départ.',
                                action: { addClue: 'mobile_isabelle' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cabine_paul',
            name: 'Cabine de Paul',
            icon: '🛏️',
            scene: 'train_cabin',
            description: 'La cabine de Paul Mercier, en face de celle de Fontaine.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_sac_paul',
                    label: 'Sac à dos',
                    x: 50, y: 40, width: 18, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un sac à dos modeste. Des vêtements simples... et une lettre froissée au fond.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une lettre de licenciement. Signée Marc Fontaine. Les marges sont couvertes de notes rageuses : "Injuste", "Il paiera"...',
                                action: { addClue: 'lettre_licenciement' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_paul',
                    label: 'Paul Mercier',
                    x: 25, y: 20, width: 15, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Paul Mercier', portrait: '👨‍🔧',
                                text: 'Fontaine est mort ? Je... je ne sais pas quoi dire. Je ne l\'aimais pas, c\'est vrai, mais...',
                                action: { addSuspect: 'paul' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous avez été licencié par Fontaine. Ça a dû être difficile.'
                            },
                            {
                                speaker: 'Paul Mercier', portrait: '👨‍🔧',
                                text: 'Licencié après 12 ans de service ! Sans indemnités, rien. Cet homme détruisait des vies.',
                                choices: [
                                    {
                                        text: '📝 "Il paiera" — ces annotations sur votre lettre...',
                                        condition: { hasClue: 'lettre_licenciement' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Que faisiez-vous cette nuit entre minuit et 6h ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ C\'est noté, merci.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Paul Mercier', portrait: '👨‍🔧',
                                text: '*s\'énerve* Oui, j\'étais en colère ! Mais "il paiera" c\'est au tribunal, pas... pas comme ça. J\'ai un dossier aux prud\'hommes.',
                                action: { setFlag: 'paul_anger', journal: 'Paul admet sa colère mais invoque un recours légal en cours.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Sa colère semble sincère mais désordonnée. Ce crime était prémédité et méthodique.)',
                            },
                            {
                                speaker: 'Paul Mercier', portrait: '👨‍🔧',
                                text: 'Je lisais un roman. Vers 1h du matin j\'ai éteint et j\'ai dormi. Je n\'ai rien entendu.',
                                action: { journal: 'Paul dit avoir dormi à partir de 1h. Pas de témoin.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Pas d\'alibi vérifiable après minuit. Mais il n\'avait pas accès au passe-partout ni aux somnifères.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cabine_elena',
            name: 'Cabine d\'Elena',
            icon: '💻',
            scene: 'train_cabin',
            description: 'La cabine d\'Elena Vasquez, la journaliste.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_laptop',
                    label: 'Ordinateur portable',
                    x: 30, y: 35, width: 20, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'ordinateur d\'Elena est encore ouvert. Un article en cours de rédaction...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Scandale Fontaine Industries : détournement de 5 millions d\'euros." L\'article devait être publié lundi. Elena avait un mobile journalistique, pas criminel.',
                                action: { addClue: 'article_fontaine' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Avec Fontaine mort, l\'article perd sa cible. Elena avait intérêt à ce qu\'il reste en vie pour le scandale.)',
                                action: { journal: 'L\'article d\'Elena sur Fontaine perdait son impact avec la mort de ce dernier.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_elena',
                    label: 'Elena Vasquez',
                    x: 60, y: 20, width: 15, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Elena Vasquez', portrait: '👩‍🦱',
                                text: 'Inspecteur. La mort de Fontaine est un coup dur pour mon enquête journalistique. J\'avais besoin de lui vivant.',
                                action: { addSuspect: 'elena' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous enquêtiez sur lui. Vous le suiviez dans ce train ?'
                            },
                            {
                                speaker: 'Elena Vasquez', portrait: '👩‍🦱',
                                text: 'Oui, je l\'admets. Il avait une réunion à Nice avec des investisseurs. Je voulais des photos, des preuves supplémentaires.',
                                choices: [
                                    {
                                        text: '🤔 Avez-vous vu ou entendu quelque chose cette nuit ?',
                                        goto: 3
                                    },
                                    {
                                        text: '📰 Votre article aurait détruit sa carrière...',
                                        condition: { hasClue: 'article_fontaine' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Je vous laisse.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Elena Vasquez', portrait: '👩‍🦱',
                                text: 'J\'ai travaillé sur mon article jusqu\'à 2h environ. Vers 2h, j\'ai entendu un léger bruit dans le couloir. Je n\'y ai pas prêté attention.',
                                action: { journal: 'Elena a entendu un bruit dans le couloir vers 2h du matin.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(2h du matin... la caméra montre la silhouette sortir à 2h14. Elena a peut-être entendu le meurtrier.)',
                            },
                            {
                                speaker: 'Elena Vasquez', portrait: '👩‍🦱',
                                text: 'Exactement ! Pourquoi tuerais-je ma meilleure source ? Cet article aurait fait ma carrière. Maintenant je dois tout réécrire.',
                                action: { setFlag: 'elena_motive_inverse', journal: 'Elena avait intérêt à garder Fontaine en vie pour son article.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Son raisonnement se tient. Elle profitait plus de Fontaine vivant que mort.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'wagon_restaurant',
            name: 'Wagon-Restaurant',
            icon: '🍽️',
            scene: 'train_restaurant',
            description: 'Le wagon-restaurant, désert à cette heure.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_casier_controleur',
                    label: 'Casier du contrôleur',
                    x: 70, y: 25, width: 15, height: 25,
                    type: 'object',
                    examineText: 'Le casier du contrôleur. Le compartiment où le passe-partout double était rangé est vide. Pas de traces d\'effraction — quelqu\'un qui connaissait l\'emplacement.',
                    action: { journal: 'Le casier du passe n\'a pas été forcé. Le voleur savait où chercher.' }
                },
                {
                    id: 'hs_registre',
                    label: 'Registre des passagers',
                    x: 30, y: 40, width: 20, height: 12,
                    type: 'object',
                    examineText: 'Le registre montre que les quatre cabines du wagon 7 étaient réservées. Isabelle a réservé sa cabine 3 jours avant le départ — la même date que Fontaine.'
                }
            ]
        }
    ],

    solution: {
        culprit: 'isabelle',
        keyEvidence: ['seringue', 'somnifere_isabelle', 'echarpe_isabelle', 'empreintes_porte', 'mobile_isabelle'],

        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Isabelle Renoir est démasquée. Votre dossier est implacable : la fibre de son écharpe sous les ongles de la victime, ses empreintes dans la cabine, les somnifères identiques au sédatif de la seringue, et le SMS accablant.

Elle avait volé le passe-partout la veille au dépôt, où elle s'était rendue sous prétexte d'un objet perdu. Elle a injecté le sédatif à Fontaine endormi, puis l'a étouffé avec un oreiller. La fibre de son écharpe l'a trahie quand Fontaine a tenté de se débattre avant de sombrer.

Le procès perdu lui avait coûté son entreprise et sa fortune. Elle avait planifié cette vengeance dans les moindres détails — sauf qu'elle n'avait pas prévu la caméra du couloir, ni la résistance de sa victime.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous identifiez correctement Isabelle Renoir comme la meurtrière, mais votre dossier manque de certaines preuves cruciales.

Le procureur obtient une mise en examen, mais la défense trouve des failles. Isabelle négocie un accord pour une peine réduite.

La justice a été rendue, même si le dossier manquait de solidité.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Pendant que l'enquête piétine, Isabelle Renoir quitte le pays avec un faux passeport.

Les preuves étaient pourtant là : l'écharpe rouge, les somnifères, les empreintes dans la cabine, le passe-partout volé...

Le Train de Minuit restera une affaire non résolue.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur Morel, un meurtre dans le train de nuit Paris-Nice. Le corps a été découvert ce matin par le contrôleur.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'La victime est Marc Fontaine, homme d\'affaires. Retrouvé mort dans sa cabine verrouillée de l\'intérieur. Pas de blessure apparente.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Une cabine verrouillée de l\'intérieur... un mystère en chambre close.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Trois passagers dans les cabines voisines : Isabelle Renoir, Paul Mercier et Elena Vasquez. Plus le contrôleur Henri Blanc qui a le passe-partout.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le train n\'a fait aucun arrêt entre 23h et 6h. Le meurtrier est forcément à bord.',
                action: {
                    journal: 'Marc Fontaine retrouvé mort dans le train de nuit Paris-Nice. Cabine verrouillée. Suspects : Isabelle (rivale), Paul (ex-employé), Elena (journaliste), Henri (contrôleur).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Un huis clos parfait. Examinons les lieux et interrogeons tout le monde.',
                action: (state) => {
                    state.unlockLocation('cabine_fontaine');
                    state.unlockLocation('cabine_isabelle');
                    state.unlockLocation('cabine_paul');
                    state.unlockLocation('cabine_elena');
                    state.unlockLocation('wagon_restaurant');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};

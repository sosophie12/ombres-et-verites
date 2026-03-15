/**
 * CaseData7.js — "Le Cimetière des Navires"
 * Le capitaine d'un navire de croisière fluviale est retrouvé mort sur le pont.
 */
window.CASE_DATA_7 = {
    id: 'case_7',
    title: 'Le Cimetière des Navires',
    subtitle: 'Meurtre sur la péniche de luxe',
    difficulty: '⭐⭐⭐',
    intro: `Le capitaine Jacques Morvan est retrouvé mort sur le pont de la péniche de croisière "L'Étoile de Seine", 
amarrée dans un bras mort de la Seine. Poignardé en pleine nuit. 
Trois passagers et le mécanicien étaient à bord. La passerelle était relevée — personne ne pouvait quitter le bateau.`,

    suspects: [
        {
            id: 'marine',
            name: 'Marine Leroy',
            role: 'Passagère VIP',
            emoji: '👱‍♀️',
            description: 'Riche héritière, 30 ans. A réservé la croisière pour son anniversaire. Semblait très proche du capitaine pendant le voyage.',
            alibi: 'Dit s\'être endormie dans sa cabine après le champagne.'
        },
        {
            id: 'victor_h',
            name: 'Victor Hartmann',
            role: 'Historien naval',
            emoji: '🧓',
            description: 'Professeur d\'histoire maritime, 65 ans. Passionné par les épaves de la Seine. Embarqué pour ses recherches.',
            alibi: 'Affirme être resté dans le salon à étudier des cartes anciennes.'
        },
        {
            id: 'karim',
            name: 'Karim Benali',
            role: 'Mécanicien du bateau',
            emoji: '👨‍🔧',
            description: 'Mécanicien depuis 8 ans sur l\'Étoile de Seine. Fidèle au capitaine, mais des tensions récentes sur un salaire impayé.',
            alibi: 'Indique avoir fait sa ronde des machines vers minuit et s\'être couché.'
        },
        {
            id: 'anna',
            name: 'Anna Svensson',
            role: 'Photographe suédoise',
            emoji: '📸',
            description: 'Photographe de nature, 28 ans. Voyage seule le long de la Seine. Discrète, observe beaucoup, parle peu.',
            alibi: 'Prétend être montée sur le pont supérieur pour photographier les étoiles.'
        }
    ],

    clues: [
        {
            id: 'couteau_cuisine',
            name: 'Couteau de cuisine',
            description: 'L\'arme du crime : un couteau de la cuisine du bateau. Des empreintes partielles sur le manche, brouillées.',
            shortDesc: 'Couteau de cuisine ensanglanté',
            location: 'pont_principal',
            category: 'physical'
        },
        {
            id: 'journal_capitaine',
            name: 'Journal de bord secret',
            description: 'Un journal intime caché dans la cabine du capitaine. Il mentionne avoir découvert "un trésor dans les épaves" et craindre pour sa sécurité.',
            shortDesc: 'Journal révélant un trésor secret',
            location: 'cabine_capitaine',
            category: 'document'
        },
        {
            id: 'carte_annotee',
            name: 'Carte annotée',
            description: 'Une carte de la Seine annotée par Hartmann. L\'emplacement de "l\'épave du Normandie" est cerclé en rouge avec la mention "trésor confirmé".',
            shortDesc: 'Carte avec emplacement du trésor',
            location: 'salon_bateau',
            category: 'document'
        },
        {
            id: 'alliance_marine',
            name: 'Alliance du capitaine',
            description: 'L\'alliance du capitaine Morvan retrouvée dans la cabine de Marine. Gravée "J&M pour toujours".',
            shortDesc: 'Alliance du capitaine chez Marine',
            location: 'cabine_marine',
            category: 'physical'
        },
        {
            id: 'sang_chaussure',
            name: 'Traces de sang sur chaussure',
            description: 'Des micro-traces de sang sur la semelle droite d\'une chaussure de Hartmann. Le sang correspond à celui du capitaine.',
            shortDesc: 'Sang du capitaine sur chaussure',
            location: 'salon_bateau',
            category: 'forensic'
        },
        {
            id: 'lettre_morvan',
            name: 'Lettre du capitaine',
            description: 'Une lettre non envoyée trouvée dans la cabine : "Professeur, je sais que vous avez découvert l\'emplacement du trésor. Je refuse de vous laisser piller ces épaves."',
            shortDesc: 'Accusation contre Hartmann',
            location: 'cabine_capitaine',
            category: 'document'
        },
        {
            id: 'photos_anna',
            name: 'Photos compromettantes',
            description: 'L\'appareil photo d\'Anna contient des photos de Hartmann sortant de la cabine du capitaine à 1h du matin, l\'air agité.',
            shortDesc: 'Hartmann filmé à 1h du matin',
            location: 'pont_superieur',
            category: 'forensic'
        },
        {
            id: 'fiches_paie',
            name: 'Fiches de paie impayées',
            description: 'Trois mois de salaire impayé pour Karim. Des messages véhéments envoyés au capitaine réclamant son dû.',
            shortDesc: 'Trois mois de salaire impayé',
            location: 'salle_machines',
            category: 'document'
        },
        {
            id: 'objet_epave',
            name: 'Montre ancienne',
            description: 'Une montre à gousset du XIXe siècle trouvée dans la valise de Hartmann. Provient de l\'épave du Normandie — vol de patrimoine sous-marin.',
            shortDesc: 'Objet pillé d\'une épave',
            location: 'salon_bateau',
            category: 'physical'
        },
        {
            id: 'temoignage_karim',
            name: 'Témoignage de Karim',
            description: 'Karim affirme avoir entendu une dispute entre le capitaine et Hartmann vers minuit : "Vous n\'avez pas le droit !" criait le capitaine.',
            shortDesc: 'Dispute entre capitaine et Hartmann',
            location: 'salle_machines',
            category: 'testimony'
        }
    ],

    locations: [
        {
            id: 'pont_principal',
            name: 'Pont Principal',
            icon: '🚢',
            scene: 'boat_deck',
            description: 'Le pont principal de l\'Étoile de Seine. Le corps a été trouvé ici.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_corps_capitaine',
                    label: 'Scène du crime',
                    x: 30, y: 40, width: 25, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le capitaine Morvan, 55 ans. Poignardé à la poitrine. L\'arme est encore sur place.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un couteau de cuisine du bateau. Les empreintes sont partiellement effacées — le meurtrier a essayé de les essuyer.',
                                action: { addClue: 'couteau_cuisine' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le corps est orienté vers la proue. Il regardait vers le fleuve quand il a été frappé par derrière.',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_passerelle',
                    label: 'Passerelle relevée',
                    x: 80, y: 45, width: 15, height: 15,
                    type: 'object',
                    examineText: 'La passerelle d\'accès au quai est relevée et verrouillée. Impossible de monter ou descendre du bateau pendant la nuit. Le meurtrier est toujours à bord.'
                },
                {
                    id: 'hs_acces_cabines',
                    label: 'Accès aux cabines',
                    x: 10, y: 55, width: 15, height: 12,
                    type: 'object',
                    examineText: 'L\'escalier descend vers les cabines et la salle des machines.',
                    unlockLocation: 'cabine_capitaine'
                }
            ]
        },
        {
            id: 'cabine_capitaine',
            name: 'Cabine du Capitaine',
            icon: '⚓',
            scene: 'boat_cabin',
            description: 'La cabine austère du capitaine Morvan.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_journal_cap',
                    label: 'Journal intime',
                    x: 35, y: 30, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un journal intime caché sous le matelas du capitaine...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"J\'ai découvert que Hartmann ne cherche pas juste à étudier les épaves. Il les pille. Des objets de valeur disparaissent à chaque plongée. Je dois l\'arrêter."',
                                action: { addClue: 'journal_capitaine' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_lettre_cap',
                    label: 'Lettre non envoyée',
                    x: 60, y: 35, width: 12, height: 10,
                    type: 'object',
                    condition: { hasClue: 'journal_capitaine' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une lettre dans l\'enveloppe, prête à être envoyée mais jamais postée...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Professeur Hartmann, je sais que vous pillez les épaves. Je refuse de vous laisser voler notre patrimoine. Si vous ne cessez pas, je préviens les autorités."',
                                action: { addClue: 'lettre_morvan' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le capitaine menaçait de dénoncer Hartmann. Un mobile de meurtre puissant.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'salon_bateau',
            name: 'Salon du Bateau',
            icon: '🛋️',
            scene: 'boat_lounge',
            description: 'Le salon élégant de la péniche, avec baies vitrées sur la Seine.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_cartes',
                    label: 'Table de cartes',
                    x: 40, y: 35, width: 20, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des cartes de la Seine sont étalées sur la table. Des annotations au stylo rouge...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'emplacement de "l\'épave du Normandie" est cerclé en rouge. "Trésor confirmé — estimation : 500 000€." — C\'est l\'écriture de Hartmann.',
                                action: { addClue: 'carte_annotee' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_hartmann',
                    label: 'Victor Hartmann',
                    x: 15, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Victor Hartmann', portrait: '🧓',
                                text: 'Le capitaine... assassiné. Quelle horreur. C\'était un marin remarquable, un vrai homme de la Seine.',
                                action: { addSuspect: 'victor_h' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Que faisiez-vous cette nuit, professeur ?'
                            },
                            {
                                speaker: 'Victor Hartmann', portrait: '🧓',
                                text: 'J\'étudiais mes cartes ici, dans le salon. L\'histoire des épaves de la Seine me passionne. Je suis monté me coucher vers 1h.',
                                choices: [
                                    {
                                        text: '🗺️ Cette carte mentionne un "trésor confirmé"...',
                                        condition: { hasClue: 'carte_annotee' },
                                        goto: 3
                                    },
                                    {
                                        text: '📝 Le capitaine savait que vous pilliez les épaves.',
                                        condition: { hasClue: 'lettre_morvan' },
                                        goto: 5
                                    },
                                    {
                                        text: '👟 Du sang sur votre chaussure, professeur.',
                                        condition: { hasClue: 'sang_chaussure' },
                                        goto: 7
                                    },
                                    {
                                        text: '✋ Merci professeur.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Victor Hartmann', portrait: '🧓',
                                text: '*nerveux* Le trésor ? C\'est une théorie académique. Des objets historiques, rien de plus. Je ne pille rien !',
                                action: { setFlag: 'hartmann_denies_treasure', journal: 'Hartmann nie tout pillage malgré ses annotations sur la carte.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(500 000€ de "théorie académique" ? Il ment.)',
                            },
                            {
                                speaker: 'Victor Hartmann', portrait: '🧓',
                                text: '*pâlit* Quoi ? Le capitaine... il n\'avait aucune preuve ! Ce sont mes recherches légitimes, pas du pillage !',
                                action: { setFlag: 'hartmann_confronted', journal: 'Hartmann panique quand on mentionne la lettre du capitaine.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Morvan allait le dénoncer. Hartmann avait un mobile très puissant pour le réduire au silence.)',
                            },
                            {
                                speaker: 'Victor Hartmann', portrait: '🧓',
                                text: 'Du sang ?! C\'est impossible ! J\'ai dû... marcher sur le pont ce matin quand on a découvert le corps. C\'est tout !',
                                action: { setFlag: 'hartmann_blood_excuse' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le pont a été nettoyé avant l\'arrivée des passagers ce matin. Le sang date de la nuit.)',
                                action: { journal: 'Hartmann ne peut expliquer le sang du capitaine sur sa chaussure.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_valise_hartmann',
                    label: 'Valise de Hartmann',
                    x: 5, y: 50, width: 15, height: 15,
                    type: 'object',
                    condition: { hasClue: 'carte_annotee' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La valise de Hartmann... des livres d\'histoire, des carnets... et un objet enveloppé dans du tissu.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une montre à gousset du XIXe siècle. Gravée "Compagnie du Normandie — 1876". C\'est un objet pillé de l\'épave !',
                                action: { addClue: 'objet_epave' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_chaussures',
                    label: 'Chaussures sous la table',
                    x: 20, y: 60, width: 12, height: 8,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des chaussures sous la table. Elles appartiennent à Hartmann — il marche en chaussettes à l\'intérieur.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des micro-traces de sang sur la semelle droite ! On dirait qu\'il a marché dans une flaque de sang frais.',
                                action: { addClue: 'sang_chaussure' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cabine_marine',
            name: 'Cabine de Marine',
            icon: '💎',
            scene: 'boat_cabin',
            description: 'La cabine luxueusement décorée de Marine Leroy.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_marine',
                    label: 'Marine Leroy',
                    x: 30, y: 20, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Marine Leroy', portrait: '👱‍♀️',
                                text: '*en larmes* Jacques... Le capitaine était un homme merveilleux. Nous... nous nous étions rapprochés pendant cette croisière.',
                                action: { addSuspect: 'marine' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Rapprochés ? Vous aviez une relation ?'
                            },
                            {
                                speaker: 'Marine Leroy', portrait: '👱‍♀️',
                                text: 'Ça commençait à peine. Il m\'a donné son alliance hier soir en disant qu\'il voulait recommencer sa vie. C\'était romantique...',
                                choices: [
                                    {
                                        text: '💍 Cette alliance, c\'est celle du capitaine ?',
                                        condition: { hasClue: 'alliance_marine' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Vous avez entendu quelque chose cette nuit ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Mes condoléances.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Marine Leroy', portrait: '👱‍♀️',
                                text: 'Oui, il me l\'a donnée après le dîner. Il voulait divorcer et vivre avec moi. C\'est un cadeau, pas un vol !',
                                action: { setFlag: 'marine_alliance', journal: 'Marine confirme que le capitaine lui avait donné son alliance volontairement.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Marine n\'avait aucun mobile. Au contraire, elle perdait quelqu\'un auquel elle tenait.)',
                            },
                            {
                                speaker: 'Marine Leroy', portrait: '👱‍♀️',
                                text: 'Le champagne m\'a assommée. Mais... vers 1h du matin, j\'ai entendu des voix sur le pont. Une dispute. Puis le silence.',
                                action: { journal: 'Marine a entendu une dispute sur le pont vers 1h du matin.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Une dispute vers 1h. C\'est cohérent avec le témoignage de Karim et les photos d\'Anna.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_alliance',
                    label: 'Écrin sur la tablette',
                    x: 60, y: 35, width: 10, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un écrin ouvert sur la tablette de nuit. À l\'intérieur, une alliance en or.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Gravée "J&M pour toujours". L\'alliance du capitaine Morvan. Que fait-elle ici ?',
                                action: { addClue: 'alliance_marine' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'pont_superieur',
            name: 'Pont Supérieur',
            icon: '🌙',
            scene: 'boat_upper',
            description: 'Le pont supérieur avec vue dégagée sur la Seine et les étoiles.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_anna',
                    label: 'Anna Svensson',
                    x: 40, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Anna Svensson', portrait: '📸',
                                text: 'Inspecteur. Je suis photographe. J\'observe, je ne parle pas beaucoup. Mais cette nuit... j\'ai vu quelque chose.',
                                action: { addSuspect: 'anna' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Qu\'avez-vous vu, Anna ?'
                            },
                            {
                                speaker: 'Anna Svensson', portrait: '📸',
                                text: 'J\'étais ici pour photographier les étoiles. Vers 1h du matin, j\'ai vu le professeur Hartmann sortir de la cabine du capitaine. Il avait l\'air très agité.',
                                choices: [
                                    {
                                        text: '📷 Vous avez pris des photos ?',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Avez-vous vu autre chose ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci Anna.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Anna Svensson', portrait: '📸',
                                text: 'Réflexe professionnel. J\'ai photographié la scène. Tenez, regardez mon appareil.',
                                action: { addClue: 'photos_anna', journal: 'Anna a photographié Hartmann sortant de la cabine du capitaine à 1h du matin.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Ces photos sont une preuve accablante. Hartmann était dans la cabine du capitaine au moment du meurtre.)',
                            },
                            {
                                speaker: 'Anna Svensson', portrait: '📸',
                                text: 'Après que Hartmann est parti, j\'ai entendu un bruit sourd venant du pont principal. Puis plus rien. C\'est seulement ce matin que j\'ai compris.',
                                action: { journal: 'Anna a entendu un bruit sourd après le passage de Hartmann. Le moment probable du meurtre.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La chronologie se précise : dispute visible vers 1h, Hartmann sort agité, puis un bruit sourd — le meurtre.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'salle_machines',
            name: 'Salle des Machines',
            icon: '⚙️',
            scene: 'boat_engine',
            description: 'La salle des machines dans les entrailles du bateau.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_karim',
                    label: 'Karim Benali',
                    x: 50, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Karim Benali', portrait: '👨‍🔧',
                                text: 'Le capitaine... c\'est pas possible. 8 ans que je travaille avec lui. Il était pas facile, mais c\'était un bon gars.',
                                action: { addSuspect: 'karim' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Il vous devait trois mois de salaire. Ça crée des tensions.'
                            },
                            {
                                speaker: 'Karim Benali', portrait: '👨‍🔧',
                                text: 'Oui, on s\'est disputés là-dessus. Mais jamais je... C\'était une question d\'argent, pas de vie ou de mort.',
                                choices: [
                                    {
                                        text: '🤔 Vous avez entendu quelque chose cette nuit ?',
                                        goto: 3
                                    },
                                    {
                                        text: '💰 Montrez-moi les fiches de paie.',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ OK Karim.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Karim Benali', portrait: '👨‍🔧',
                                text: 'Vers minuit, quand je faisais ma ronde, j\'ai entendu le capitaine et le vieux professeur se disputer sur le pont. Le capitaine criait : "Vous n\'avez pas le droit !"',
                                action: { addClue: 'temoignage_karim', journal: 'Karim a entendu une dispute entre le capitaine et Hartmann vers minuit.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Hartmann et Morvan se sont disputés. Le capitaine menaçait de le dénoncer pour le pillage des épaves.)',
                            },
                            {
                                speaker: 'Karim Benali', portrait: '👨‍🔧',
                                text: '*sort des papiers* Tenez, regardez. Trois mois sans un centime. Je lui envoyais des messages, oui. Mais j\'aurais attendu. J\'aimais ce bateau.',
                                action: { addClue: 'fiches_paie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Karim avait un mobile financier, mais pas de preuves le reliant au meurtre. Sa colère semble sincère mais limitée.)',
                            }
                        ]
                    }
                }
            ]
        }
    ],

    solution: {
        culprit: 'victor_h',
        keyEvidence: ['couteau_cuisine', 'sang_chaussure', 'lettre_morvan', 'photos_anna', 'objet_epave'],

        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Victor Hartmann est confondu par un faisceau de preuves accablant. Le sang du capitaine sur sa chaussure, les photos d'Anna le montrant quittant la cabine à 1h du matin, la lettre de dénonciation et la montre pillée de l'épave — tout converge.

Hartmann pillait les épaves de la Seine depuis des années, finançant ses recherches avec la vente d'objets archéologiques au marché noir. Quand le capitaine Morvan a découvert son trafic et menacé de le dénoncer, Hartmann a pris un couteau en cuisine et l'a poignardé sur le pont.

Le "trésor du Normandie" estimé à 500 000€ valait-il une vie humaine ? Pour Hartmann, apparemment oui. Il finira ses jours en prison, loin de ses épaves.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez correctement identifié Victor Hartmann comme le meurtrier, mais certaines preuves matérielles manquent à votre dossier.

Le procureur obtient une condamnation, mais la défense exploite les lacunes. Hartmann reçoit une peine allégée.

Le capitaine Morvan obtient justice, même si elle est imparfaite.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Hartmann profite de la confusion pour jeter la montre pillée dans la Seine et détruire ses notes.

Le meurtre du capitaine Morvan rejoint les mystères non résolus de la Seine. L'Étoile ne reprendra jamais la mer.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur Morel, un meurtre sur la péniche "L\'Étoile de Seine", amarrée dans un bras mort du fleuve.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le capitaine Jacques Morvan a été poignardé sur le pont pendant la nuit. La passerelle était relevée — personne ne pouvait quitter le bateau.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Un meurtre en huis clos sur l\'eau. Qui était à bord ?'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Quatre personnes : Marine Leroy, passagère VIP. Victor Hartmann, un historien naval. Karim Benali, le mécanicien. Et Anna Svensson, une photographe suédoise.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le crime a eu lieu entre minuit et 6h du matin. Le couteau vient de la cuisine du bateau. Acte prémédité ou crime de circonstance ?',
                action: {
                    journal: 'Capitaine Morvan poignardé sur le pont de l\'Étoile de Seine. Passerelle relevée. Suspects : Marine (passagère), Hartmann (historien), Karim (mécanicien), Anna (photographe).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Le meurtrier est piégé à bord avec nous. Examinons chaque recoin de ce bateau.',
                action: (state) => {
                    state.unlockLocation('cabine_capitaine');
                    state.unlockLocation('salon_bateau');
                    state.unlockLocation('cabine_marine');
                    state.unlockLocation('pont_superieur');
                    state.unlockLocation('salle_machines');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};

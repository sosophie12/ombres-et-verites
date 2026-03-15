/**
 * CaseData9.js — "L'Opéra Sanglant"
 * Un ténor d'opéra est assassiné dans sa loge avant la première d'un grand spectacle.
 */
window.CASE_DATA_9 = {
    id: 'case_9',
    title: "L'Opéra Sanglant",
    subtitle: 'Meurtre à l\'entracte',
    difficulty: '⭐⭐⭐',
    intro: `Le célèbre ténor Alessandro Viteri est retrouvé mort dans sa loge à l'Opéra Royal de Lyon, poignardé avec un coupe-papier ancien.
Le meurtre a eu lieu pendant l'entracte du premier acte de "Tosca". 
Quatre personnes avaient accès aux coulisses. Le rideau se lève sur l'enquête.`,

    suspects: [
        {
            id: 'diana',
            name: 'Diana Kessler',
            role: 'Soprano rivale',
            emoji: '🎤',
            description: 'Soprano d\'origine autrichienne, 38 ans. Doublure de Viteri sur cette production. Avec sa mort, elle hérite du rôle principal.',
            alibi: 'Dit être restée dans sa propre loge pendant l\'entracte pour s\'échauffer.'
        },
        {
            id: 'paolo',
            name: 'Paolo Viteri',
            role: 'Frère et agent',
            emoji: '🧔',
            description: 'Frère cadet et agent d\'Alessandro. Gère sa carrière et ses finances. Des tensions récentes autour d\'un changement d\'agent.',
            alibi: 'Indique avoir été dans le hall avec des producteurs pour négocier le prochain contrat.'
        },
        {
            id: 'marguerite',
            name: 'Marguerite Blanc',
            role: 'Metteure en scène',
            emoji: '🎬',
            description: 'Metteure en scène renommée, 52 ans. Première collaboration avec Viteri, marquée par des conflits artistiques violents.',
            alibi: 'Affirme avoir été en régie pour ajuster les éclairages du deuxième acte.'
        },
        {
            id: 'louis',
            name: 'Louis Carpentier',
            role: 'Régisseur',
            emoji: '🔧',
            description: 'Régisseur de l\'Opéra depuis 20 ans. Discret, efficace, il connaît chaque recoin du bâtiment. Entretenait une rancœur secrète.',
            alibi: 'Prétend avoir vérifié les décors en coulisses pendant tout l\'entracte.'
        }
    ],

    clues: [
        {
            id: 'coupe_papier',
            name: 'Coupe-papier ancien',
            description: 'L\'arme du crime. Un coupe-papier en argent gravé avec les initiales "M.B." — Marguerite Blanc. Un objet personnel qu\'elle laissait en régie.',
            shortDesc: 'Coupe-papier de Marguerite Blanc',
            location: 'loge_viteri',
            category: 'physical'
        },
        {
            id: 'partition_annotee',
            name: 'Partition annotée',
            description: 'Sur le pupitre de Viteri, une partition annotée en rouge : "Tout dire ce soir. Fin du mensonge." Daté du jour même.',
            shortDesc: 'Note cryptique de Viteri',
            location: 'loge_viteri',
            category: 'document'
        },
        {
            id: 'contrat_paolo',
            name: 'Résiliation d\'agent',
            description: 'Un contrat de résiliation de l\'agence Paolo Viteri Management, signé par Alessandro. Paolo perdrait 30% de ses revenus.',
            shortDesc: 'Alessandro virait son frère',
            location: 'loge_viteri',
            category: 'document'
        },
        {
            id: 'tache_maquillage',
            name: 'Traces de maquillage',
            description: 'Du maquillage de scène trouvé sur la poignée de la porte de la loge de Viteri. Le maquillage correspond au fond de teint blanc utilisé uniquement par Diana pour son rôle.',
            shortDesc: 'Maquillage de Diana sur la poignée',
            location: 'loge_viteri',
            category: 'forensic'
        },
        {
            id: 'lettre_menace',
            name: 'Lettre de menace',
            description: 'Une lettre anonyme dans le tiroir de Viteri : "Si tu parles, tu ne chanteras plus jamais." Écrite sur du papier de la régie — le même papier que Louis utilise pour ses fiches techniques.',
            shortDesc: 'Menace sur papier de la régie',
            location: 'loge_viteri',
            category: 'document'
        },
        {
            id: 'sang_costume',
            name: 'Tache de sang sur costume',
            description: 'Le costume de doublure de Diana, accroché dans sa loge, a une tache de sang sur la manche. Sang d\'Alessandro.',
            shortDesc: 'Sang d\'Alessandro sur le costume de Diana',
            location: 'loge_diana',
            category: 'forensic'
        },
        {
            id: 'journal_louis',
            name: 'Journal de Louis',
            description: 'Un journal intime trouvé dans la cabine de régie. Louis écrit : "Il m\'a tout pris. Ma musique, ma carrière, ma vie. 20 ans à le servir et il ne sait même pas que je suis le vrai compositeur des arias qu\'il chante."',
            shortDesc: 'Louis prétend être le vrai compositeur',
            location: 'cabine_regie',
            category: 'document'
        },
        {
            id: 'photo_diana_couloir',
            name: 'Photo de surveillance',
            description: 'La caméra du couloir montre Diana sortant de la loge de Viteri à 21h12 — pendant l\'entracte. Elle essuie ses mains sur son costume.',
            shortDesc: 'Diana filmée sortant de la loge',
            location: 'couloir_coulisses',
            category: 'forensic'
        },
        {
            id: 'mobile_diana',
            name: 'SMS de Diana',
            description: 'SMS de Diana à une amie, 19h : "Ce soir, Alessandro ne chantera plus. C\'est mon tour. J\'ai attendu 10 ans pour ce rôle et il ne me le prendra pas."',
            shortDesc: 'SMS menaçant de Diana',
            location: 'loge_diana',
            category: 'document'
        },
        {
            id: 'temoignage_habilleuse',
            name: 'Témoignage de l\'habilleuse',
            description: 'L\'habilleuse confirme : Diana a quitté sa loge à 21h05 "pour féliciter Alessandro". Elle est revenue 10 minutes plus tard, pâle et tremblante.',
            shortDesc: 'L\'habilleuse confirme la visite de Diana',
            location: 'couloir_coulisses',
            category: 'testimony'
        }
    ],

    locations: [
        {
            id: 'loge_viteri',
            name: 'Loge de Viteri',
            icon: '🎭',
            scene: 'opera_dressing',
            description: 'La loge du ténor Alessandro Viteri. C\'est ici que le meurtre a eu lieu.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_corps',
                    label: 'Scène du crime',
                    x: 30, y: 25, width: 25, height: 30,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Alessandro Viteri, 45 ans. Poignardé dans sa loge entre 21h05 et 21h15 — pendant l\'entracte de 20 minutes.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'arme : un coupe-papier en argent, enfoncé dans le dos. Les initiales "M.B." sont gravées sur le manche — Marguerite Blanc.',
                                action: { addClue: 'coupe_papier' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Pas de signe de lutte. Viteri a été poignardé par surprise, probablement assis à sa coiffeuse.',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_pupitre',
                    label: 'Pupitre à partitions',
                    x: 10, y: 30, width: 12, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le pupitre d\'Alessandro. Des partitions de Tosca, annotées de sa main...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une note en rouge dans la marge : "Tout dire ce soir. Fin du mensonge." Daté d\'aujourd\'hui. Quel mensonge ?',
                                action: { addClue: 'partition_annotee' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_tiroir',
                    label: 'Tiroir de la coiffeuse',
                    x: 60, y: 35, width: 12, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le tiroir de la coiffeuse. Des documents légaux et une lettre...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un contrat de résiliation signé par Alessandro. Il virait Paolo, son propre frère, comme agent. Paolo perdrait 30% de ses revenus !',
                                action: { addClue: 'contrat_paolo' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Et une lettre anonyme : "Si tu parles, tu ne chanteras plus jamais." Le papier est technique — celui qu\'on trouve en régie.',
                                action: { addClue: 'lettre_menace' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_poignee',
                    label: 'Poignée de la porte',
                    x: 80, y: 30, width: 8, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des traces sur la poignée intérieure de la porte. Du maquillage de scène — un fond de teint blanc.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Ce maquillage blanc est spécifique au rôle de Tosca. Seule Diana Kessler l\'utilise pour son rôle de doublure. Elle est entrée dans cette loge.',
                                action: { addClue: 'tache_maquillage' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'loge_diana',
            name: 'Loge de Diana',
            icon: '🎤',
            scene: 'opera_loge',
            description: 'La loge de Diana Kessler, doublure soprano.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_diana',
                    label: 'Diana Kessler',
                    x: 30, y: 20, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: '*les yeux rouges* Alessandro... C\'est un cauchemar. Qui pourrait vouloir tuer un tel artiste ?',
                                action: { addSuspect: 'diana' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Avec sa mort, vous héritez du rôle principal. Ce soir, c\'est vous qui chanterez Tosca.'
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: 'Vous croyez que j\'ai tué un homme pour un rôle ?! Je suis artiste, pas meurtrière !',
                                choices: [
                                    {
                                        text: '📹 La caméra vous montre sortant de sa loge.',
                                        condition: { hasClue: 'photo_diana_couloir' },
                                        goto: 3
                                    },
                                    {
                                        text: '💄 Votre maquillage était sur la poignée.',
                                        condition: { hasClue: 'tache_maquillage' },
                                        goto: 6
                                    },
                                    {
                                        text: '🩸 Du sang sur votre costume.',
                                        condition: { hasClue: 'sang_costume' },
                                        goto: 8
                                    },
                                    {
                                        text: '📱 "Alessandro ne chantera plus."',
                                        condition: { hasClue: 'mobile_diana' },
                                        goto: 10
                                    },
                                    {
                                        text: '✋ Je dois continuer l\'enquête.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: '*pâlit* Oui... je suis allée le voir à 21h05. Je voulais lui souhaiter bonne chance pour le deuxième acte. Quand je suis entrée...',
                                action: { setFlag: 'diana_admits_visit' }
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: 'Il était déjà mort ! Le coupe-papier dans le dos, du sang partout. J\'ai paniqué, j\'ai touché son épaule pour vérifier... puis je me suis enfuie.',
                                action: { journal: 'Diana admet être entrée dans la loge et avoir trouvé Alessandro déjà mort. Elle dit avoir paniqué.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Elle admet être entrée. Mais l\'a-t-elle trouvé mort ou l\'a-t-elle tué ? La caméra montre qu\'elle essuie ses mains en sortant...)',
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: 'Le maquillage ? J\'étais déjà maquillée pour le rôle ! Évidemment que j\'ai laissé des traces en ouvrant la porte.',
                                action: { journal: 'Diana explique que le maquillage vient de son rôle de Tosca.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Son explication tient. Mais ça confirme qu\'elle était dans la loge.)',
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: '*horrifiée* Le sang — c\'est quand j\'ai touché son épaule en entrant ! Je ne savais pas qu\'il était... Je l\'ai à peine effleuré !',
                                action: { journal: 'Diana explique la tache de sang par le contact accidentel quand elle a trouvé le corps.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Tache sur la manche. Compatible avec le fait de toucher une épaule — ou de poignarder quelqu\'un dans le dos.)',
                            },
                            {
                                speaker: 'Diana Kessler', portrait: '🎤',
                                text: 'Ce SMS ! C\'est une expression, inspecteur ! "Ne chantera plus" parce que j\'allais lui demander de partager le rôle en alternance, pas de mourir !',
                                action: { setFlag: 'diana_sms_excuse', journal: 'Diana interprète son SMS comme une demande d\'alternance, pas une menace.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '("C\'est mon tour. J\'ai attendu 10 ans." — une artiste frustrée, ou une meurtrière déterminée ?)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_costume_diana',
                    label: 'Costume de scène',
                    x: 65, y: 25, width: 14, height: 25,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le costume de Tosca accroché dans la loge. Un détail attire mon œil...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une tache de sang sur la manche droite ! Une analyse rapide confirme — c\'est le sang d\'Alessandro Viteri.',
                                action: { addClue: 'sang_costume' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_telephone_diana',
                    label: 'Téléphone de Diana',
                    x: 45, y: 45, width: 10, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le téléphone de Diana. Un SMS envoyé à 19h à une amie...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Ce soir, Alessandro ne chantera plus. C\'est mon tour. J\'ai attendu 10 ans pour ce rôle et il ne me le prendra pas."',
                                action: { addClue: 'mobile_diana' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un SMS envoyé des heures avant le meurtre. Préméditation ?)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'couloir_coulisses',
            name: 'Couloir des Coulisses',
            icon: '🚪',
            scene: 'opera_backstage',
            description: 'Le couloir reliant les loges, la scène et la régie.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_paolo',
                    label: 'Paolo Viteri',
                    x: 25, y: 20, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Paolo Viteri', portrait: '🧔',
                                text: 'Mon frère... *voix brisée* Je n\'arrive pas à y croire. Nous avions nos différends, mais c\'était mon sang.',
                                action: { addSuspect: 'paolo' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Il était sur le point de vous licencier comme agent.'
                            },
                            {
                                speaker: 'Paolo Viteri', portrait: '🧔',
                                text: 'Nous avions un désaccord, oui. Mais je l\'aurais convaincu — j\'ai toujours su le convaincre.',
                                choices: [
                                    {
                                        text: '📋 Ce contrat de résiliation est déjà signé.',
                                        condition: { hasClue: 'contrat_paolo' },
                                        goto: 3
                                    },
                                    {
                                        text: '📝 "Fin du mensonge" écrivait Alessandro.',
                                        condition: { hasClue: 'partition_annotee' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Nous reparlerons, Paolo.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Paolo Viteri', portrait: '🧔',
                                text: '*choqué* Il l\'a signé ? Sans m\'en parler ? Mais... j\'étais son agent depuis 15 ans ! Sans moi, il ne serait rien !',
                                action: { setFlag: 'paolo_shocked', journal: 'Paolo découvre le contrat de résiliation. Il perd 30% de ses revenus.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La rage de Paolo semble sincère. Mais son mobile est réel : sauver sa carrière d\'agent.)',
                            },
                            {
                                speaker: 'Paolo Viteri', portrait: '🧔',
                                text: '"Fin du mensonge" ? Alessandro avait des secrets, inspecteur. Des secrets sur sa carrière que personne ne devait connaître.',
                                action: { setFlag: 'paolo_secrets', journal: 'Paolo mentionne des secrets sur la carrière d\'Alessandro. Un "mensonge" qui devait cesser.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Quels secrets ?'
                            },
                            {
                                speaker: 'Paolo Viteri', portrait: '🧔',
                                text: 'Ce n\'est pas à moi de... Demandez au régisseur, Louis. Lui et Alessandro se connaissaient depuis longtemps. Très longtemps.',
                                action: { journal: 'Paolo oriente vers Louis Carpentier. Un lien ancien entre lui et Alessandro.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camera_couloir',
                    label: 'Moniteur de surveillance',
                    x: 65, y: 15, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le moniteur de surveillance des coulisses. Les enregistrements de ce soir...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '21h12 — Diana sort de la loge de Viteri. Elle essuie ses mains sur son costume en marchant vite.',
                                action: { addClue: 'photo_diana_couloir' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le meurtre a eu lieu entre 21h05 et 21h15. Diana est dans la fenêtre de temps.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_habilleuse',
                    label: 'Habilleuse',
                    x: 45, y: 30, width: 12, height: 22,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Habilleuse', portrait: '👗',
                                text: 'Quelle horreur, inspecteur ! Pauvre Monsieur Viteri...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Avez-vous remarqué des allées et venues inhabituelles pendant l\'entracte ?'
                            },
                            {
                                speaker: 'Habilleuse', portrait: '👗',
                                text: 'Diana est sortie de sa loge vers 21h05. Elle m\'a dit qu\'elle allait "féliciter Alessandro" pour le premier acte.',
                                action: { addClue: 'temoignage_habilleuse' }
                            },
                            {
                                speaker: 'Habilleuse', portrait: '👗',
                                text: 'Elle est revenue une dizaine de minutes plus tard. Très pâle, tremblante. J\'ai cru au trac...',
                                action: { journal: 'L\'habilleuse confirme : Diana est allée voir Alessandro à 21h05 et est revenue tremblante.' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cabine_regie',
            name: 'Cabine de Régie',
            icon: '🎛️',
            scene: 'opera_control',
            description: 'La cabine de régie surplombant la scène de l\'opéra.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_louis',
                    label: 'Louis Carpentier',
                    x: 35, y: 20, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: '20 ans dans cet opéra. J\'ai vu des drames sur scène, mais jamais en coulisses. Pauvre Alessandro.',
                                action: { addSuspect: 'louis' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La lettre de menace est écrite sur votre papier de régie.'
                            },
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: 'Ce papier ? Tout le monde peut en prendre. Il y en a des rames entières dans les coulisses.',
                                choices: [
                                    {
                                        text: '📖 Votre journal intime raconte une autre histoire.',
                                        condition: { hasClue: 'journal_louis' },
                                        goto: 3
                                    },
                                    {
                                        text: '📝 "Fin du mensonge" — de quoi parlait Alessandro ?',
                                        condition: { hasClue: 'partition_annotee' },
                                        goto: 6
                                    },
                                    {
                                        text: '✋ Merci, Louis.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: '*long silence* Vous l\'avez lu. Alors vous savez. Oui, c\'est moi qui ai composé les arias. Alessandro avait la voix, moi j\'avais le talent.',
                                action: { setFlag: 'louis_compositeur', journal: 'Louis avoue être le vrai compositeur des arias d\'Alessandro. Un secret de 20 ans.' }
                            },
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: 'Quand nous étions jeunes, nous avons fait un pacte. Il chantait, je composais. Mais la gloire est allée à lui, et moi je suis resté dans l\'ombre. 20 ans dans l\'ombre.',
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un mobile : 20 ans de ressentiment. Mais la lettre de menace dit "Si tu parles". C\'est Louis qui voulait garder le secret, pas Alessandro. Alessandro voulait la vérité.)',
                                action: { journal: 'Paradoxe : Louis voulait garder le secret, Alessandro voulait tout révéler. Qui avait intérêt à le faire taire ?' }
                            },
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: '"Fin du mensonge"... Alessandro voulait tout révéler ce soir. Dire au monde que les arias étaient de moi.',
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Mais cela vous aurait rendu célèbre. Pourquoi l\'en empêcher ?'
                            },
                            {
                                speaker: 'Louis Carpentier', portrait: '🔧',
                                text: 'Parce que ça aurait détruit sa carrière. Sa réputation. Des poursuites, des scandales... Et moi, on m\'aurait demandé pourquoi j\'ai accepté ce mensonge. J\'aurais tout perdu aussi.',
                                action: { journal: 'Louis craignait que la révélation détruise les deux : Alessandro et lui-même.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Louis avait un mobile : empêcher la révélation. La lettre de menace est de lui. Mais a-t-il franchi le pas ?)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_journal_regie',
                    label: 'Tiroir de régie',
                    x: 60, y: 40, width: 14, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un tiroir fermé à clé dans le bureau de régie. La serrure est fragile...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un journal intime ! Celui de Louis Carpentier. "Il m\'a tout pris. Ma musique, ma carrière, ma vie. Je suis le vrai compositeur des arias qu\'il chante."',
                                action: { addClue: 'journal_louis' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(20 ans de ressentiment concentrés dans ces pages. Louis avait un mobile profond, mais c\'est Diana que les preuves physiques accusent.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_marguerite',
                    label: 'Marguerite Blanc',
                    x: 10, y: 25, width: 14, height: 25,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Marguerite Blanc', portrait: '🎬',
                                text: 'Mon coupe-papier ?! L\'arme du crime est mon coupe-papier ?! On me l\'a volé !',
                                action: { addSuspect: 'marguerite' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Quand l\'avez-vous vu pour la dernière fois ?'
                            },
                            {
                                speaker: 'Marguerite Blanc', portrait: '🎬',
                                text: 'Avant le spectacle ! Je l\'ai laissé ici, sur mon bureau de régie. N\'importe qui a pu le prendre.',
                                choices: [
                                    {
                                        text: '🤔 Vos relations avec Viteri étaient tendues.',
                                        goto: 3
                                    },
                                    {
                                        text: '✋ D\'accord, Marguerite.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Marguerite Blanc', portrait: '🎬',
                                text: 'Tendues ? Il était insupportable ! Il refusait toutes mes directions, improvisait sur scène, humiliait les choristes.',
                                action: { journal: 'Marguerite avait des conflits avec Viteri mais son coupe-papier a été volé en régie.' }
                            },
                            {
                                speaker: 'Marguerite Blanc', portrait: '🎬',
                                text: 'Mais de là à le tuer ? Mon coupe-papier est un cadeau de mon père. Jamais je ne l\'aurais utilisé pour ça. On l\'a pris pour me piéger.',
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Marguerite a un alibi en régie. Le coupe-papier était accessible à quiconque passait par là. Quelqu\'un l\'a pris et utilisé — un crime d\'opportunité ou un piège.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'scene_opera',
            name: 'Scène de l\'Opéra',
            icon: '🎶',
            scene: 'opera_stage',
            description: 'La grande scène de l\'Opéra Royal, décorée pour Tosca.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_scene_tosca',
                    label: 'Décor de Tosca',
                    x: 30, y: 20, width: 30, height: 35,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La scène montée pour Tosca — l\'opéra de Puccini. L\'histoire d\'une chanteuse qui poignarde un homme pour l\'amour...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Ironie macabre : dans Tosca, l\'héroïne tue avec un couteau de table. Ici, c\'est un coupe-papier. Le meurtre imite l\'art.',
                                action: { journal: 'Le meurtre fait écho à l\'intrigue de Tosca. Coïncidence ou mise en scène intentionnelle ?' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Diana jouait Tosca — le personnage qui poignarde. Le choix de l\'arme n\'est peut-être pas un hasard.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_accessoires',
                    label: 'Table des accessoires',
                    x: 70, y: 45, width: 14, height: 12,
                    type: 'object',
                    examineText: 'Les accessoires de scène. Le couteau de Tosca est là — un faux couteau à lame rétractable. Le meurtrier n\'a pas utilisé l\'accessoire de scène, mais un vrai objet : le coupe-papier de Marguerite.'
                }
            ]
        }
    ],

    solution: {
        culprit: 'diana',
        keyEvidence: ['coupe_papier', 'sang_costume', 'photo_diana_couloir', 'mobile_diana', 'temoignage_habilleuse'],

        endings: {
            perfect: {
                title: '🏆 Standing Ovation !',
                text: `Diana Kessler est confondue par un faisceau de preuves implacable. L'habilleuse confirme qu'elle a quitté sa loge à 21h05 pour aller voir Alessandro. La caméra la montre sortant de la loge à 21h12, essuyant ses mains ensanglantées.

Le sang d'Alessandro sur son costume, le maquillage sur la poignée de la loge, et son SMS envoyé des heures plus tôt : "Ce soir, Alessandro ne chantera plus" — tout converge.

Diana a pris le coupe-papier de Marguerite en passant par la régie, puis a poignardé Alessandro par surprise pendant qu'il était assis à sa coiffeuse. Dix ans de frustration en une fraction de seconde.

Le secret de Louis et Alessandro — les arias composées par le régisseur — meurt avec le ténor. Louis garde le silence, et l'ombre reste où elle a toujours été : dans les coulisses.`
            },
            good: {
                title: '✅ Rideau Final',
                text: `Diana Kessler est correctement identifiée, mais votre dossier comporte des lacunes. La défense conteste certaines preuves.

Diana écope d'une peine réduite. L'Opéra Royal ferme ses portes pour plusieurs mois. Le fantôme d'Alessandro hante les coulisses.`
            },
            wrong: {
                title: '❌ Fausse Note',
                text: `Vous avez accusé la mauvaise personne. Diana profite de la confusion pour effacer les preuves restantes.

L'Opéra Sanglant restera à jamais un mystère non résolu. La scène de Tosca ne sera plus jamais jouée dans cet opéra.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur, un meurtre à l\'Opéra Royal de Lyon. Le ténor Alessandro Viteri, 45 ans, poignardé dans sa loge pendant l\'entracte.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'L\'arme est un coupe-papier en argent portant les initiales de la metteure en scène. Le meurtre a eu lieu entre 21h05 et 21h15.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Un ténor poignardé pendant l\'entracte de Tosca — l\'opéra où l\'héroïne poignarde un homme. L\'art imite la vie, ou l\'inverse ?'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Quatre suspects avec accès aux coulisses : Diana Kessler la doublure soprano, Paolo le frère agent, Marguerite Blanc la metteure en scène, et Louis Carpentier le régisseur.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'L\'entracte ne durait que 20 minutes. Le meurtrier a agi vite. Trouvez-le avant le baisser de rideau.',
                action: {
                    journal: 'Alessandro Viteri poignardé à l\'Opéra Royal pendant l\'entracte de Tosca. Suspects : Diana (soprano), Paolo (frère/agent), Marguerite (metteure en scène), Louis (régisseur).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'La scène est un théâtre. Mais le sang est bien réel. Levons le rideau sur la vérité.',
                action: (state) => {
                    state.unlockLocation('loge_diana');
                    state.unlockLocation('couloir_coulisses');
                    state.unlockLocation('cabine_regie');
                    state.unlockLocation('scene_opera');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};

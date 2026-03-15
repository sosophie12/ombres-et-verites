/**
 * CaseData8.js — "Le Manoir des Masques"
 * Lors d'un bal masqué dans un château, un invité est retrouvé empoisonné.
 */
window.CASE_DATA_8 = {
    id: 'case_8',
    title: 'Le Manoir des Masques',
    subtitle: 'Meurtre au bal masqué',
    difficulty: '⭐⭐⭐',
    intro: `Le richissime collectionneur Édouard de Montclair organise un bal masqué dans son château pour ses 70 ans.
À minuit, lorsque les masques tombent, on découvre Édouard inanimé dans son fauteuil. Empoisonné au champagne.
Quatre invités portaient des masques identiques. L'un d'eux est un meurtrier.`,

    suspects: [
        {
            id: 'charlotte',
            name: 'Charlotte de Montclair',
            role: 'Nièce et héritière',
            emoji: '👸',
            description: 'Nièce d\'Édouard et seule héritière. Avide et impatiente, elle rêvait de transformer le château en hôtel de luxe.',
            alibi: 'Dit avoir dansé toute la soirée dans la salle de bal.'
        },
        {
            id: 'maxime',
            name: 'Maxime Olivier',
            role: 'Galeriste d\'art',
            emoji: '🎨',
            description: 'Galeriste parisien, 45 ans. Fournisseur et ami d\'Édouard. Gérait la vente de ses œuvres — avec des commissions douteuses.',
            alibi: 'Affirme avoir été dans la galerie à admirer les tableaux.'
        },
        {
            id: 'docteur_roche',
            name: 'Dr. Hélène Roche',
            role: 'Médecin personnel',
            emoji: '👩‍⚕️',
            description: 'Médecin d\'Édouard depuis 15 ans. Connaît tous ses problèmes de santé. Avait accès à des substances toxiques.',
            alibi: 'Indique être restée près d\'Édouard une partie de la soirée pour surveiller sa santé.'
        },
        {
            id: 'gabriel',
            name: 'Gabriel Moreau',
            role: 'Majordome',
            emoji: '🤵',
            description: 'Majordome du château depuis 25 ans. Dévoué à la famille, mais blessé par un récent licenciement annoncé.',
            alibi: 'Prétend avoir servi les invités toute la soirée sans interruption.'
        }
    ],

    clues: [
        {
            id: 'coupe_champagne',
            name: 'Coupe de champagne',
            description: 'La coupe d\'Édouard contenait de la digitaline — un poison cardiaque extrait de la digitale. Dose mortelle pour un homme avec un cœur fragile.',
            shortDesc: 'Champagne empoisonné à la digitaline',
            location: 'salle_trone',
            category: 'physical'
        },
        {
            id: 'fiole_digitale',
            name: 'Fiole de digitaline',
            description: 'Une fiole vide de digitaline trouvée dans un pot de fleurs de la serre. Étiquette du cabinet médical du Dr. Roche.',
            shortDesc: 'Fiole du cabinet du Dr. Roche',
            location: 'serre_chateau',
            category: 'physical'
        },
        {
            id: 'testament_edouard',
            name: 'Nouveau testament',
            description: 'Un testament récent dans le coffre d\'Édouard. Il déshérite Charlotte au profit d\'une fondation d\'art. Charlotte ne le savait pas.',
            shortDesc: 'Charlotte déshéritée',
            location: 'salle_trone',
            category: 'document'
        },
        {
            id: 'commissions_maxime',
            name: 'Registre des commissions',
            description: 'Un registre dans la galerie montrant que Maxime prenait 40% de commission au lieu de 15%. Édouard avait annoté : "Vol — à confronter ce soir."',
            shortDesc: 'Maxime volait 40% de commission',
            location: 'galerie_chateau',
            category: 'document'
        },
        {
            id: 'ordonnance_digitale',
            name: 'Ordonnance médicale',
            description: 'Une ordonnance prescrivant de la digitaline à faible dose pour le cœur d\'Édouard. Seule le Dr. Roche avait accès à ce médicament.',
            shortDesc: 'Ordonnance de digitaline',
            location: 'salle_trone',
            category: 'document'
        },
        {
            id: 'gant_tache',
            name: 'Gant blanc taché',
            description: 'Un gant blanc de service trouvé dans la serre. Des traces de digitaline sur les doigts. Gabriel porte les mêmes gants.',
            shortDesc: 'Gant de service avec traces de poison',
            location: 'serre_chateau',
            category: 'physical'
        },
        {
            id: 'lettre_licenciement_g',
            name: 'Lettre de licenciement',
            description: 'Une lettre signée par Charlotte à Gabriel : "Dès que mon oncle me cédera le château, vos services ne seront plus nécessaires." Datée d\'il y a 2 semaines.',
            shortDesc: 'Charlotte voulait licencier Gabriel',
            location: 'cuisine_chateau',
            category: 'document'
        },
        {
            id: 'camera_serre',
            name: 'Vidéo de la serre',
            description: 'La caméra de la serre montre Charlotte y entrant à 23h40 et en ressortant à 23h47. Elle portait des gants blancs qu\'elle a retirés dans la serre.',
            shortDesc: 'Charlotte filmée dans la serre',
            location: 'serre_chateau',
            category: 'forensic'
        },
        {
            id: 'sms_charlotte',
            name: 'Message de Charlotte',
            description: 'SMS de Charlotte envoyé 2h avant le bal : "Ce soir c\'est le grand soir. Bientôt le château sera à moi et on pourra commencer les travaux."',
            shortDesc: 'SMS planifiant la prise du château',
            location: 'chambre_charlotte',
            category: 'document'
        },
        {
            id: 'temoignage_gabriel',
            name: 'Témoignage de Gabriel',
            description: 'Gabriel affirme que Charlotte est venue en cuisine à 23h30 et a insisté pour servir elle-même la coupe de champagne de son oncle.',
            shortDesc: 'Charlotte a servi le champagne',
            location: 'cuisine_chateau',
            category: 'testimony'
        }
    ],

    locations: [
        {
            id: 'salle_trone',
            name: 'Salle du Trône',
            icon: '👑',
            scene: 'castle_throne',
            description: 'La grande salle du château où Édouard a été retrouvé dans son fauteuil.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_fauteuil',
                    label: 'Fauteuil d\'Édouard',
                    x: 35, y: 30, width: 25, height: 25,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Édouard de Montclair, 70 ans. Retrouvé dans son fauteuil, comme s\'il s\'était endormi. Mais il ne se réveillera jamais.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Sa coupe de champagne est à côté, à moitié bue. L\'odeur est normale, mais l\'analyse révèle de la digitaline — un poison cardiaque.',
                                action: { addClue: 'coupe_champagne' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_coffre',
                    label: 'Coffre mural',
                    x: 10, y: 20, width: 12, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un coffre mural entrouvert derrière un tableau. Des documents légaux à l\'intérieur...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un testament ! Daté de la semaine dernière. Édouard léguait tout à une fondation d\'art. Charlotte est complètement déshéritée !',
                                action: { addClue: 'testament_edouard' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_table_medicaments',
                    label: 'Table de médicaments',
                    x: 65, y: 40, width: 12, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Les médicaments d\'Édouard. Un traitement cardiaque incluant de la digitaline à faible dose.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'ordonnance du Dr. Roche. À haute dose, la digitaline devient un poison mortel. Seul le Dr. Roche pouvait prescrire et fournir ce médicament.',
                                action: { addClue: 'ordonnance_digitale' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_docteur',
                    label: 'Dr. Hélène Roche',
                    x: 75, y: 25, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Dr. Hélène Roche', portrait: '👩‍⚕️',
                                text: 'Inspecteur, c\'est affreux. J\'étais son médecin depuis 15 ans. Son cœur était fragile, mais il était stable avec le traitement.',
                                action: { addSuspect: 'docteur_roche' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La digitaline qui l\'a tué — c\'est vous qui la prescriviez.'
                            },
                            {
                                speaker: 'Dr. Hélène Roche', portrait: '👩‍⚕️',
                                text: 'Oui, à dose thérapeutique ! 0,25mg par jour. La dose qui l\'a tué était 10 fois supérieure. Jamais je n\'aurais fait ça !',
                                choices: [
                                    {
                                        text: '💊 La fiole vide porte l\'étiquette de votre cabinet.',
                                        condition: { hasClue: 'fiole_digitale' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Quelqu\'un a pu voler la digitaline ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci docteur.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Dr. Hélène Roche', portrait: '👩‍⚕️',
                                text: '*choquée* Ma fiole ! Elle a disparu de ma trousse médicale ! Je l\'avais posée dans la serre pour montrer les plantes de digitale aux invités. Quelqu\'un l\'a prise !',
                                action: { setFlag: 'docteur_fiole_volee', journal: 'Le Dr. Roche affirme que sa fiole de digitaline a été volée dans la serre.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La fiole a été trouvée dans la serre. Si quelqu\'un l\'a volée là-bas, il connaissait le contenu.)',
                            },
                            {
                                speaker: 'Dr. Hélène Roche', portrait: '👩‍⚕️',
                                text: 'Hélas, oui. Ma trousse était dans la serre. N\'importe qui parmi les invités aurait pu la prendre pendant que je n\'étais pas là.',
                                action: { journal: 'La digitaline était accessible dans la serre. N\'importe quel invité pouvait la voler.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(La question est : qui est allé dans la serre, et qui a servi le champagne empoisonné ?)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'galerie_chateau',
            name: 'Galerie d\'Art',
            icon: '🖼️',
            scene: 'castle_gallery',
            description: 'La galerie privée d\'Édouard, remplie de tableaux de maîtres.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_registre_ventes',
                    label: 'Registre des ventes',
                    x: 35, y: 40, width: 18, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un registre des ventes d\'art dans le bureau de la galerie. Les chiffres sont intéressants...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Maxime prenait 40% de commission au lieu des 15% convenus ! Et une annotation d\'Édouard en rouge : "Vol — à confronter ce soir."',
                                action: { addClue: 'commissions_maxime' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Édouard comptait démasquer Maxime ce soir-même. Maxime avait un mobile puissant pour l\'en empêcher.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_maxime',
                    label: 'Maxime Olivier',
                    x: 65, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Maxime Olivier', portrait: '🎨',
                                text: 'Inspecteur... Édouard était mon meilleur client et un ami cher. Sa collection est inestimable.',
                                action: { addSuspect: 'maxime' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un ami ? Ou une source de revenus ?'
                            },
                            {
                                speaker: 'Maxime Olivier', portrait: '🎨',
                                text: 'Les deux ne s\'excluent pas, inspecteur. Le marché de l\'art est un métier de passion.',
                                choices: [
                                    {
                                        text: '📊 40% de commission, c\'est de la passion ou du vol ?',
                                        condition: { hasClue: 'commissions_maxime' },
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 Où étiez-vous à 23h30 ?',
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Au revoir, Maxime.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Maxime Olivier', portrait: '🎨',
                                text: '*blêmit* Ces chiffres sont... c\'est un malentendu comptable. Les frais de transport, d\'assurance... tout s\'explique.',
                                action: { setFlag: 'maxime_confronted', journal: 'Maxime nie les commissions excessives malgré les preuves du registre.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Édouard avait écrit "Vol" dans son registre. Il comptait vous confronter ce soir.',
                            },
                            {
                                speaker: 'Maxime Olivier', portrait: '🎨',
                                text: 'Dans la galerie ! J\'admirais le nouveau Modigliani qu\'Édouard avait acquis. Demandez aux serveurs, ils m\'y ont vu.',
                                action: { journal: 'Maxime dit être resté dans la galerie. À vérifier auprès du personnel.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Maxime a un mobile financier, mais était-il dans la serre ? Avait-il accès au champagne ?)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'serre_chateau',
            name: 'Serre du Château',
            icon: '🌿',
            scene: 'castle_garden',
            description: 'La serre tropicale du château, remplie de plantes rares.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_plantes_digitale',
                    label: 'Plants de digitale',
                    x: 20, y: 30, width: 18, height: 20,
                    type: 'object',
                    examineText: 'Des plants de Digitalis purpurea. La source naturelle de digitaline. Le Dr. Roche les utilisait pour montrer la plante aux invités intéressés.'
                },
                {
                    id: 'hs_fiole_pot',
                    label: 'Pot de fleurs renversé',
                    x: 55, y: 50, width: 12, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un pot de fleurs renversé... quelqu\'un est passé ici en vitesse. Et qu\'est-ce qui brille au fond ?'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une fiole vide ! L\'étiquette indique "Digitaline — Cabinet Dr. Roche". Quelqu\'un a volé la digitaline et jeté la fiole ici.',
                                action: { addClue: 'fiole_digitale' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camera_serre',
                    label: 'Caméra de surveillance',
                    x: 5, y: 8, width: 10, height: 10,
                    type: 'object',
                    condition: { hasClue: 'fiole_digitale' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Il y a une caméra dans la serre ! Vérifions les enregistrements...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Charlotte est entrée dans la serre à 23h40 et en est ressortie à 23h47. Elle portait des gants blancs en entrant — elle les a retirés dans la serre !',
                                action: { addClue: 'camera_serre' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Charlotte est venue dans la serre juste avant le champagne de minuit. Elle a pris la fiole et mis le poison dans ses gants pour le verser dans la coupe.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_gant_serre',
                    label: 'Gant blanc abandonné',
                    x: 40, y: 60, width: 10, height: 8,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un gant blanc abandonné entre les plantes. Des traces de liquide sur les doigts...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des résidus de digitaline sur le tissu ! Ce gant a été utilisé pour manipuler le poison. Gabriel porte les mêmes gants de service.',
                                action: { addClue: 'gant_tache' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Mais la vidéo montre Charlotte portant les mêmes gants blancs. Les gants de service sont disponibles dans toute la maison.)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'cuisine_chateau',
            name: 'Cuisine du Château',
            icon: '🍾',
            scene: 'castle_kitchen',
            description: 'Les cuisines du château, encore en désordre après le bal.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_gabriel',
                    label: 'Gabriel Moreau',
                    x: 40, y: 25, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Gabriel Moreau', portrait: '🤵',
                                text: 'Monsieur Édouard... 25 ans de service fidèle. C\'était plus qu\'un employeur, c\'était un père pour moi.',
                                action: { addSuspect: 'gabriel' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'On m\'a dit que Charlotte prévoyait de vous licencier.'
                            },
                            {
                                speaker: 'Gabriel Moreau', portrait: '🤵',
                                text: 'Oui, j\'ai reçu cette lettre. Mais tant que Monsieur Édouard était vivant, ma place était assurée. C\'est sa mort qui me met en danger, pas l\'inverse.',
                                choices: [
                                    {
                                        text: '🍾 Qui a servi le champagne à Édouard ?',
                                        goto: 3
                                    },
                                    {
                                        text: '📝 Cette lettre de Charlotte...',
                                        condition: { hasClue: 'lettre_licenciement_g' },
                                        goto: 6
                                    },
                                    {
                                        text: '✋ Merci Gabriel.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Gabriel Moreau', portrait: '🤵',
                                text: 'C\'est moi qui ai préparé le plateau de champagne à 23h30. Mais Mademoiselle Charlotte est venue en cuisine et a insisté pour apporter elle-même la coupe de son oncle.',
                                action: { addClue: 'temoignage_gabriel', journal: 'Charlotte a insisté pour servir le champagne de son oncle elle-même.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Charlotte a pris la coupe. Entre la cuisine et le fauteuil d\'Édouard — elle avait le temps d\'y verser la digitaline.'
                            },
                            {
                                speaker: 'Gabriel Moreau', portrait: '🤵',
                                text: 'Oui, inspecteur. Je n\'ai rien vu sur le moment, mais maintenant... ça me glace le sang.',
                                action: { setFlag: 'gabriel_charlotte_served' }
                            },
                            {
                                speaker: 'Gabriel Moreau', portrait: '🤵',
                                text: '*montre la lettre* Regardez la date. Deux semaines. Charlotte était impatiente. Mais avec la mort d\'Édouard... c\'est elle qui hérite du château.',
                                action: { journal: 'Gabriel confirme que la mort d\'Édouard profite directement à Charlotte.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Ironie : avec le nouveau testament, Charlotte n\'hérite de rien. Mais elle ne le savait probablement pas.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_lettre_cuisine',
                    label: 'Babillard des employés',
                    x: 10, y: 35, width: 15, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le babillard des employés. Des plannings, des notes... et une lettre épinglée.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Cher Gabriel, dès que mon oncle me cédera le château, vos services ne seront plus nécessaires." Signé Charlotte, datée de 2 semaines.',
                                action: { addClue: 'lettre_licenciement_g' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'chambre_charlotte',
            name: 'Chambre de Charlotte',
            icon: '🪞',
            scene: 'castle_bedroom',
            description: 'La chambre de Charlotte dans l\'aile est du château.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_charlotte',
                    label: 'Charlotte de Montclair',
                    x: 30, y: 20, width: 14, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'Mon oncle... c\'est inimaginable. Il était tout pour moi. Ce château, cette famille...',
                                action: { addSuspect: 'charlotte' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous héritiez de tout à sa mort. Un motif, Charlotte.'
                            },
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'Hériter ? Mais... je suis sa nièce préférée ! Il m\'avait promis le château. Pourquoi aurais-je...',
                                choices: [
                                    {
                                        text: '📋 Le nouveau testament vous déshérite complètement.',
                                        condition: { hasClue: 'testament_edouard' },
                                        goto: 3
                                    },
                                    {
                                        text: '📱 "Ce soir c\'est le grand soir" — ce SMS est clair.',
                                        condition: { hasClue: 'sms_charlotte' },
                                        goto: 5
                                    },
                                    {
                                        text: '📹 La caméra vous montre dans la serre à 23h40.',
                                        condition: { hasClue: 'camera_serre' },
                                        goto: 7
                                    },
                                    {
                                        text: '🍾 C\'est vous qui avez servi le champagne.',
                                        condition: { hasClue: 'temoignage_gabriel' },
                                        goto: 9
                                    },
                                    {
                                        text: '✋ Je reviendrai.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'Dé-déshéritée ?! C\'est impossible ! Il m\'avait promis... Non, c\'est faux ! Ce testament est un faux !',
                                action: { setFlag: 'charlotte_shocked_testament', journal: 'Charlotte semble découvrir qu\'elle est déshéritée. Si elle ne le savait pas, quel était son mobile ?' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Si elle ne savait pas pour le testament, elle pensait encore hériter. Son mobile était donc l\'impatience — accélérer l\'héritage.)',
                            },
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'Ce message parlait de la fête ! "Le grand soir" c\'est l\'anniversaire de mon oncle. Les travaux c\'est... la rénovation qu\'il avait approuvée !',
                                action: { setFlag: 'charlotte_sms_excuse', journal: 'Charlotte justifie son SMS par la fête et des travaux de rénovation.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '("Bientôt le château sera à moi." Difficile d\'interpréter ça autrement.)',
                            },
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'La serre ? J\'y suis allée pour... prendre l\'air. Il faisait chaud dans la salle de bal. Les gants, c\'est parce que j\'avais froid dehors !',
                                action: { setFlag: 'charlotte_serre_excuse' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Elle a retiré les gants dans la serre — les mêmes gants qui portent des traces de digitaline. Et c\'est là que la fiole a été trouvée.)',
                                action: { journal: 'Charlotte admet être allée dans la serre à 23h40 mais nie avoir touché à la fiole.' }
                            },
                            {
                                speaker: 'Charlotte de Montclair', portrait: '👸',
                                text: 'Le champagne ? J\'ai voulu porter un toast à mon oncle ! C\'est un geste d\'amour, pas un acte criminel !',
                                action: { setFlag: 'charlotte_champagne_excuse' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un geste d\'amour : prendre la fiole dans la serre, verser le poison dans la coupe, servir le champagne à son oncle. Méthodique.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_telephone_charlotte',
                    label: 'Téléphone de Charlotte',
                    x: 60, y: 38, width: 10, height: 10,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le téléphone de Charlotte, posé sur la coiffeuse. Les messages récents...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un SMS envoyé 2 heures avant le bal : "Ce soir c\'est le grand soir. Bientôt le château sera à moi et on pourra commencer les travaux."',
                                action: { addClue: 'sms_charlotte' }
                            }
                        ]
                    }
                }
            ]
        }
    ],

    solution: {
        culprit: 'charlotte',
        keyEvidence: ['coupe_champagne', 'fiole_digitale', 'camera_serre', 'temoignage_gabriel', 'sms_charlotte'],

        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Charlotte de Montclair est confondue par un dossier implacable. La caméra de la serre la montre entrant à 23h40 — c'est là qu'elle a volé la fiole de digitaline dans la trousse du Dr. Roche. 

Le témoignage de Gabriel confirme qu'elle a insisté pour servir le champagne de son oncle. Le gant taché de digitaline, trouvé dans la serre, est celui qu'elle portait sur la vidéo. Et son SMS annonce clairement ses intentions.

Charlotte pensait hériter du château et le transformer en hôtel de luxe. L'ironie suprême : le nouveau testament d'Édouard la déshéritait. Elle a tué pour un héritage qu'elle n'aurait jamais reçu.

Le château sera confié à la fondation d'art, selon les dernières volontés d'Édouard.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez correctement identifié Charlotte, mais votre dossier manque de certaines preuves cruciales.

La défense trouve des failles dans l'accusation. Charlotte négocie une peine réduite, mais justice est rendue pour Édouard de Montclair.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Charlotte profite de la confusion pour faire disparaître la fiole et les gants.

Le Manoir des Masques garde son secret. Le fantôme d'Édouard hantera ces salles, privé de justice.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Inspecteur, un empoisonnement au château de Montclair. Le propriétaire Édouard de Montclair, 70 ans, retrouvé mort lors de son bal masqué d\'anniversaire.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Empoisonné au champagne. La digitaline — un poison cardiaque. Tous les invités portaient des masques identiques.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Un meurtre au bal masqué... le meurtrier se cachait derrière un masque au sens propre.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Quatre suspects principaux : Charlotte sa nièce, Maxime son galeriste, le Dr. Roche son médecin, et Gabriel son majordome.'
            },
            {
                speaker: 'Commissaire Durand', portrait: '👮',
                text: 'Le champagne a été servi vers minuit pour le toast d\'anniversaire. Le meurtrier a agi juste avant.',
                action: {
                    journal: 'Édouard de Montclair empoisonné à la digitaline lors de son bal masqué. Suspects : Charlotte (nièce), Maxime (galeriste), Dr. Roche (médecin), Gabriel (majordome).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Retirons les masques un par un. La vérité se cache derrière l\'un d\'eux.',
                action: (state) => {
                    state.unlockLocation('galerie_chateau');
                    state.unlockLocation('serre_chateau');
                    state.unlockLocation('cuisine_chateau');
                    state.unlockLocation('chambre_charlotte');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};
